import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js?v=20261105-firebase-2";

const dialog = document.getElementById('authDialog');
const form = document.getElementById('authForm');
const status = document.getElementById('authStatus');
const nameInput = document.getElementById('authName');
const emailInput = document.getElementById('authEmail');
const passwordInput = document.getElementById('authPassword');
const confirmInput = document.getElementById('authConfirm');
const confirmLabel = document.getElementById('authConfirmLabel');
const submit = document.getElementById('authSubmit');
const googleButton = document.getElementById('googleSignIn');
let mode = 'signup';
let auth = null;
let firebaseInitError = null;
const configReady = firebaseConfig.apiKey && !firebaseConfig.apiKey.includes('PASTE_') && firebaseConfig.projectId && !firebaseConfig.projectId.includes('PASTE_') && firebaseConfig.appId && !firebaseConfig.appId.includes('PASTE_');
if (configReady) { try { auth = getAuth(initializeApp(firebaseConfig)); } catch (e) { firebaseInitError = e; console.error('NOVENTRA Firebase initialization failed:', e); } }
function message(text, error=false) { status.textContent=text; status.classList.toggle('error',error); }
function setMode(next) {
  mode=next;
  document.querySelectorAll('[data-auth-mode]').forEach(b=>b.classList.toggle('active',b.dataset.authMode===mode));
  nameInput.required=mode==='signup'; nameInput.hidden=mode==='login';
  document.querySelector('label[for="authName"]').hidden=mode==='login';
  confirmInput.required=mode==='signup'; confirmInput.hidden=mode==='login'; confirmLabel.hidden=mode==='login';
  passwordInput.autocomplete=mode==='signup'?'new-password':'current-password';
  submit.textContent=mode==='signup'?'ایجاد حساب رایگان':'ورود به حساب';
  message('');
}
document.querySelectorAll('[data-open-auth]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault(); if(dialog?.showModal) dialog.showModal(); else dialog?.setAttribute('open','');}));
document.querySelectorAll('[data-close-auth]').forEach(el=>el.addEventListener('click',()=>dialog?.close()));
dialog?.addEventListener('click',e=>{if(e.target===dialog) dialog.close();});
document.querySelectorAll('[data-auth-mode]').forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.authMode)));
if (!configReady) message('تنظیمات Firebase هنوز تکمیل نشده است؛ ثبت‌نام و ورود واقعی تا واردکردن تنظیمات برنامهٔ وب Firebase فعال نیست.');
if (auth) onAuthStateChanged(auth,user=>{
  const existing=document.getElementById('memberStatus');
  if(existing) existing.remove();
  if(user){ const el=document.createElement('p'); el.id='memberStatus'; el.className='member-status'; el.textContent=`وارد شده‌ای: ${user.displayName || user.email}`; document.querySelector('.header-actions')?.append(el); }
});
form?.addEventListener('submit',async e=>{
 e.preventDefault();
 if(!auth){ const detail = firebaseInitError?.code ? ` (${firebaseInitError.code})` : ''; message(`اتصال Firebase برقرار نشد${detail}. لطفاً چند لحظه بعد دوباره امتحان کن.`,true);return;}
 const email=emailInput.value.trim(); const password=passwordInput.value;
 if(mode==='signup' && password!==confirmInput.value){message('رمز عبور و تکرار آن یکسان نیستند.',true);return;}
 submit.disabled=true; submit.textContent='لطفاً صبر کن…';
 try {
  if(mode==='signup'){
   const credential=await createUserWithEmailAndPassword(auth,email,password);
   await updateProfile(credential.user,{displayName:nameInput.value.trim()});
   message('عضویت رایگان با موفقیت انجام شد. خوش آمدی!');
  } else { await signInWithEmailAndPassword(auth,email,password); message('ورود با موفقیت انجام شد. خوش آمدی!'); }
  form.reset(); setTimeout(()=>dialog?.close(),1400);
 } catch(err){
  const messages={ 'auth/email-already-in-use':'این ایمیل قبلاً ثبت شده است. از بخش ورود استفاده کن.','auth/invalid-email':'فرمت ایمیل درست نیست.','auth/weak-password':'رمز عبور باید حداقل ۶ نویسه باشد.','auth/invalid-credential':'ایمیل یا رمز عبور درست نیست.','auth/network-request-failed':'اتصال اینترنت را بررسی کن.'};
  message(messages[err.code] || 'ثبت‌نام/ورود انجام نشد. تنظیمات Firebase و روش ورود ایمیلی را بررسی کن.',true);
 } finally { submit.disabled=false; submit.textContent=mode==='signup'?'ایجاد حساب رایگان':'ورود به حساب'; }
});

googleButton?.addEventListener('click', async () => {
  if (!auth) { const detail = firebaseInitError?.code ? ` (${firebaseInitError.code})` : ''; message(`اتصال Firebase برقرار نشد${detail}. صفحه را تازه‌سازی کن؛ اگر ادامه داشت، خطای کنسول مرورگر را بررسی می‌کنیم.`, true); return; }
  googleButton.disabled = true;
  googleButton.textContent = 'در حال اتصال به گوگل…';
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    await signInWithPopup(auth, provider);
    message('ورود با حساب گوگل با موفقیت انجام شد. خوش آمدی!');
    setTimeout(() => dialog?.close(), 1400);
  } catch (err) {
    const messages = {
      'auth/popup-closed-by-user': 'پنجره ورود گوگل بسته شد؛ دوباره تلاش کن.',
      'auth/popup-blocked': 'مرورگر پنجره ورود را مسدود کرد؛ اجازه بازشدن پنجره را بده.',
      'auth/unauthorized-domain': 'دامنه سایت هنوز در Firebase مجاز نشده است.',
      'auth/account-exists-with-different-credential': 'برای این ایمیل قبلاً روش ورود دیگری ثبت شده است.'
    };
    message(messages[err.code] || 'ورود با گوگل انجام نشد. تنظیمات Google و دامنه مجاز را بررسی کن.', true);
  } finally {
    googleButton.disabled = false;
    googleButton.textContent = 'ورود با حساب Google';
  }
});
