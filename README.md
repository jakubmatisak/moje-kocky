# Moje kocky – stránka projektu

Stránka na stiahnutie [Moje kocky Desktop](https://github.com/jakubmatisak/moje-kocky-desktop),
nekomerčnej evidencie zbierky LEGO® setov pre Windows. Beží na GitHub Pages:
<https://jakubmatisak.github.io/moje-kocky-website/>.

Je to jeden statický súbor HTML bez frameworku a bez zostavovania:

```
index.html                 obsah, slovensky aj anglicky (.sk / .en)
assets/style.css           farby a rozloženie ako v appke, tmavý režim podľa systému alebo voľby
assets/site.js             jazyk (?lang=en), svetlý/tmavý režim (localStorage „theme“), galéria
assets/fonts/              Roboto (OFL-1.1, pozri OFL.txt), uložené tu, nie z Google Fonts
assets/img/                snímky desktopu s ukážkovou zbierkou (vymyslené ručné ceny), *-male = náhľady
third-party-notices.txt    licencie knižníc v inštalátore (z packaging/notices.py desktopu)
```

Náhľad: `python -m http.server` v tomto priečinku.

## Pravidlá, ktoré stránka dodržiava

- **Žiadne cookies, analytika ani cudzie servery.** V prehliadači ostáva len voľba
  režimu (`localStorage.theme`), o ktorú si návštevník sám požiadal. Písmo, ikony aj skripty sú
  súčasťou stránky, takže návštevníkova IP nikam neodchádza. Ak niečo také
  pribudne, treba najprv lištu so súhlasom.
- **LEGO® Fair Play.** Značka len ako prídavné meno a vždy so ®, nikdy logo LEGO
  ani „LEGO“ v adrese; v päte upozornenie, že LEGO Group stránku nesponzoruje.
- **Kredit všetkým službám a knižniciam.** Služby majú kartu v Licenciách,
  knižnice sú v `third-party-notices.txt` (odkaz v Licenciách); pri novej
  závislosti v desktope ho pregenerovať.
- Texty sú v oboch jazykoch; nový text = `<span class="sk">` aj `<span class="en">`.

## Licencia

Obsah a kód stránky: [MIT](LICENSE). Písmo Roboto: SIL Open Font License 1.1.
Snímky obsahujú obrázky výrobkov, ktoré sú chránené autorským právom LEGO Group.
LEGO® je ochranná známka skupiny spoločností LEGO Group, ktorá túto stránku
nesponzoruje, neautorizuje ani neschvaľuje.

## Vyhľadávače (SEO)

- `<head>` má kanonickú adresu, `hreflang` (koreň = slovensky, `?lang=en` = anglicky),
  Open Graph a Twitter kartu s obrázkom `assets/img/og.jpg` (1200×630) a štruktúrované
  dáta `SoftwareApplication` (zadarmo, Windows) v JSON-LD.
- `site.js` pri angličtine prepne canonical, `og:url`, názov a popis. Roboty bez
  `?lang` dostanú vždy slovenčinu, nie jazyk prehliadača, aby sa verzie nemiešali.
- `sitemap.xml` obsahuje obe verzie. `robots.txt` na podstránke projektu (`/moje-kocky-website/`)
  vyhľadávače nečítajú, preto tu nie je. Mapu stránky treba odoslať v Google Search Console.
- Pri zmene obsahu uprav `lastmod` v `sitemap.xml` a popisy v `<head>` aj v `site.js` (`TEXT`).
