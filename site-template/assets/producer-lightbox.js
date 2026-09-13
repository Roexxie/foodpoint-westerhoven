
(()=>{
 const dialog=document.querySelector('.producer-dialog');
 if(!dialog||typeof dialog.showModal!=='function')return;
 const storage=document.querySelector('.producer-bios');
 const content=dialog.querySelector('.bio-content');
 const stampSlot=dialog.querySelector('.bio-stamp');
 const entries=new Map([...storage.querySelectorAll('.bio-entry')].map(e=>[e.id,e]));
 const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');
 const DURATION=460;
 let opener=null,active=null,tile=null,previousOverflow='',closing=false;
 storage.classList.add('is-enhanced');

 const tileFor=id=>document.querySelector('.producer-gallery a[href="#'+id+'"]');
 const visible=r=>r&&r.width>0&&r.bottom>0&&r.top<innerHeight;

 // Clone the dialog stamp and animate it between the dialog and the tile in the gallery.
 function fly(toTile){
  const art=stampSlot.firstElementChild,tileArt=tile?.querySelector('svg');
  if(reduceMotion.matches||!art||!tileArt)return null;
  const t=tileArt.getBoundingClientRect();
  if(!visible(t))return null;
  const box=art.getBoundingClientRect(),a=art.querySelector('svg').getBoundingClientRect();
  const s=t.width/a.width,dx=(t.left+t.width/2)-(a.left+a.width/2),dy=(t.top+t.height/2)-(a.top+a.height/2);
  const flyer=art.cloneNode(true);
  flyer.classList.add('stamp-flyer');
  Object.assign(flyer.style,{left:box.left+'px',top:box.top+'px',width:box.width+'px',transformOrigin:(a.left+a.width/2-box.left)+'px '+(a.top+a.height/2-box.top)+'px'});
  dialog.append(flyer);
  const away=`translate(${dx}px,${dy}px) scale(${s})`,home='translate(0,0) scale(1)';
  const frames=toTile?[{transform:home},{transform:away}]:[{transform:away},{transform:'translate(0,0) scale(1.05)',offset:.72},{transform:home}];
  const anim=flyer.animate(frames,{duration:DURATION,easing:toTile?'cubic-bezier(.4,0,.2,1)':'cubic-bezier(.2,.7,.3,1)',fill:'forwards'});
  return anim.finished.then(()=>flyer.remove(),()=>flyer.remove());
 }

 function openBio(id,trigger){
  const entry=entries.get(id);if(!entry)return;
  if(active)storage.append(active);
  tile?.classList.remove('is-away');
  active=entry;tile=tileFor(id);opener=trigger||tile;
  content.append(entry);
  const art=document.createElement('div');
  art.className='bio-stamp-art';
  tile?.querySelectorAll(':scope>svg').forEach(svg=>art.append(svg.cloneNode(true)));
  stampSlot.replaceChildren(...(tile?[art]:[]));
  dialog.setAttribute('aria-labelledby',entry.querySelector('h2').id);
  const wasOpen=dialog.open;
  if(!wasOpen){
   previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';
   dialog.classList.add('is-flying','stamp-hidden');
   dialog.showModal();
  }
  dialog.scrollTop=0;entry.querySelector('h2').focus({preventScroll:true});
  tile?.classList.add('is-away');
  if(wasOpen)return;
  const flight=fly(false);
  void dialog.offsetWidth;
  dialog.classList.remove('is-flying');
  if(flight)flight.then(()=>dialog.classList.remove('stamp-hidden'));
  else{dialog.classList.remove('stamp-hidden');dialog.classList.add('is-popping');}
 }

 function requestClose(){
  if(!dialog.open||closing)return;
  dialog.classList.remove('is-popping');
  const flight=fly(true);
  if(!flight){dialog.close();return;}
  closing=true;
  dialog.classList.add('is-leaving','stamp-hidden');
  flight.then(()=>dialog.close());
 }

 document.querySelectorAll('.producer-gallery a[href^="#producent-"]').forEach(a=>a.addEventListener('click',e=>{
  if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;
  e.preventDefault();history.replaceState(null,'',a.hash);openBio(a.hash.slice(1),a);
 }));
 function sync(){const id=location.hash.slice(1);if(entries.has(id))openBio(id);else requestClose();}
 dialog.querySelector('.bio-close').addEventListener('click',requestClose);
 dialog.addEventListener('cancel',e=>{e.preventDefault();requestClose();});
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)requestClose();}});
 dialog.addEventListener('close',()=>{
  closing=false;
  dialog.classList.remove('is-leaving','is-flying','is-popping','stamp-hidden');
  dialog.querySelectorAll('.stamp-flyer').forEach(f=>f.remove());
  tile?.classList.remove('is-away');
  if(active){storage.append(active);active=null;}
  document.body.style.overflow=previousOverflow;
  if(entries.has(location.hash.slice(1)))history.replaceState(null,'',location.pathname+location.search);
  opener?.focus({preventScroll:true});
 });
 addEventListener('hashchange',sync);sync();
})();
