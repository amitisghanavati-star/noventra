(() => {
  const $ = (id) => document.getElementById(id);
  const config = window.NOVENTRA_AUTH_CONFIG || {};
  const configured = /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(config.url || "") &&
    typeof config.publishableKey === "string" &&
    /^(sb_publishable_|eyJ)/.test(config.publishableKey) &&
    !config.publishableKey.includes("PASTE_");
  const status = $("accountStatus");
  const form = $("accountForm");
  const submit = $("accountSubmit");
  const password2 = $("passwordConfirm");
  const password2Wrap = $("passwordConfirmWrap");
  const resetPanel = $("resetPanel");
  const newPasswordPanel = $("newPasswordPanel");
  const accountPanel = $("accountPanel");
  const authTabs = [...document.querySelectorAll("[data-auth-mode]")];
  let mode = "signup";
  let client = null;
  let recoveryMode = false;

  function message(text, kind = "info") {
    status.textContent = text;
    status.dataset.kind = kind;
    status.hidden = !text;
  }
  function setMode(next) {
    mode = next;
    recoveryMode = false;
    form.hidden = false;
    resetPanel.hidden = true;
    newPasswordPanel.hidden = true;
    accountPanel.hidden = true;
    password2Wrap.hidden = mode !== "signup";
    password2.required = mode === "signup";
    $("accountPassword").autocomplete = mode === "signup" ? "new-password" : "current-password";
    submit.textContent = mode === "signup" ? "ساخت حساب کاربری" : "ورود به حساب";
    authTabs.forEach(tab => {
      const active = tab.dataset.authMode === mode;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-pressed", String(active));
    });
    message("");
  }
  authTabs.forEach(tab => tab.addEventListener("click", () => setMode(tab.dataset.authMode)));

  if (!configured || !window.supabase?.createClient) {
    message("اتصال سرویس ثبت‌نام هنوز تکمیل نشده است. پس از تنظیم اطلاعات پروژهٔ احراز هویت، عضویت فعال می‌شود.", "warning");
    submit.disabled = true;
    authTabs.forEach(tab => tab.disabled = true);
    $("forgotPassword").disabled = true;
    return;
  }

  client = window.supabase.createClient(config.url, config.publishableKey, {
    auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true }
  });

  function showSignedIn(user) {
    form.hidden = true;
    resetPanel.hidden = true;
    newPasswordPanel.hidden = true;
    accountPanel.hidden = false;
    $("signedInEmail").textContent = user.email || "کاربر NOVENTRA";
    message("ورود با موفقیت انجام شد.", "success");
  }
  async function refreshSession() {
    const { data, error } = await client.auth.getSession();
    if (error) message("بررسی وضعیت حساب انجام نشد. دوباره صفحه را باز کن.", "error");
    if (data?.session?.user) showSignedIn(data.session.user);
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = $("accountEmail").value.trim();
    const password = $("accountPassword").value;
    submit.disabled = true;
    message("لطفاً کمی صبر کن…");
    try {
      if (mode === "signup") {
        if (password !== password2.value) {
          message("تکرار رمز عبور با رمز اول یکسان نیست.", "error");
          return;
        }
        if (password.length < 10) {
          message("برای امنیت بیشتر، رمز عبور باید حداقل ۱۰ نویسه داشته باشد.", "error");
          return;
        }
        const { data, error } = await client.auth.signUp({
          email, password,
          options: { emailRedirectTo: window.location.href.split("#")[0] }
        });
        if (error) throw error;
        if (data.session && data.user) {
          showSignedIn(data.user);
        } else {
          setMode("login");
          message("درخواست ثبت‌نام ارسال شد. ایمیلت را باز کن و لینک تأیید را بزن؛ سپس وارد حساب شو.", "success");
        }
      } else {
        const { data, error } = await client.auth.signInWithPassword({ email, password });
        if (error) throw error;
        showSignedIn(data.user);
      }
    } catch (error) {
      message(error?.message || "عملیات انجام نشد. اتصال اینترنت و اطلاعات حساب را بررسی کن.", "error");
    } finally {
      submit.disabled = false;
    }
  });

  $("forgotPassword").addEventListener("click", async () => {
    const email = $("accountEmail").value.trim();
    if (!email) {
      message("ابتدا ایمیلت را در کادر ایمیل وارد کن.", "error");
      $("accountEmail").focus();
      return;
    }
    $("forgotPassword").disabled = true;
    try {
      const redirectTo = window.location.href.split("#")[0];
      const { error } = await client.auth.resetPasswordForEmail(email, { redirectTo });
      if (error) throw error;
      message("اگر این ایمیل حسابی داشته باشد، دستور بازیابی رمز برای آن ارسال می‌شود. ایمیلت را بررسی کن.", "success");
    } catch (error) {
      message(error?.message || "ارسال درخواست بازیابی انجام نشد.", "error");
    } finally {
      $("forgotPassword").disabled = false;
    }
  });

  $("newPasswordForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const password = $("newPassword").value;
    const confirm = $("newPasswordConfirm").value;
    if (password.length < 10) return message("رمز جدید باید حداقل ۱۰ نویسه داشته باشد.", "error");
    if (password !== confirm) return message("تکرار رمز با رمز جدید یکسان نیست.", "error");
    const button = $("saveNewPassword");
    button.disabled = true;
    try {
      const { error } = await client.auth.updateUser({ password });
      if (error) throw error;
      await client.auth.signOut();
      newPasswordPanel.hidden = true;
      setMode("login");
      message("رمز عبور تغییر کرد. حالا با رمز جدید وارد شو.", "success");
    } catch (error) {
      message(error?.message || "تغییر رمز انجام نشد. لینک بازیابی ممکن است منقضی شده باشد.", "error");
    } finally {
      button.disabled = false;
    }
  });

  $("signOutButton").addEventListener("click", async () => {
    const { error } = await client.auth.signOut();
    if (error) return message(error.message, "error");
    accountPanel.hidden = true;
    setMode("login");
    message("از حساب خارج شدی.", "success");
  });

  client.auth.onAuthStateChange((event, session) => {
    if (event === "PASSWORD_RECOVERY") {
      recoveryMode = true;
      form.hidden = true;
      resetPanel.hidden = true;
      newPasswordPanel.hidden = false;
      accountPanel.hidden = true;
      message("رمز عبور جدیدت را وارد کن.");
    } else if (session?.user && !recoveryMode) {
      showSignedIn(session.user);
    }
  });
  refreshSession();
})();
