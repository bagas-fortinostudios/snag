/* Source: print the whole script with line numbers, comments dimmed. */
(function () {
  'use strict';
  var Snag = window.Snag;
  var el = document.getElementById('listing');
  if (!el || !Snag.source) return;
  el.innerHTML = Snag.source.split('\n').map(function (l) {
    var t = Snag.esc(l) || ' ';
    if (/^\s*#/.test(l)) t = '<span class="c">' + t + '</span>';
    return '<span class="l">' + t + '</span>';
  }).join('');
  document.getElementById('copySource').addEventListener('click', function () {
    Snag.copy(Snag.source, this);
  });
})();
