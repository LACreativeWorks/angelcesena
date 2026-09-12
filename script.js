const splitReveal=()=>{document.querySelectorAll('[data-reveal]').forEach(el=>{const text=el.textContent;el.setAttribute('aria-label',text);el.innerHTML=[...text].map(c=>c===' '?' ':`<span class="char" aria-hidden="true">${c}</span>`).join('')})};
splitReveal();

addEventListener('load',()=>setTimeout(()=>document.body.classList.add('loaded'),1150));

const hero=document.querySelector('.hero');
const heroWord=document.querySelector('.hero-word');
const navBrand=document.querySelector('.nav-brand');
let flight;
const makeFlight=()=>{if(flight)return;const rect=heroWord.getBoundingClientRect();flight=document.createElement('div');flight.className='hero-flight';flight.textContent='CESENATIV';flight.style.left=`${rect.left}px`;flight.style.top=`${rect.top}px`;flight.dataset.left=rect.left;flight.dataset.top=rect.top;flight.dataset.width=rect.width;document.body.appendChild(flight);heroWord.classList.add('is-handed-off');updateHandoff()};
const updateHandoff=()=>{if(!flight)return;const p=Math.max(0,Math.min(1,scrollY/(hero.offsetHeight*.82)));const eased=1-Math.pow(1-p,3);const fromLeft=+flight.dataset.left,fromTop=+flight.dataset.top,fromWidth=+flight.dataset.width;const target=navBrand.getBoundingClientRect();const scale=(target.width/fromWidth);const x=(target.left-fromLeft)*eased;const y=(target.top-fromTop)*eased;flight.style.transform=`translate3d(${x}px,${y}px,0) scale(${1+(scale-1)*eased})`;flight.style.opacity=p>=.985?0:1;navBrand.classList.toggle('is-visible',p>=.96)};
setTimeout(makeFlight,2350);
addEventListener('scroll',updateHandoff,{passive:true});
addEventListener('resize',()=>{if(flight){flight.remove();flight=null;heroWord.classList.remove('is-handed-off');navBrand.classList.remove('is-visible');makeFlight()}});

const copy=document.querySelector('.reveal-copy');
const chars=[...copy.querySelectorAll('.char')];
const updateReveal=()=>{const rect=copy.getBoundingClientRect();const start=innerHeight*.78;const end=innerHeight*.17;const progress=Math.max(0,Math.min(1,(start-rect.top)/(start-end+rect.height*.56)));const active=Math.round(progress*chars.length);chars.forEach((char,i)=>char.classList.toggle('on',i<active));};
addEventListener('scroll',updateReveal,{passive:true});updateReveal();

const visualSection=document.querySelector('.visual-intro');
const visualFrame=document.querySelector('.visual-frame');
const visualImage=visualFrame.querySelector('img');
const updateVisual=()=>{const rect=visualSection.getBoundingClientRect();const progress=Math.max(0,Math.min(1,-rect.top/(visualSection.offsetHeight-innerHeight)));const start=innerWidth<721?.82:.72;visualFrame.style.transform=`scale(${start+(1-start)*progress})`;visualImage.style.transform=`scale(${1.12-progress*.12})`};
addEventListener('scroll',updateVisual,{passive:true});updateVisual();

const preview=document.querySelector('.project-preview');
const previewImage=preview.querySelector('img');
let tx=innerWidth/2,ty=innerHeight/2,cx=tx,cy=ty;
const follow=()=>{cx+=(tx-cx)*.12;cy+=(ty-cy)*.12;preview.style.left=`${cx}px`;preview.style.top=`${cy}px`;requestAnimationFrame(follow)};follow();
document.querySelectorAll('.project').forEach(project=>{
  project.addEventListener('mouseenter',()=>{previewImage.src=project.dataset.image;preview.classList.add('show')});
  project.addEventListener('mousemove',e=>{tx=e.clientX;ty=e.clientY});
  project.addEventListener('mouseleave',()=>preview.classList.remove('show'));
  project.addEventListener('click',e=>e.preventDefault());
});
