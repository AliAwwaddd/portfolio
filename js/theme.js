// Light / dark theme toggle
// (works with the inline pre-paint snippet in <head> that applies a saved choice)
(function(){
  var root = document.documentElement;
  var btn = document.getElementById('themeBtn');
  var icon = document.getElementById('themeIcon');
  var sun = '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path>';
  var moon = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
  var stored = null;
  try { stored = localStorage.getItem('theme'); } catch(e){}
  function apply(mode){
    if (mode === 'light' || mode === 'dark') root.setAttribute('data-theme', mode);
    else root.removeAttribute('data-theme');
    var dark = mode === 'dark' || (mode !== 'light' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    icon.innerHTML = dark ? sun : moon;
  }
  apply(stored || 'system');
  btn.addEventListener('click', function(){
    var current = root.getAttribute('data-theme');
    if (current !== 'light' && current !== 'dark') {
      current = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
    }
    var next = current === 'dark' ? 'light' : 'dark';
    apply(next);
    try { localStorage.setItem('theme', next); } catch(e){}
  });
})();
