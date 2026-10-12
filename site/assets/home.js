/* Home: paste a link, pick a format, get the Terminal line. The site downloads nothing. */
(function () {
  'use strict';
  var Snag = window.Snag;
  var $ = function (id) { return document.getElementById(id); };

  var DEST = '~/Downloads';
  var TPL = '%(uploader,channel,creator,id)s - %(title).80B [%(id)s].%(ext)s';

  var MODES = [
    { id: 'edit',   short: 'Edit',  nm: 'Ready to edit', spec: 'H.264 · AAC · MP4',     note: '<b>Ready to edit:</b> the best quality that needs no converting. Up to 1080p on YouTube.' },
    { id: 'small',  short: 'Small', nm: 'Small file',    spec: '720p · H.264 · MP4',    note: '<b>Small file:</b> same format, capped at 720p. Good for sending or previewing.' },
    { id: 'mp3',    short: 'Audio', nm: 'Audio only',    spec: 'MP3 · cover art',       note: '<b>Audio only:</b> an MP3 with the cover art and track details written in.' },
    { id: 'recode', short: '4K',    nm: '4K (slow)',     spec: 'Best stream → H.264 MP4', note: '<b>4K (slow):</b> the sharpest stream, re-encoded to H.264 so it edits. Takes minutes.' }
  ];
  var OPTS = [
    { id: 'sub',      nm: 'Subtitles',           ds: 'English subtitles inside the file, plus a .srt beside it.' },
    { id: 'cookies',  nm: 'Use my Chrome login', ds: 'Turns on by itself for Instagram and TikTok. Quit Chrome before you run the command.' },
    { id: 'sponsor',  nm: 'Cut sponsor reads',   ds: 'Removes sponsor and self-promo segments from YouTube videos.' },
    { id: 'playlist', nm: 'Whole playlist',      ds: 'Off means a YouTube link with &list= gets only that one video.' },
    { id: 'once',     nm: 'Skip repeats',        ds: 'Remembers what you already downloaded and skips it.' }
  ];

  var state = { mode: 'edit', cap: '', raw: false, shown: false };
  OPTS.forEach(function (o) { state[o.id] = false; });
  var cookiesTouched = false;

  var input = $('link'), field = $('field'), msg = $('fieldMsg'), result = $('result'),
      cmdEl = $('cmd'), meta = $('meta'), copyBtn = $('copyBtn'), pop = $('pop'), moreBtn = $('moreBtn');
  var DEFAULT_MSG = msg.textContent;

  function shq(a) { return /^[A-Za-z0-9_.\/:=-]+$/.test(a) ? a : '"' + a.replace(/"/g, '\\"') + '"'; }

  function platformOf(u) {
    if (/instagram\.com/i.test(u)) return 'Instagram';
    if (/tiktok\.com/i.test(u)) return 'TikTok';
    if (/youtube\.com|youtu\.be/i.test(u)) return 'YouTube';
    if (/facebook\.com|fb\.watch/i.test(u)) return 'Facebook';
    if (/(^|\/\/)(www\.)?(x|twitter)\.com/i.test(u)) return 'X';
    return null;
  }

  // Anything separated by whitespace is a link. A bare "youtube.com/..." gets https:// added.
  function getLinks() {
    return input.value.split(/\s+/).filter(Boolean).map(function (t) {
      if (!/^https?:\/\//i.test(t) && platformOf(t)) t = 'https://' + t.replace(/^\/+/, '');
      return t;
    });
  }

  function effCap() {
    if (state.mode !== 'small') return state.cap;
    if (!state.cap) return '720';
    return String(Math.min(parseInt(state.cap, 10), 720));
  }

  function snagFlags() {
    var f = [];
    if (state.mode === 'recode') f.push('--max', '--recode');
    if (state.mode === 'mp3') f.push('--mp3');
    var cap = effCap();
    if (cap) f.push('-q', cap);
    if (state.sub) f.push('--sub');
    if (state.cookies) f.push('--cookies');
    if (state.sponsor) f.push('--nosponsor');
    if (state.playlist) f.push('--playlist');
    if (state.once) f.push('--once');
    return f;
  }
  function buildSnag(urls) {
    var head = ['snag'].concat(snagFlags());
    if (urls.length === 1) return head.concat([shq(urls[0])]).join(' ');
    return head.join(' ') + urls.map(function (u) { return ' \\\n  ' + shq(u); }).join('');
  }
  function buildRawFor(urls, platform) {
    var a = ['yt-dlp', '-P', DEST, '-o', TPL, '--trim-filenames', '200', '--restrict-filenames'];
    var cap = effCap();
    var hf = cap ? '[height<=' + cap + ']' : '';
    if (state.mode === 'mp3') {
      a.push('-x', '--audio-format', 'mp3', '--audio-quality', '0', '--embed-metadata', '--embed-thumbnail');
    } else if (state.mode === 'recode') {
      a.push('-f', 'bv*' + hf + '+ba/b' + hf, '-S', 'res,fps,acodec:m4a,vcodec', '--merge-output-format', 'mp4');
      a.push('--exec', "after_move:'~/bin/snag' --__transcode %(filepath)q");
    } else {
      a.push('-f', 'bv*[vcodec^=avc1]' + hf + '+ba[acodec^=mp4a]/bv*[vcodec^=avc1]' + hf + '+ba/b[vcodec^=avc1]' + hf + '/b' + hf,
             '-S', 'res,fps', '--merge-output-format', 'mp4');
    }
    if (platform === 'TikTok' || platform === 'Instagram') a.push('--impersonate', 'chrome');
    a.push(state.playlist ? '--yes-playlist' : '--no-playlist');
    if (state.cookies) a.push('--cookies-from-browser', 'chrome');
    if (state.sponsor) a.push('--sponsorblock-remove', 'sponsor,selfpromo,interaction');
    if (state.once) a.push('--download-archive', '~/.config/snag/archive.txt');
    if (state.sub && state.mode !== 'mp3') a.push('--write-subs', '--write-auto-subs', '--sub-langs', 'en.*', '--convert-subs', 'srt', '--embed-subs');
    if (state.mode !== 'mp3') a.push('--embed-metadata');
    a.push('--concurrent-fragments', '4', '--retries', '10', '--fragment-retries', '10', '--no-abort-on-error', '--progress');
    return a.map(function (t, i) { return i === 0 ? t : shq(t); }).join(' ')
         + urls.map(function (u) { return ' ' + shq(u); }).join('');
  }
  function buildRaw(urls) {
    var g = {}, order = [];
    urls.forEach(function (u) {
      var p = platformOf(u) || 'Other';
      if (!g[p]) { g[p] = []; order.push(p); }
      g[p].push(u);
    });
    return order.map(function (p) { return buildRawFor(g[p], p); }).join('\n\n');
  }

  // ---------- controls ----------

  function renderFormats() {
    $('formats').innerHTML = MODES.map(function (m) {
      var on = state.mode === m.id;
      return '<button type="button" role="radio" data-mode="' + m.id + '" aria-checked="' + on + '" tabindex="' + (on ? 0 : -1) + '" aria-label="' + m.nm + '"><span class="long">' + m.nm + '</span><span class="short" aria-hidden="true">' + m.short + '</span></button>';
    }).join('');
    var m = MODES.filter(function (x) { return x.id === state.mode; })[0];
    $('formatNote').innerHTML = m.note;
  }

  function renderOpts() {
    $('opts').innerHTML = OPTS.map(function (o) {
      return '<div class="pop-row"><span class="txt"><span class="nm" id="nm-' + o.id + '">' + o.nm + '</span>'
        + '<span class="ds">' + Snag.esc(o.ds) + '</span></span>'
        + '<button class="switch" type="button" role="switch" data-opt="' + o.id + '" aria-checked="' + !!state[o.id] + '" aria-labelledby="nm-' + o.id + '"></button></div>';
    }).join('');
    var n = OPTS.filter(function (o) { return state[o.id]; }).length + (state.cap ? 1 : 0);
    $('optCount').textContent = n ? '(' + n + ')' : '';
  }

  // ---------- reading the field ----------

  var ICONS = Array.prototype.slice.call(document.querySelectorAll('.field-icon svg'));
  function showIcon(p) {
    ICONS.forEach(function (s) { s.dataset.on = s.dataset.p === p ? '1' : '0'; });
  }

  function readField() {
    var urls = getLinks();
    field.dataset.filled = input.value ? '1' : '0';

    if (!cookiesTouched) {
      var needsLogin = urls.some(function (u) { var p = platformOf(u); return p === 'Instagram' || p === 'TikTok'; });
      if (needsLogin !== state.cookies) { state.cookies = needsLogin; renderOpts(); }
    }

    var bad = urls.filter(function (u) { return !platformOf(u); });
    var good = urls.filter(function (u) { return platformOf(u); });
    var sites = [];
    good.forEach(function (u) { var p = platformOf(u); if (sites.indexOf(p) < 0) sites.push(p); });

    if (!urls.length) {
      showIcon('none'); field.dataset.state = '';
      msg.dataset.tone = ''; msg.textContent = DEFAULT_MSG;
    } else if (bad.length) {
      showIcon('bad'); field.dataset.state = 'bad';
      msg.dataset.tone = 'bad';
      msg.textContent = (urls.length === 1 ? 'That does not look like a link Snag knows.' : bad.length + ' of these are not links Snag knows.')
        + ' Use a link from YouTube, Instagram, TikTok, Facebook or X.';
    } else {
      showIcon(sites.length === 1 ? sites[0] : 'none'); field.dataset.state = 'ok';
      msg.dataset.tone = 'ok';
      msg.innerHTML = urls.length === 1
        ? '<b>' + sites[0] + '</b> link'
        : '<b>' + urls.length + ' links</b> from ' + sites.join(', ');
    }
    return { urls: urls, ok: urls.length > 0 && !bad.length };
  }

  // ---------- the result window ----------

  function chip(text, tone, icon) {
    return '<span class="chip' + (tone ? ' ' + tone : '') + '">' + (icon || '') + text + '</span>';
  }
  var I_FOLDER = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M2 4.5h4l1.5 1.5H14v6.5H2z"/></svg>';
  var I_FILM = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="2" y="3" width="12" height="10" rx="2"/><path d="M6.5 6v4l3.5-2z" fill="currentColor" stroke="none"/></svg>';
  var I_WARN = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M8 2.2 14.3 13H1.7z" stroke-linejoin="round"/><path d="M8 6.5v3M8 11.3v.1"/></svg>';

  function renderResult() {
    var r = readField();
    if (!state.shown) return r;
    if (!r.ok) { result.hidden = true; state.shown = false; return r; }
    var text = state.raw ? buildRaw(r.urls) : buildSnag(r.urls);
    Snag.setCommand(cmdEl, text);
    $('termTitle').textContent = state.raw ? 'Terminal · the yt-dlp command Snag runs' : 'Terminal';
    var m = MODES.filter(function (x) { return x.id === state.mode; })[0];
    var cap = effCap();
    var bits = [chip('Lands in ~/Downloads', '', I_FOLDER), chip(m.spec, '', I_FILM)];
    if (cap && state.mode !== 'small') bits.push(chip('Up to ' + cap + 'p'));
    if (state.sub && state.mode !== 'mp3') bits.push(chip('.srt subtitles'));
    if (state.mode === 'recode') bits.push(chip('Re-encodes: takes minutes', 'warn', I_WARN));
    if (state.cookies) bits.push(chip('Quit Chrome first (⌘Q)', 'warn', I_WARN));
    meta.innerHTML = bits.join('');
    return r;
  }

  function reveal(copyNow) {
    var r = readField();
    if (!r.urls.length) {
      msg.dataset.tone = 'bad';
      msg.textContent = 'Paste a link first. Copy it from the app’s Share button or your browser’s address bar.';
      input.focus();
      return;
    }
    if (!r.ok) { input.focus(); return; }
    var first = !state.shown;
    state.shown = true;
    result.hidden = false;
    renderResult();
    if (first) {
      result.classList.remove('enter');
      void result.offsetWidth;
      result.classList.add('enter');
    }
    if (copyNow) Snag.copy(cmdEl.dataset.raw, copyBtn, 'Copied');
    var rect = result.getBoundingClientRect();
    if (rect.bottom > window.innerHeight) {
      result.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest' });
    }
  }

  // ---------- wiring ----------

  input.addEventListener('input', renderResult);
  $('finder').addEventListener('submit', function (e) { e.preventDefault(); reveal(true); });

  $('clearBtn').addEventListener('click', function () {
    input.value = ''; cookiesTouched = false; state.shown = false; result.hidden = true;
    readField(); input.focus();
  });

  $('pasteBtn').addEventListener('click', function () {
    var fail = function () {
      input.focus();
      msg.dataset.tone = '';
      msg.innerHTML = 'Your browser asked to keep the clipboard private. Press <kbd>⌘</kbd> <kbd>V</kbd> to paste.';
    };
    if (!navigator.clipboard || !navigator.clipboard.readText) return fail();
    navigator.clipboard.readText().then(function (t) {
      if (!t) return fail();
      input.value = t.trim();
      renderResult();
      if (readField().ok) reveal(false);
    }, fail);
  });

  $('formats').addEventListener('click', function (e) {
    var b = e.target.closest('[data-mode]'); if (!b) return;
    state.mode = b.dataset.mode; renderFormats(); renderResult();
    var on = $('formats').querySelector('[aria-checked="true"]'); if (on) on.focus();
  });
  $('formats').addEventListener('keydown', function (e) {
    var dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    var i = MODES.map(function (m) { return m.id; }).indexOf(state.mode);
    state.mode = MODES[(i + dir + MODES.length) % MODES.length].id;
    renderFormats(); renderResult();
    $('formats').querySelector('[aria-checked="true"]').focus();
  });

  function setPop(open) {
    pop.hidden = !open;
    moreBtn.setAttribute('aria-expanded', String(open));
  }
  moreBtn.addEventListener('click', function () { setPop(pop.hidden); });
  document.addEventListener('click', function (e) {
    if (!pop.hidden && !e.target.closest('.more')) setPop(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !pop.hidden) { setPop(false); moreBtn.focus(); }
  });
  $('opts').addEventListener('click', function (e) {
    var b = e.target.closest('[data-opt]'); if (!b) return;
    if (b.dataset.opt === 'cookies') cookiesTouched = true;
    state[b.dataset.opt] = !state[b.dataset.opt];
    renderOpts(); renderResult();
    var again = $('opts').querySelector('[data-opt="' + b.dataset.opt + '"]'); if (again) again.focus();
  });
  $('cap').addEventListener('change', function () { state.cap = this.value; renderOpts(); renderResult(); });

  $('rawBtn').addEventListener('click', function () {
    state.raw = !state.raw;
    this.textContent = state.raw ? 'Show snag' : 'Show yt-dlp';
    this.setAttribute('aria-pressed', String(state.raw));
    renderResult();
  });
  copyBtn.addEventListener('click', function () { if (cmdEl.dataset.raw) Snag.copy(cmdEl.dataset.raw, copyBtn, 'Copied'); });

  renderFormats(); renderOpts(); readField();
})();
