/* Shared by every page: the nav, copy buttons, and Terminal windows. */
(function () {
  'use strict';

  var Snag = window.Snag = {};

  Snag.esc = function (s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  };

  // A command window: each real line gets its own span so long lines hang-indent,
  // and the exact text lives on dataset.raw so copying is never polluted by markup.
  Snag.setCommand = function (el, text) {
    el.dataset.raw = text;
    var cont = false, heredoc = null;
    el.innerHTML = text.split('\n').map(function (l) {
      // continuation lines and the body of a heredoc get no prompt, as in a real Terminal
      var inside = cont || heredoc !== null;
      var cls = 'ln' + (l ? ' cmd' : '') + (inside ? ' cont' : '');
      if (heredoc !== null) { if (l === heredoc) heredoc = null; }
      else { var h = l.match(/<<'?(\w+)'?/); if (h) heredoc = h[1]; }
      cont = /\\$/.test(l);
      return '<span class="' + cls + '">' + (Snag.esc(l) || '&nbsp;') + '</span>';
    }).join('');
  };

  Snag.copy = function (text, btn, label) {
    var old = btn.innerHTML;
    var done = function () {
      btn.innerHTML = label || 'Copied';
      btn.dataset.done = '1';
      clearTimeout(btn._t);
      btn._t = setTimeout(function () { btn.innerHTML = old; delete btn.dataset.done; }, 1800);
    };
    var fallback = function () {
      var t = document.createElement('textarea');
      t.value = text;
      t.setAttribute('readonly', '');
      t.style.position = 'fixed';
      t.style.opacity = '0';
      document.body.appendChild(t);
      t.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(t);
      done();
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else {
      fallback();
    }
  };

  // Every static command window on the page.
  Array.prototype.forEach.call(document.querySelectorAll('[data-command]'), function (el) {
    Snag.setCommand(el, el.textContent.replace(/^\n+|\s+$/g, ''));
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-copy]'), function (b) {
    b.addEventListener('click', function () {
      var el = document.getElementById(b.dataset.copy);
      if (el) Snag.copy(el.dataset.raw !== undefined ? el.dataset.raw : el.textContent, b);
    });
  });

  // The installer: the full script, written to ~/bin/snag, made executable, put on PATH.
  if (window.SNAG_SOURCE) {
    var src = window.SNAG_SOURCE.replace(/^\n/, '').replace(/\s+$/, '');
    Snag.source = src;
    Snag.lineCount = src.split('\n').length;
    Snag.installer = 'mkdir -p ~/bin\n'
      + "cat > ~/bin/snag <<'SNAG_INSTALL_EOF'\n" + src + '\nSNAG_INSTALL_EOF\n'
      + 'chmod +x ~/bin/snag\n'
      + 'grep -q \'HOME/bin\' ~/.zshrc 2>/dev/null || echo \'export PATH="$HOME/bin:$PATH"\' >> ~/.zshrc\n'
      + 'echo "snag installed. Open a new Terminal tab, then run: snag --help"';
    Snag.installerPreview = 'mkdir -p ~/bin\n'
      + "cat > ~/bin/snag <<'SNAG_INSTALL_EOF'\n"
      + '   ... the ' + Snag.lineCount + ' lines of the script ...\n'
      + 'SNAG_INSTALL_EOF\n'
      + 'chmod +x ~/bin/snag';
    Array.prototype.forEach.call(document.querySelectorAll('[data-installer-preview]'), function (el) {
      Snag.setCommand(el, Snag.installerPreview);
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-copy-installer]'), function (b) {
      b.addEventListener('click', function () { Snag.copy(Snag.installer, b); });
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-line-count]'), function (el) {
      el.textContent = Snag.lineCount;
    });
  }

  // Mobile nav.
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-toggle');
  if (nav && toggle) {
    toggle.addEventListener('click', function () {
      var open = nav.dataset.open === '1';
      nav.dataset.open = open ? '0' : '1';
      toggle.setAttribute('aria-expanded', String(!open));
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.dataset.open === '1') {
        nav.dataset.open = '0';
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }
})();
