
// app.js - small demo interactivity
(function(){
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  // mobile menu toggle
  const mt = document.querySelector('.mobile-toggle');
  const mm = document.getElementById('mobile-menu');
  mt && mt.addEventListener('click', ()=>{
    const open = mm.classList.toggle('open');
    mt.setAttribute('aria-expanded', open);
    if(open){
      // copy menu markup for mobile
      mm.innerHTML = document.getElementById('main-menu').outerHTML;
    } else mm.innerHTML = '';
  });

  // smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const href = a.getAttribute('href');
      if(href.length>1 && document.querySelector(href)){
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth',block:'start'});
      }
    })
  });

  // lazy load gallery images from data-src
  const lazyImgs = document.querySelectorAll('#gallery img');
  lazyImgs.forEach(img=>{
    const src = img.getAttribute('data-src');
    if(src){ img.src = src; }
  });

  // gallery modal
  const modal = $('#modal');
  const modalImg = $('#modal-img');
  const modalClose = $('#modal-close');
  $$('#gallery img').forEach(img=>{
    img.addEventListener('click', ()=>{
      modal.classList.add('open');
      modalImg.src = img.src;
      modalImg.alt = img.alt || '';
    });
  });
  modalClose.addEventListener('click', ()=> modal.classList.remove('open'));
  modal.addEventListener('click', (e)=>{ if(e.target===modal) modal.classList.remove('open') });

  // simple contact form handling (demo-only)
  const form = $('#contact-form');
  const formMsg = $('#form-msg');
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    if(!name || !email){ formMsg.textContent = 'Please provide name and email.'; return; }
    formMsg.textContent = 'Thanks! Your message has been noted (demo only).';
    form.reset();
    setTimeout(()=> formMsg.textContent = '', 5000);
  });

  // subscribe (demo)
  const subBtn = $('#sub-btn');
  const subMsg = $('#sub-msg');
  subBtn.addEventListener('click', ()=>{
    const e = $('#sub-email');
    if(!e.value || !e.value.includes('@')){ subMsg.textContent = 'Please enter a valid email.'; return; }
    subMsg.textContent = 'Subscribed — thank you! (demo)';
    e.value = '';
    setTimeout(()=> subMsg.textContent = '', 4000);
  });

  // join spotlight (demo)
  $('#join-spot').addEventListener('click', ()=>{
    alert('Thanks for your interest! This is a demo — in a real site we would forward you to an event signup.');
  });

  // accessibility: close modal with Esc
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' && modal.classList.contains('open')) modal.classList.remove('open');
  });

})();
