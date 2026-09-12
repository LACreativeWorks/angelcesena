const splitReveal=()=>{document.querySelectorAll('[data-reveal]').forEach(el=>{const text=el.textContent;el.setAttribute('aria-label',text);el.innerHTML=[...text].map(c=>c===' '?' ':`<span class="char" aria-hidden="true">${c}</span>`).join('')})};
splitReveal();

addEventListener('load',()=>setTimeout(()=>document.body.classList.add('loaded'),1150));

const copy=document.querySelector('.reveal-copy');
const chars=[...copy.querySelectorAll('.char')];
const updateReveal=()=>{const rect=copy.getBoundingClientRect();const start=innerHeight*.78;const end=innerHeight*.17;const progress=Math.max(0,Math.min(1,(start-rect.top)/(start-end+rect.height*.56)));const active=Math.round(progress*chars.length);chars.forEach((char,i)=>char.classList.toggle('on',i<active));};
addEventListener('scroll',updateReveal,{passive:true});updateReveal();

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
