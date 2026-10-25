import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js";

const dialog = document.getElementById('authDialog');
const form = document.getElementById('authForm');
const status = document.getElementById('authStatus');
const nameInput = document.getElementById('authName');
const emailInput = document.getElementById('authEmail');
const passwordInput = document.getElementById('authPassword');
const confirmInput = document.getElementById('authConfirm');
const confirmLabel = document.getElementById('authConfirmLabel');
const submit = document.getElementById('authSubmit');
let mode = 'signup';
let auth = null;
const configReady = firebaseConfig.apiKey && !firebaseConfig.apiKey.includes('PASTE_') && firebaseConfig.projectId && !firebaseConfig.projectId.includes('PASTE_') && firebaseConfig.appId && !firebaseConfig.appId.includes('PASTE_');
if (configReady) { try { auth = getAuth(initializeApp(firebaseConfig)); } catch (e) { console.error(e); } }
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
if (!configReady) message('فرم آماده است؛ برای فعال‌شدن حساب واقعی، تنظیمات Firebase را طبق راهنمای داخل ZIP تکمیل کن.');
if (auth) onAuthStateChanged(auth,user=>{
  const existing=document.getElementById('memberStatus');
  if(existing) existing.remove();
  if(user){ const el=document.createElement('p'); el.id='memberStatus'; el.className='member-status'; el.textContent=`وارد شده‌ای: ${user.displayName || user.email}`; document.querySelector('.header-actions')?.append(el); }
});
form?.addEventListener('submit',async e=>{
 e.preventDefault();
 if(!auth){message('حساب‌سازی هنوز فعال نشده است. ابتدا Firebase را طبق راهنما تنظیم کن.',true);return;}
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
