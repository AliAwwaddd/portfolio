// Section progress rail — replaces the scrollbar on wide screens.
// One dot per section; the line fills as you scroll and reaches each dot as its section becomes current.
// Section positions are cached (not measured per frame), and the fill only animates transform.
(function(){
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  if (!sections.length) return;

  var rail = document.createElement('nav');
  rail.className = 'rail';
  rail.setAttribute('aria-label', 'Page sections');
  var track = document.createElement('div');
  track.className = 'rail-track';
  var fill = document.createElement('div');
  fill.className = 'rail-fill';
  track.appendChild(fill);
  rail.appendChild(track);

  var last = sections.length - 1;
  var dots = sections.map(function(s, i){
    var head = s.querySelector('h2');
    var a = document.createElement('a');
    a.className = 'rail-dot';
    a.href = '#' + s.id;
    a.style.top = (i / last * 100) + '%';
    a.innerHTML = '<span class="rail-label"></span>';
    a.firstChild.textContent = head ? head.textContent : s.id;
    rail.appendChild(a);
    return a;
  });
  document.body.appendChild(rail);

  var tops = [], heights = [];
  function measure(){
    sections.forEach(function(s, i){
      var r = s.getBoundingClientRect();
      tops[i] = r.top + window.scrollY;
      heights[i] = r.height;
    });
    update();
  }

  var current = -2, ticking = false;
  function update(){
    ticking = false;
    var y = window.scrollY, mid = y + window.innerHeight / 2;
    var atEnd = y + window.innerHeight >= document.documentElement.scrollHeight - 2;
    var idx = -1;
    for (var i = 0; i <= last; i++) if (mid >= tops[i]) idx = i;
    if (atEnd) idx = last;
    var progress = 0;
    if (idx >= 0){
      var frac = atEnd ? 0 : Math.min(1, (mid - tops[idx]) / heights[idx]);
      progress = Math.min(1, (idx + frac) / last);
    }
    fill.style.transform = 'scaleY(' + progress + ')';
    if (idx !== current){
      current = idx;
      rail.classList.toggle('show', idx >= 0);
      dots.forEach(function(d, i){
        d.classList.toggle('passed', i < idx);
        d.classList.toggle('current', i === idx);
        if (i === idx) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
      });
    }
  }

  window.addEventListener('scroll', function(){
    if (!ticking){ ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', measure);
  // page height changes when roles expand/collapse or the experience filter runs
  if ('ResizeObserver' in window) new ResizeObserver(measure).observe(document.querySelector('main'));
  window.addEventListener('load', measure);
  measure();
})();
