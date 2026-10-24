import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

// After creating your Supabase project, replace these two public project values.
// Never place a service_role/secret key in browser code or in this repository.
const SUPABASE_URL = "https://ialzfpmlagqnkfiivqaf.supabase.co";
const SUPABASE_ANON_KEY = "کلید عمومی‌ای که از Supabase کپی کردی";
const signupTab = document.getElementById("signupTab");
const loginTab = document.getElementById("loginTab");
const form = document.getElementById("authForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("message");
const status = document.getElementById("status");
let mode = "signup";
let supabase = null;

function showMessage(text) {
  message.textContent = text;
  message.classList.remove("hidden");
}
function setMode(nextMode) {
  mode = nextMode;
  const signup = mode === "signup";
  signupTab.classList.toggle("active", signup);
  loginTab.classList.toggle("active", !signup);
  submitBtn.textContent = signup ? "ساخت حساب" : "ورود امن";
  passwordInput.autocomplete = signup ? "new-password" : "current-password";
  resetBtn.classList.toggle("hidden", signup);
  document.getElementById("passwordHint").textContent = signup ? "(حداقل 8 نویسه)" : "";
  message.classList.add("hidden");
}
signupTab.addEventListener("click", () => setMode("signup"));
loginTab.addEventListener("click", () => setMode("login"));

if (SUPABASE_URL.startsWith("https://") && !SUPABASE_URL.includes("PASTE_") && SUPABASE_ANON_KEY && !SUPABASE_ANON_KEY.includes("PASTE_")) {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true }
  });
  supabase.auth.getSession().then(({ data, error }) => {
    if (error) status.textContent = "وضعیت ورود بررسی نشد. لطفاً دوباره تلاش کن.";
    else if (data.session) status.textContent = "وارد حساب خودت هستی: " + (data.session.user.email || "");
  });
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN" && session) status.textContent = "ورود موفق بود: " + (session.user.email || "");
  });
} else {
  status.textContent = "اتصال سرویس هنوز کامل نشده است. ابتدا پروژه Supabase بساز و سپس آدرس پروژه و کلید عمومی آن را در auth.js قرار بده.";
  submitBtn.disabled = true;
  submitBtn.textContent = "در انتظار اتصال سرویس";
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!supabase) return;
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  submitBtn.disabled = true;
  submitBtn.textContent = "در حال بررسی…";
  message.classList.add("hidden");
  try {
    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      showMessage(data.session
        ? "حساب ساخته شد و وارد شدی."
        : "درخواست ساخت حساب ثبت شد. ایمیلت را بررسی کن و اگر پیام تأیید آمد، لینک آن را باز کن.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      showMessage("ورود با موفقیت انجام شد.");
    }
  } catch (error) {
    showMessage(error?.message || "عملیات انجام نشد. لطفاً دوباره تلاش کن.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = mode === "signup" ? "ساخت حساب" : "ورود امن";
  }
});

resetBtn.addEventListener("click", async () => {
  if (!supabase) return;
  const email = emailInput.value.trim();
  if (!email) {
    showMessage("ابتدا ایمیلت را در کادر ایمیل وارد کن.");
    emailInput.focus();
    return;
  }
  resetBtn.disabled = true;
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + window.location.pathname
    });
    if (error) throw error;
    showMessage("اگر این ایمیل در سرویس ثبت شده باشد، دستور بازیابی گذرواژه برایش ارسال می‌شود.");
  } catch (error) {
    showMessage(error?.message || "ارسال درخواست بازیابی انجام نشد.");
  } finally {
    resetBtn.disabled = false;
  }
});
