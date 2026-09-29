// Prepínač jazyka. Bez skriptu je stránka po slovensky; nič sa neukladá
// (žiadne cookies ani localStorage), voľba ide len do adresy ako ?lang=en.
(function () {
  var TEXT = {
    sk: {
      title: 'Moje kocky – evidencia zbierky pre Windows',
      description: 'Bezplatná evidencia zbierky LEGO® setov a figúrok pre Windows: hodnota, zisk, čiarové kódy, série figúrok. Údaje ostávajú na tvojom počítači.'
    },
    en: {
      title: 'Moje kocky – LEGO® collection tracker for Windows',
      description: 'A free tracker for your LEGO® sets and minifigures on Windows: value, profit, barcodes, minifigure series. Your data stays on your computer.'
    }
  };

  function initial () {
    var asked = new URLSearchParams(location.search).get('lang');
    if (asked === 'sk' || asked === 'en') return asked;
    var browser = (navigator.languages && navigator.languages[0]) || navigator.language || 'sk';
    return /^(sk|cs)\b/i.test(browser) ? 'sk' : 'en';
  }

  function apply (lang, remember) {
    var root = document.documentElement;
    root.lang = lang;
    document.title = TEXT[lang].title;
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', TEXT[lang].description);
    document.querySelectorAll('img[data-alt-en]').forEach(function (img) {
      if (!img.dataset.altSk) img.dataset.altSk = img.alt;
      img.alt = lang === 'en' ? img.dataset.altEn : img.dataset.altSk;
    });
    document.querySelectorAll('.lang button').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.lang === lang));
    });
    if (remember) {
      var url = new URL(location.href);
      if (lang === 'sk') url.searchParams.delete('lang');
      else url.searchParams.set('lang', lang);
      history.replaceState(null, '', url);
    }
  }

  document.querySelectorAll('.lang button').forEach(function (button) {
    button.addEventListener('click', function () { apply(button.dataset.lang, true); });
  });

  // Ponuka na telefóne sa po výbere sekcie zavrie.
  var menu = document.querySelector('.menu');
  if (menu) {
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { menu.removeAttribute('open'); });
    });
  }

  apply(initial(), false);

  // Galéria. Pás na stránke sa posúva do strany (šípky ho posunú o obrázok),
  // klik otvorí prehliadač cez celú obrazovku: snímky vedľa seba, posúva sa
  // prstom, touchpadom, tlačidlami aj klávesmi. Bez skriptu odkaz otvorí obrázok.
  var strip = document.querySelector('.strip');
  var thumbs = Array.prototype.slice.call(document.querySelectorAll('.strip .thumb'));
  var viewer = document.querySelector('.viewer');

  if (strip) {
    var back = document.querySelector('.strip-prev');
    var on = document.querySelector('.strip-next');
    var step = function () { return strip.querySelector('li').getBoundingClientRect().width + 20; };
    var edges = function () {
      back.disabled = strip.scrollLeft < 8;
      on.disabled = strip.scrollLeft + strip.clientWidth > strip.scrollWidth - 8;
    };
    back.addEventListener('click', function () { strip.scrollBy({ left: -step(), behavior: 'smooth' }); });
    on.addEventListener('click', function () { strip.scrollBy({ left: step(), behavior: 'smooth' }); });
    strip.addEventListener('scroll', edges, { passive: true });
    window.addEventListener('resize', edges);
    edges();
  }

  if (viewer && typeof viewer.showModal === 'function' && thumbs.length) {
    var track = viewer.querySelector('.track');
    var count = viewer.querySelector('.viewer-count');
    var index = 0;

    var build = function () {
      var lang = document.documentElement.lang === 'en' ? 'en' : 'sk';
      track.textContent = '';
      thumbs.forEach(function (thumb) {
        var parts = thumb.querySelectorAll('.cap .' + lang);
        var slide = document.createElement('figure');
        slide.className = 'slide';
        var img = document.createElement('img');
        img.src = thumb.dataset.full;
        img.alt = thumb.querySelector('img').alt;
        img.width = 1440;
        img.height = 900;
        var caption = document.createElement('figcaption');
        var title = document.createElement('strong');
        title.textContent = parts[0] ? parts[0].textContent : '';
        caption.appendChild(title);
        caption.appendChild(document.createTextNode(parts[1] ? parts[1].textContent : ''));
        slide.appendChild(img);
        slide.appendChild(caption);
        track.appendChild(slide);
      });
    };
    var label = function () { count.textContent = (index + 1) + ' / ' + thumbs.length; };
    var go = function (to, smooth) {
      index = Math.max(0, Math.min(thumbs.length - 1, to));
      track.scrollTo({ left: index * track.clientWidth, behavior: smooth ? 'smooth' : 'auto' });
      label();
    };

    thumbs.forEach(function (thumb, i) {
      thumb.addEventListener('click', function (event) {
        event.preventDefault();
        build();
        viewer.showModal();
        document.body.style.overflow = 'hidden';
        go(i, false);
        track.focus();
      });
    });
    track.addEventListener('scroll', function () {
      var now = Math.round(track.scrollLeft / Math.max(track.clientWidth, 1));
      if (now !== index) { index = now; label(); }
    }, { passive: true });
    viewer.querySelector('.viewer-prev').addEventListener('click', function () { go(index - 1, true); });
    viewer.querySelector('.viewer-next').addEventListener('click', function () { go(index + 1, true); });
    viewer.querySelector('.viewer-close').addEventListener('click', function () { viewer.close(); });
    viewer.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') { event.preventDefault(); go(index - 1, true); }
      if (event.key === 'ArrowRight') { event.preventDefault(); go(index + 1, true); }
    });
    // Klik vedľa snímky (na tmavé pozadie) prehliadač zavrie.
    track.addEventListener('click', function (event) {
      if (event.target === track || event.target.classList.contains('slide')) viewer.close();
    });
    window.addEventListener('resize', function () { if (viewer.open) go(index, false); });
    viewer.addEventListener('close', function () {
      document.body.style.overflow = '';
      thumbs[index].scrollIntoView({ block: 'nearest', inline: 'nearest' });
      thumbs[index].focus({ preventScroll: true });
    });
  }
})();
