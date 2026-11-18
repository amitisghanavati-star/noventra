const menuToggle=document.getElementById("menuToggle");
const sidebar=document.getElementById("sidebar");
menuToggle?.addEventListener("click",()=>sidebar.classList.toggle("open"));
document.querySelectorAll(".main-nav a").forEach(link=>link.addEventListener("click",()=>sidebar.classList.remove("open")));
const dialog=document.getElementById("authDialog");
document.getElementById("profileButton")?.addEventListener("click",()=>dialog.showModal());
dialog?.querySelector(".dialog-close")?.addEventListener("click",()=>dialog.close());
dialog?.querySelector(".dialog-ok")?.addEventListener("click",()=>dialog.close());
dialog?.addEventListener("click",event=>{if(event.target===dialog)dialog.close()});
if("serviceWorker" in navigator && location.protocol!=="file:"){
  window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(error=>console.info("PWA offline setup pending:",error)));
}
