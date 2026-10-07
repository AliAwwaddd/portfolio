// Experience filter — show highlights for one discipline (AI / backend / frontend / cloud)
(function(){
  var lens = document.getElementById('lens');
  if (!lens) return;
  var cards = lens.querySelectorAll('.lens-card');
  var reset = document.getElementById('lensReset');
  var status = document.getElementById('lensStatus');
  var roles = document.querySelectorAll('.xp[data-filterable]');
  var groups = document.querySelectorAll('#experience .grp');
  var names = { ai: 'AI engineering', be: 'backend', fe: 'frontend & mobile', cl: 'cloud & DevOps' };

  // counts come from the markup so they never drift from the bullets
  lens.querySelectorAll('[data-count]').forEach(function(el){
    el.textContent = document.querySelectorAll('#experience .grp[data-cat="' + el.dataset.count + '"] li').length;
  });

  function select(cat){
    cards.forEach(function(c){ c.setAttribute('aria-pressed', String(c.dataset.cat === cat)); });
    lens.classList.toggle('filtered', cat !== 'all');
    reset.hidden = cat === 'all';
    groups.forEach(function(g){ g.hidden = cat !== 'all' && g.dataset.cat !== cat; });
    roles.forEach(function(r){
      var match = r.querySelector('.grp:not([hidden])');
      r.hidden = !match;
      if (cat !== 'all' && match) r.open = true;
    });
    status.textContent = cat === 'all' ? 'Showing all highlights' : 'Showing ' + names[cat] + ' highlights';
  }

  cards.forEach(function(c){
    c.addEventListener('click', function(){
      select(c.getAttribute('aria-pressed') === 'true' ? 'all' : c.dataset.cat);
    });
  });
  reset.addEventListener('click', function(){ select('all'); });
})();
