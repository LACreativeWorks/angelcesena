const splitReveal=()=>{document.querySelectorAll('[data-reveal]').forEach(el=>{const text=el.textContent;el.setAttribute('aria-label',text);el.innerHTML=[...text].map(c=>c===' '?' ':`<span class="char" aria-hidden="true">${c}</span>`).join('')})};
splitReveal();

addEventListener('load',()=>setTimeout(()=>document.body.classList.add('loaded'),1150));

const hero=document.querySelector('.hero');
const heroWord=document.querySelector('.hero-word');
const navBrand=document.querySelector('.nav-brand');
let flight;
const makeFlight=()=>{if(flight)return;const rect=heroWord.getBoundingClientRect();flight=document.createElement('div');flight.className='hero-flight';flight.innerHTML='<img src="cesenativ.svg" alt="">';flight.style.left=`${rect.left}px`;flight.style.top=`${rect.top}px`;flight.dataset.left=rect.left;flight.dataset.top=rect.top;flight.dataset.width=rect.width;document.body.appendChild(flight);heroWord.classList.add('is-handed-off');updateHandoff()};
const updateHandoff=()=>{if(!flight)return;const p=Math.max(0,Math.min(1,scrollY/(hero.offsetHeight*.82)));const eased=1-Math.pow(1-p,3);const fromLeft=+flight.dataset.left,fromTop=+flight.dataset.top,fromWidth=+flight.dataset.width;const target=navBrand.getBoundingClientRect();const scale=(target.width/fromWidth);const x=(target.left-fromLeft)*eased;const y=(target.top-fromTop)*eased;flight.style.transform=`translate3d(${x}px,${y}px,0) scale(${1+(scale-1)*eased})`;flight.style.opacity=p>=.985?0:1;navBrand.classList.toggle('is-visible',p>=.96)};
setTimeout(makeFlight,2350);
addEventListener('scroll',updateHandoff,{passive:true});
addEventListener('resize',()=>{if(flight){flight.remove();flight=null;heroWord.classList.remove('is-handed-off');navBrand.classList.remove('is-visible');makeFlight()}});

const heroColors=['#17543f','#f3ead9','#101010','#112f52','#7b1640','#6c2bd9'];
let heroColor=0;
hero.addEventListener('pointerenter',()=>hero.classList.add('is-exploring'));
hero.addEventListener('pointerleave',()=>hero.classList.remove('is-exploring'));
hero.addEventListener('pointermove',e=>{const rect=hero.getBoundingClientRect();hero.style.setProperty('--mouse-x',`${e.clientX-rect.left}px`);hero.style.setProperty('--mouse-y',`${e.clientY-rect.top}px`)});
hero.addEventListener('click',()=>{heroColor=(heroColor+1)%heroColors.length;document.querySelector('.hero-color-reveal').style.backgroundColor=heroColors[heroColor]});

const copy=document.querySelector('.reveal-copy');
const chars=[...copy.querySelectorAll('.char')];
const updateReveal=()=>{const rect=copy.getBoundingClientRect();const start=innerHeight*.78;const end=innerHeight*.17;const progress=Math.max(0,Math.min(1,(start-rect.top)/(start-end+rect.height*.56)));const active=Math.round(progress*chars.length);chars.forEach((char,i)=>char.classList.toggle('on',i<active));};
addEventListener('scroll',updateReveal,{passive:true});updateReveal();

const preview=document.querySelector('.project-preview');
const previewImages=[...preview.querySelectorAll('img')];
document.querySelectorAll('.project').forEach(project=>{
  project.addEventListener('mouseenter',()=>{project.dataset.images.split('|').forEach((src,i)=>previewImages[i].src=src);preview.classList.add('show')});
  project.addEventListener('mouseleave',()=>preview.classList.remove('show'));
  project.addEventListener('click',e=>e.preventDefault());
});
