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

  // Galéria: náhľad otvorí veľkú snímku v dialógu, šípky a klávesy listujú.
  // Bez skriptu odkaz otvorí obrázok priamo.
  var thumbs = Array.prototype.slice.call(document.querySelectorAll('.gallery .thumb'));
  var box = document.querySelector('.lightbox');
  if (box && typeof box.showModal === 'function' && thumbs.length) {
    var big = box.querySelector('img');
    var caption = box.querySelector('figcaption');
    var current = 0;

    var show = function (index) {
      current = (index + thumbs.length) % thumbs.length;
      var thumb = thumbs[current];
      var lang = document.documentElement.lang === 'en' ? 'en' : 'sk';
      var parts = thumb.querySelectorAll('.cap .' + lang);
      big.src = thumb.dataset.full;
      big.alt = thumb.querySelector('img').alt;
      caption.innerHTML = '';
      var title = document.createElement('strong');
      title.textContent = parts[0] ? parts[0].textContent : '';
      caption.appendChild(title);
      caption.appendChild(document.createTextNode(parts[1] ? parts[1].textContent : ''));
    };

    thumbs.forEach(function (thumb, index) {
      thumb.addEventListener('click', function (event) {
        event.preventDefault();
        show(index);
        box.showModal();
      });
    });
    box.querySelector('.lb-prev').addEventListener('click', function () { show(current - 1); });
    box.querySelector('.lb-next').addEventListener('click', function () { show(current + 1); });
    box.querySelector('.lb-close').addEventListener('click', function () { box.close(); });
    box.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') show(current - 1);
      if (event.key === 'ArrowRight') show(current + 1);
    });
    // Klik mimo obrázka (na pozadie) dialóg zavrie.
    box.addEventListener('click', function (event) {
      if (event.target === box) box.close();
    });
    box.addEventListener('close', function () { thumbs[current].focus(); });
  }
})();
