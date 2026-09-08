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
