# jakubmatisak.github.io

Stránka na stiahnutie [Moje kocky Desktop](https://github.com/jakubmatisak/moje-kocky-desktop),
nekomerčnej evidencie zbierky LEGO® setov pre Windows. Beží na GitHub Pages:
<https://jakubmatisak.github.io>.

Je to jeden statický súbor HTML bez frameworku a bez zostavovania:

```
index.html                 obsah, slovensky aj anglicky (.sk / .en)
assets/style.css           farby a rozloženie ako v appke, tmavý režim podľa systému
assets/site.js             prepínač jazyka (?lang=en) a zväčšenie galérie, nič neukladá
assets/fonts/              Roboto (OFL-1.1, pozri OFL.txt), uložené tu, nie z Google Fonts
assets/img/                snímky desktopu s ukážkovou zbierkou (vymyslené ručné ceny), *-male = náhľady
third-party-notices.txt    licencie knižníc v inštalátore (z packaging/notices.py desktopu)
```

Náhľad: `python -m http.server` v tomto priečinku.

## Pravidlá, ktoré stránka dodržiava

- **Žiadne cookies, analytika ani cudzie servery.** Písmo, ikony aj skripty sú
  súčasťou stránky, takže návštevníkova IP nikam neodchádza. Ak niečo také
  pribudne, treba najprv lištu so súhlasom.
- **LEGO® Fair Play.** Značka len ako prídavné meno a vždy so ®, nikdy logo LEGO
  ani „LEGO“ v adrese; v päte upozornenie, že LEGO Group stránku nesponzoruje.
- **Kredit všetkým službám a knižniciam.** Pri novej závislosti v desktope
  pregenerovať `third-party-notices.txt` a doplniť ju do zoznamu, ak je hlavná.
- Texty sú v oboch jazykoch; nový text = `<span class="sk">` aj `<span class="en">`.

## Licencia

Obsah a kód stránky: [MIT](LICENSE). Písmo Roboto: SIL Open Font License 1.1.
Snímky obsahujú obrázky výrobkov, ktoré sú chránené autorským právom LEGO Group.
LEGO® je ochranná známka skupiny spoločností LEGO Group, ktorá túto stránku
nesponzoruje, neautorizuje ani neschvaľuje.
