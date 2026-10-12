/* Setup: highlight the step you are reading in the side list. */
(function () {
  'use strict';
  var links = Array.prototype.slice.call(document.querySelectorAll('.steps-nav a'));
  var steps = links.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  if (!('IntersectionObserver' in window) || !steps.length) return;
  var visible = {};
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting; });
    var current = steps.filter(function (s) { return visible[s.id]; })[0];
    if (!current) return;
    links.forEach(function (a) { a.dataset.on = a.getAttribute('href') === '#' + current.id ? '1' : '0'; });
  }, { rootMargin: '-30% 0px -60% 0px' });
  steps.forEach(function (s) { io.observe(s); });
})();
