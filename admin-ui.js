/* UI-only navigation; existing admin.js retains all database operations. */
(function(){
 'use strict';
 const by=id=>document.getElementById(id);
 const views=[...document.querySelectorAll('[data-view]')];
 const keys=views.map(v=>v.dataset.view);
 const nav=by('navigation'), dashboard=by('dashboard'), shared=by('sharedBook');
 let current='dashboard';
 function hideSecrets(){for(const el of document.querySelectorAll('.license-secret')){el.hidden=true;const code=el.querySelector('code');if(code)code.textContent='';const b=el.previousElementSibling?.querySelector('button');if(b)b.textContent='Show code';}}
 function collapseMobile(){if(matchMedia('(max-width:760px)').matches){by('navToggle').setAttribute('aria-expanded','false');by('navToggle').closest('.sidebar').classList.add('collapsed');}}
 function route(key,scroll){
  if(!keys.includes(key))key='dashboard';
  if(key!==current)hideSecrets();
  current=key;
  views.forEach(v=>v.hidden=v.dataset.view!==key);
  for(const b of nav.querySelectorAll('[data-route]')){if(b.dataset.route===key)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');}
  const scope=key==='licenses'||key==='batches';shared.hidden=!scope;
  if(scope){const view=by('view-'+key);view.insertBefore(shared,view.children[1]||null);}
  document.title='NAKIXTECH | '+(nav.querySelector('[aria-current=page] strong')?.textContent||'Admin');
  if(scroll){collapseMobile();window.scrollTo(0,0);}
 }
 document.addEventListener('click',e=>{const b=e.target.closest('[data-route]');if(!b||dashboard.hidden)return;route(b.dataset.route,true);});
 by('navToggle').addEventListener('click',()=>{const b=by('navToggle'),on=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',String(!on));b.closest('.sidebar').classList.toggle('collapsed',on);});
 const notices=by('noticeStack');const status=[by('status'),by('bookStatus')];
 function notice(){notices.classList.toggle('has-message',status.some(p=>p.textContent.trim()));}
 for(const p of status)new MutationObserver(notice).observe(p,{childList:true,characterData:true,subtree:true});
 by('dismissNotice').addEventListener('click',()=>{status.forEach(p=>p.textContent='');notice();});
 const stats=by('stats');
 function styleStats(){for(const span of stats.children){if(span.querySelector('strong'))continue;const parts=span.textContent.match(/^([^:]+):\s*(\d+)$/);if(!parts)continue;const label=document.createTextNode(({Total:'Jumlah coding',Published:'Diterbitkan',Draft:'Draf'})[parts[1]]||parts[1]);const num=document.createElement('strong');num.textContent=parts[2];span.replaceChildren(label,num);}}
 new MutationObserver(styleStats).observe(stats,{childList:true});
 new MutationObserver(()=>{if(!dashboard.hidden)route('dashboard',false);}).observe(dashboard,{attributes:true,attributeFilter:['hidden']});
 // The danger section starts collapsed; its existing controls and confirmations stay intact.
 route('dashboard',false);notice();
})();
