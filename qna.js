import { getApps, getApp, initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js?v=20261105-firestore-1";

// Replace this value with the site owner's Firebase Authentication UID before enabling admin replies.
const ADMIN_UID = "LOJRpQAZYoZ9xCmXq8KpeQHXIuA3";

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const form = document.getElementById("questionForm");
const statusEl = document.getElementById("questionStatus");
const listEl = document.getElementById("questionsList");
const signedOutEl = document.getElementById("questionsSignedOut");
const formWrap = document.getElementById("questionFormWrap");
const adminNotice = document.getElementById("adminUidNotice");
let currentUser = null;
let unsubscribe = null;

const esc = (value = "") => String(value).replace(/[&<>"']/g, ch => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[ch]));
const setStatus = (message, error = false) => {
  statusEl.textContent = message;
  statusEl.classList.toggle("error", error);
};

function renderQuestions(snapshot) {
  if (!snapshot.docs.length) {
    listEl.innerHTML = '<p class="qna-empty">هنوز پرسشی ثبت نشده است. اولین پرسش را تو مطرح کن.</p>';
    return;
  }
  listEl.innerHTML = snapshot.docs.map(item => {
    const q = item.data();
    const isAdmin = currentUser && currentUser.uid === ADMIN_UID;
    const answered = q.status === "answered" || Boolean(q.answer);
    const created = q.createdAt?.toDate ? q.createdAt.toDate().toLocaleDateString("fa-IR") : "تازه";
    const answerBlock = answered
      ? `<div class="qna-answer"><strong>پاسخ نوونترا</strong><p>${esc(q.answer || "")}</p></div>`
      : '<span class="qna-pending">در انتظار پاسخ</span>';
    const adminEditor = isAdmin
      ? `<form class="qna-reply-form" data-reply-id="${esc(item.id)}"><label>پاسخ مدیر<textarea name="answer" rows="3" required maxlength="5000">${esc(q.answer || "")}</textarea></label><button class="btn btn-light" type="submit">ثبت پاسخ</button></form>`
      : "";
    return `<article class="qna-card"><div class="qna-card-top"><span>${esc(q.category || "عمومی")}</span><time>${esc(created)}</time></div><h3>${esc(q.title || "پرسش هنرجو")}</h3><p class="qna-question-text">${esc(q.body || q.title || "")}</p>${answerBlock}${!answered && !isAdmin ? '<span class="qna-pending">در انتظار پاسخ</span>' : ""}${adminEditor}</article>`;
  }).join("");
}

onAuthStateChanged(auth, user => {
  currentUser = user;
  signedOutEl.hidden = Boolean(user);
  formWrap.hidden = !user;
  // The owner's UID is configured in this file; do not expose it in the public page.
  adminNotice.hidden = true;
  if (unsubscribe) unsubscribe();
  if (!user) {
    listEl.innerHTML = '<p class="qna-empty">برای مشاهده پرسش‌ها و پاسخ‌ها، ابتدا وارد حساب خودت شو.</p>';
    return;
  }
  const q = query(collection(db, "questions"), orderBy("createdAt", "desc"));
  unsubscribe = onSnapshot(q, renderQuestions, err => {
    console.error("NOVENTRA Q&A read error:", err);
    listEl.innerHTML = '<p class="qna-error">دریافت پرسش‌ها ممکن نشد. قوانین Firestore را بررسی کن.</p>';
  });
});

form?.addEventListener("submit", async event => {
  event.preventDefault();
  if (!currentUser) return setStatus("برای ثبت پرسش ابتدا وارد حساب شو.", true);
  const data = new FormData(form);
  const title = String(data.get("title") || "").trim();
  const body = String(data.get("body") || "").trim();
  const category = String(data.get("category") || "عمومی");
  if (title.length < 3 || body.length < 5) return setStatus("عنوان و متن پرسش را کامل‌تر بنویس.", true);
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  setStatus("در حال ثبت پرسش…");
  try {
    await addDoc(collection(db, "questions"), {
      title, body, category,
      authorUid: currentUser.uid,
      authorName: currentUser.displayName || currentUser.email || "هنرجو",
      status: "pending",
      answer: "",
      createdAt: serverTimestamp(),
      answeredAt: null,
      answeredBy: null
    });
    form.reset();
    setStatus("پرسشت با موفقیت ثبت شد.");
  } catch (err) {
    console.error("NOVENTRA Q&A submit error:", err);
    setStatus(err.code === "permission-denied"
      ? "دسترسی ثبت پرسش هنوز در قوانین Firestore فعال نشده است."
      : "ثبت پرسش انجام نشد. اتصال و قوانین Firestore را بررسی کن.", true);
  } finally {
    button.disabled = false;
  }
});

listEl?.addEventListener("submit", async event => {
  const replyForm = event.target.closest(".qna-reply-form");
  if (!replyForm) return;
  event.preventDefault();
  if (!currentUser || currentUser.uid !== ADMIN_UID) {
    setStatus("این بخش فقط برای مدیر سایت فعال است.", true);
    return;
  }
  const answer = String(new FormData(replyForm).get("answer") || "").trim();
  if (!answer) return;
  const button = replyForm.querySelector("button");
  button.disabled = true;
  try {
    await updateDoc(doc(db, "questions", replyForm.dataset.replyId), {
      answer,
      status: "answered",
      answeredAt: serverTimestamp(),
      answeredBy: currentUser.uid
    });
    setStatus("پاسخ با موفقیت ثبت شد.");
  } catch (err) {
    console.error("NOVENTRA Q&A reply error:", err);
    setStatus("ثبت پاسخ ممکن نشد؛ UID مدیر و قوانین Firestore را بررسی کن.", true);
  } finally {
    button.disabled = false;
  }
});
