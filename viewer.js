'use strict';
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const projects=[...(window.SELF_CATALOG||[]),{id:'self',title:'学习与作品',description:'这个网站用来整理学习进度、作品和日常想法。配上喜欢的山水与剑侠画面，慢慢把记录补完整。',kind:'个人网站 · 持续更新',url:'#home',linkLabel:'回到首页'}];
const logs=window.SELF_IMPORTED_LOGS||[];
function safeUrl(s){try{const u=new URL(s,location.href);return ['https:','http:'].includes(u.protocol)?u.href:''}catch{return ''}}
$('#focus-value').textContent=window.SELF_PROFILE.focus;
$('#bio-value').textContent=window.SELF_PROFILE.bio;
$('#project-list').innerHTML=projects.map((p,i)=>{const url=safeUrl(p.url),cover=p.cover&&safeUrl(p.cover)?`<img class="project-cover" src="${esc(safeUrl(p.cover))}" alt="${esc(p.coverAlt||p.title)}" loading="lazy">`:'';return `<article class="project-card ${cover?'has-cover':''}"><a class="project-visual" href="${esc(url||'#projects')}" aria-label="${esc(p.title)}">${cover}<span class="visual-label">${String(i+1).padStart(2,'0')} / ${esc(p.kind)}</span></a><div class="project-content"><div class="project-meta"><span>${esc(p.kind)}</span><span>↗</span></div><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p>${Array.isArray(p.tech)&&p.tech.length?`<div class="project-tech">${p.tech.map(t=>`<span>${esc(t)}</span>`).join('')}</div>`:''}<div class="project-actions">${url?`<a href="${esc(url)}" ${p.url.startsWith('https:')?'target="_blank" rel="noopener noreferrer"':''}>${esc(p.linkLabel||'打开作品')} ↗</a>`:''}</div></div></article>`}).join('');
let filter='全部';
function renderLogs(){const q=$('#search').value.trim().toLowerCase();const results=logs.filter(l=>(filter==='全部'||l.type===filter)&&`${l.title} ${l.body}`.toLowerCase().includes(q)).sort((a,b)=>b.date.localeCompare(a.date));$('#log-list').innerHTML=results.map(l=>`<article class="log-row"><time class="log-date">${esc(l.date)}</time><span class="log-tag">${esc(l.type)}</span><div class="log-body"><h3>${esc(l.title)}</h3><p>${esc(l.body)}</p></div></article>`).join('')||'<div class="empty">暂时没有匹配的记录。</div>'}
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('selected',x===b));renderLogs()}));
$('#search').addEventListener('input',renderLogs);renderLogs();
function tick(){$('#clock').textContent=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Shanghai',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date())+' CST'}tick();setInterval(tick,30000);
if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting)document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('active',a.hash==='#'+e.target.id))},{rootMargin:'-10% 0px -65% 0px'});document.querySelectorAll('main[id],section[id]').forEach(s=>observer.observe(s))}
