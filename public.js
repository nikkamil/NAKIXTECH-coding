'use strict';
const $ = id => document.getElementById(id);
const say = s => $('status').textContent = s;
let rows = [], current = null, db;
function configured(){return window.SMARTLAB && !SMARTLAB.url.includes('YOUR_') && !SMARTLAB.key.includes('YOUR_');}
function show(row, update=true){
  current=row; $('detail').hidden=!row; $('title').textContent=row?.title || 'Pilih eksperimen';
  if(row){ for(const [id,key] of [['board','board'],['category','category'],['desc','description'],['filename','filename'],['code','code']]) $(id).textContent=row[key];
    if(update){const u=new URL(location.href);u.searchParams.set('code',row.id);history.replaceState(null,'',u);}
  }
  render();
}
function render(){const q=$('search').value.toLowerCase();$('list').replaceChildren();for(const r of rows.filter(r=>[r.title,r.board,r.category].join(' ').toLowerCase().includes(q))){const b=document.createElement('button');b.className='item'+(current?.id===r.id?' active':'');b.textContent=r.title;const small=document.createElement('small');small.textContent=r.board+' • '+r.category;b.append(small);b.onclick=()=>{say('');show(r);};$('list').append(b);}if(!$('list').children.length)$('list').textContent='Tiada eksperimen.';}
$('search').oninput=render;
$('copy').onclick=async()=>{if(!current)return;try{await navigator.clipboard.writeText(current.code);say('Coding disalin.');}catch{say('Copy gagal. Pilih teks coding dan salin secara manual.');}};
$('download').onclick=()=>{if(!current)return;const u=URL.createObjectURL(new Blob([current.code],{type:'text/plain'}));const a=document.createElement('a');a.href=u;a.download=current.filename.replace(/[^a-zA-Z0-9_.-]/g,'_');a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);};
async function start(){try{if(!configured())throw Error('Sila lengkapkan config.js dahulu.');if(!window.supabase)throw Error('Library Supabase tidak dapat dimuat.');db=supabase.createClient(SMARTLAB.url,SMARTLAB.key,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}});say('Memuatkan coding…');const {data,error}=await db.from('experiments').select('*').eq('published',true).order('title');if(error)throw error;rows=data;const id=new URLSearchParams(location.search).get('code');const r=id?rows.find(r=>r.id===id):rows[0];show(r||null,false);say(id&&!r?'Coding tidak tersedia atau belum diterbitkan.':'');}catch(e){say(e.message||'Gagal memuatkan coding.');}}
start();
