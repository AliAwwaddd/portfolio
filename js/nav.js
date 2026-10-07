// Mobile nav — hamburger menu toggle
(function(){
  var btn = document.getElementById('menuBtn');
  var menu = document.getElementById('navMenu');
  function close(){ menu.classList.remove('open'); btn.setAttribute('aria-expanded','false'); btn.setAttribute('aria-label','Open menu'); }
  btn.addEventListener('click', function(){
    var open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  menu.addEventListener('click', function(e){ if (e.target.tagName === 'A') close(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') close(); });
  window.addEventListener('resize', function(){ if (window.innerWidth >= 720) close(); });
})();

// Active section — mark the nav link of the section crossing the middle of the viewport
(function(){
  var sections = document.querySelectorAll('main section[id]');
  if (!('IntersectionObserver' in window) || !sections.length) return;
  var links = document.querySelectorAll('#navMenu a');
  function activate(id){
    links.forEach(function(a){
      if (a.getAttribute('href') === '#' + id) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if (e.isIntersecting) activate(e.target.id); });
  }, { rootMargin: '-50% 0px -50% 0px' });
  sections.forEach(function(s){ io.observe(s); });
  // back in the hero: no link is active
  var hero = document.getElementById('top');
  if (hero) io.observe(hero);
})();
