const cDot = document.getElementById('cDot');
const cRing = document.getElementById('cRing');
let mx=0,my=0, rx=0, ry=0;
window.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; cDot.style.transform=`translate(${mx-4}px,${my-4}px)`; });
function ringLoop(){
  rx += (mx-rx)*0.15; ry += (my-ry)*0.15;
  cRing.style.transform = `translate(${rx-19}px,${ry-19}px)`;
  requestAnimationFrame(ringLoop);
}
ringLoop();
document.querySelectorAll('a, .work-row, .menu-toggle').forEach(el => {
  el.addEventListener('mouseenter', () => cRing.classList.add('big'));
  el.addEventListener('mouseleave', () => cRing.classList.remove('big'));
});

const dotLinks = document.querySelectorAll('.side-dots a');
const spySections = document.querySelectorAll('section, .hero');
const spyObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      const id = e.target.id;
      dotLinks.forEach(d => d.classList.toggle('active', d.dataset.id === id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
spySections.forEach(s => s.id && spyObs.observe(s));

const maskObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); maskObs.unobserve(e.target); } });
}, { threshold: .2 });
document.querySelectorAll('.reveal-mask').forEach(el => maskObs.observe(el));

const fadeObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); fadeObs.unobserve(e.target); } });
}, { threshold: .15 });
document.querySelectorAll('.fade-el').forEach(el => fadeObs.observe(el));

const preview = document.getElementById('preview');
const previewLabel = preview.querySelector('span');
const previewImg = document.getElementById('previewImg');
document.querySelectorAll('.work-row').forEach(row => {
  row.addEventListener('mouseenter', () => {
    preview.classList.add('show');
    previewLabel.textContent = row.dataset.preview;
    previewImg.src = row.dataset.img || '';
  });
  row.addEventListener('mouseleave', () => preview.classList.remove('show'));
});
window.addEventListener('mousemove', e => {
  preview.style.transform = `translate(${e.clientX + 24}px, ${e.clientY - 95}px)`;
});

document.querySelector('.menu-toggle').addEventListener('click', () => {
  const links = document.querySelector('.top-links');
  const open = links.style.display === 'flex';
  links.style.cssText = open ? '' : 'display:flex;flex-direction:column;position:fixed;top:60px;right:20px;background:#0c0c0c;padding:20px 26px;gap:16px;z-index:200;';
});

// ---- magnetic hover effect ----
document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  });
  el.addEventListener('mouseleave', () => { el.style.transform = ''; });
});

// ---- stat count-up on reveal ----
const statObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.querySelectorAll('.stat-block b').forEach(el => {
        const target = parseInt(el.dataset.count, 10);
        let cur = 0;
        const step = Math.max(1, Math.round(target / 40));
        const tick = () => {
          cur += step;
          if(cur >= target){ el.textContent = target; return; }
          el.textContent = cur;
          requestAnimationFrame(tick);
        };
        tick();
      });
      statObs.unobserve(entry.target);
    }
  });
}, { threshold: .4 });
document.querySelectorAll('.stats-row').forEach(el => statObs.observe(el));

// ---- certificate lightbox ----
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCap = document.getElementById('lightboxCap');
document.querySelectorAll('.cert-card').forEach(card => {
  card.addEventListener('click', () => {
    lightboxImg.src = card.dataset.full;
    lightboxCap.textContent = card.querySelector('h4').textContent;
    lightbox.classList.add('show');
  });
});
document.getElementById('lightboxClose').addEventListener('click', () => lightbox.classList.remove('show'));
lightbox.addEventListener('click', (e) => { if(e.target === lightbox) lightbox.classList.remove('show'); });
document.addEventListener('keydown', (e) => { if(e.key === 'Escape') lightbox.classList.remove('show'); });

// ---- copy email ----
const copyEmailBtn = document.getElementById('copyEmail');
if(copyEmailBtn){
  copyEmailBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('alex.rivera@email.com').then(() => {
      const original = copyEmailBtn.textContent;
      copyEmailBtn.textContent = 'Copied ✓';
      setTimeout(() => { copyEmailBtn.textContent = original; }, 1800);
    });
  });
}

// ---- contact form fake submit ----
const cForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
if(cForm){
  cForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formNote.classList.add('show');
    const btn = cForm.querySelector('button');
    btn.textContent = 'Sent ✓';
    setTimeout(() => { cForm.reset(); btn.textContent = 'Send Message →'; }, 2200);
  });
}

// ---- resume button placeholder ----
const resumeBtn = document.getElementById('resumeBtn');
if(resumeBtn){
  resumeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Add a link to your resume PDF here (edit the href of #resumeBtn).');
  });
}

// ---- about photo subtle tilt ----
const aboutPhoto = document.querySelector('.about-photo');
if(aboutPhoto){
  aboutPhoto.addEventListener('mousemove', (e) => {
    const r = aboutPhoto.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    aboutPhoto.style.transform = `perspective(700px) rotateY(${x*8}deg) rotateX(${-y*8}deg)`;
  });
  aboutPhoto.addEventListener('mouseleave', () => { aboutPhoto.style.transform = ''; });
}
