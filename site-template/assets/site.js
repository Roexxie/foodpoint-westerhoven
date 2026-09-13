const menu=document.querySelector('.mobile-menu');
if(menu){
 const toggle=menu.querySelector('summary');
 menu.addEventListener('toggle',()=>toggle.setAttribute('aria-label',menu.open?'Menu sluiten':'Menu openen'));
 menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.removeAttribute('open')));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.open){menu.removeAttribute('open');toggle.focus();}});
 document.addEventListener('click',e=>{if(menu.open&&!menu.contains(e.target))menu.removeAttribute('open');});
}
// Back button: return to the previous page on this site; otherwise follow the link to the parent page.
document.querySelectorAll('[data-back]').forEach(a=>a.addEventListener('click',e=>{
 if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;
 let ref=null;try{ref=new URL(document.referrer);}catch{}
 if(ref&&ref.origin===location.origin&&ref.href!==location.href&&history.length>1){e.preventDefault();history.back();}
}));