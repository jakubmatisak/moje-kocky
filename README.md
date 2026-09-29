# Moje kocky – stránka projektu

**[English version below](#english)**

Stránka na stiahnutie [Moje kocky Desktop](https://github.com/jakubmatisak/moje-kocky-desktop),
nekomerčnej evidencie zbierky LEGO® setov pre Windows. Beží na GitHub Pages:
<https://jakubmatisak.github.io/moje-kocky/>.

Súvisiace repozitáre: [moje-kocky-desktop](https://github.com/jakubmatisak/moje-kocky-desktop)
(program pre Windows a inštalátor) a [moje-kocky-webapp](https://github.com/jakubmatisak/moje-kocky-webapp)
(webová verzia na vlastný server).

## Obsah repozitára

Je to jeden statický súbor HTML bez frameworku a bez zostavovania:

```
index.html                 obsah, slovensky aj anglicky (.sk / .en), SEO v <head>
assets/style.css           farby a rozloženie ako v appke, tmavý režim podľa systému alebo voľby
assets/site.js             jazyk (?lang=en), svetlý/tmavý režim (localStorage „theme“), galéria
assets/fonts/              Roboto (OFL-1.1, pozri OFL.txt), uložené tu, nie z Google Fonts
assets/img/                snímky desktopu s ukážkovou zbierkou (vymyslené ručné ceny),
                           *-male = náhľady, og.jpg = obrázok na zdieľanie 1200×630
sitemap.xml                mapa stránky pre vyhľadávače (obe jazykové verzie)
third-party-notices.txt    licencie knižníc v inštalátore (z packaging/notices.py desktopu)
```

Náhľad: `python -m http.server` v tomto priečinku. Zverejnenie: GitHub Pages z vetvy
`main`, priečinok `/ (root)`.

## Pravidlá, ktoré stránka dodržiava

- **Žiadne cookies, analytika ani cudzie servery.** V prehliadači ostáva len voľba
  režimu (`localStorage.theme`), o ktorú si návštevník sám požiadal. Písmo, ikony aj
  skripty sú súčasťou stránky, takže IP návštevníka nikam neodchádza. Ak by pribudlo
  čokoľvek také, treba najprv lištu so súhlasom.
- **LEGO® Fair Play.** Značka len ako prídavné meno a vždy so ®, nikdy logo LEGO ani
  „LEGO“ v adrese; v päte upozornenie, že LEGO Group stránku nesponzoruje.
- **Kredit všetkým službám a knižniciam.** Služby majú kartu v Licenciách, knižnice sú
  v `third-party-notices.txt` (odkaz v Licenciách); pri novej závislosti v desktope ho
  pregenerovať.
- **Texty sú v oboch jazykoch.** Nový text = `<span class="sk">` aj `<span class="en">`.
- **Po zmene CSS alebo JS zvýš `?v=` v odkazoch v `index.html`**, inak prehliadač podrží
  starý súbor.

## Vyhľadávače (SEO)

- `<head>` má kanonickú adresu, `hreflang` (koreň = slovensky, `?lang=en` = anglicky),
  Open Graph a Twitter kartu s obrázkom `assets/img/og.jpg` a štruktúrované dáta
  `SoftwareApplication` (zadarmo, Windows) v JSON-LD.
- `site.js` pri angličtine prepne canonical, `og:url`, názov a popis. Roboty bez `?lang`
  dostanú vždy slovenčinu, nie jazyk prehliadača, aby sa verzie nemiešali.
- `sitemap.xml` obsahuje obe verzie. `robots.txt` na podstránke projektu vyhľadávače
  nečítajú, preto tu nie je; mapu stránky treba odoslať v Google Search Console.
- Pri zmene obsahu uprav `lastmod` v `sitemap.xml` a popisy v `<head>` aj v `site.js` (`TEXT`).

## Licencia

Obsah a kód stránky: [MIT](LICENSE). Písmo Roboto: SIL Open Font License 1.1.
Snímky obsahujú obrázky výrobkov, ktoré sú chránené autorským právom LEGO Group.
LEGO® je ochranná známka skupiny spoločností LEGO Group, ktorá túto stránku
nesponzoruje, neautorizuje ani neschvaľuje.

---

<a id="english"></a>

# Moje kocky – project website (English)

The download page for [Moje kocky Desktop](https://github.com/jakubmatisak/moje-kocky-desktop),
a non-commercial tracker for LEGO® set collections on Windows (“Moje kocky” is Slovak for
“My bricks”). It runs on GitHub Pages: <https://jakubmatisak.github.io/moje-kocky/>
(English version: <https://jakubmatisak.github.io/moje-kocky/?lang=en>).

Related repositories: [moje-kocky-desktop](https://github.com/jakubmatisak/moje-kocky-desktop)
(the Windows program and installer) and [moje-kocky-webapp](https://github.com/jakubmatisak/moje-kocky-webapp)
(the web version for your own server).

## What is in this repository

A single static HTML page with no framework and no build step:

```
index.html                 content in Slovak and English (.sk / .en), SEO in <head>
assets/style.css           colours and layout matching the app, dark mode from the system or the toggle
assets/site.js             language (?lang=en), light/dark mode (localStorage “theme”), gallery
assets/fonts/              Roboto (OFL-1.1, see OFL.txt), served from here, not from Google Fonts
assets/img/                desktop screenshots of a sample collection (made-up manual prices),
                           *-male = thumbnails, og.jpg = 1200×630 sharing image
sitemap.xml                sitemap for search engines (both language versions)
third-party-notices.txt    licences of the libraries in the installer (from the desktop's packaging/notices.py)
```

Preview: `python -m http.server` in this folder. Publishing: GitHub Pages from the `main`
branch, folder `/ (root)`.

## Rules the site follows

- **No cookies, analytics or third-party servers.** The only thing kept in the browser is
  the visitor's own light/dark choice (`localStorage.theme`). Fonts, icons and scripts are
  part of the site, so the visitor's IP address goes nowhere else. Anything like that would
  first need a consent banner.
- **LEGO® Fair Play.** The trademark only as an adjective and always with ®, never the LEGO
  logo and never “LEGO” in the address; the footer states that the LEGO Group does not
  sponsor the site.
- **Credit to every service and library.** Each service has a card under Licences; the
  libraries are listed in `third-party-notices.txt` (linked from Licences), which is
  regenerated whenever the desktop gains a dependency.
- **All text exists in both languages.** New text = both `<span class="sk">` and `<span class="en">`.
- **After changing the CSS or JS, bump `?v=` in the links in `index.html`**, otherwise browsers
  keep the old file.

## Search engines (SEO)

- `<head>` has a canonical URL, `hreflang` (root = Slovak, `?lang=en` = English), Open Graph
  and a Twitter card with `assets/img/og.jpg`, and `SoftwareApplication` structured data
  (free, Windows) as JSON-LD.
- In English, `site.js` switches the canonical URL, `og:url`, title and description. Crawlers
  without `?lang` always get Slovak rather than their browser language, so the two versions
  do not mix.
- `sitemap.xml` lists both versions. Search engines ignore `robots.txt` on a project subpath,
  so there is none; submit the sitemap in Google Search Console instead.
- When the content changes, update `lastmod` in `sitemap.xml` and the descriptions in `<head>`
  and in `site.js` (`TEXT`).

## Licence

Site content and code: [MIT](LICENSE). Roboto font: SIL Open Font License 1.1.
The screenshots contain product images that are copyright of the LEGO Group.
LEGO® is a trademark of the LEGO Group of companies which does not sponsor, authorize or
endorse this site.
