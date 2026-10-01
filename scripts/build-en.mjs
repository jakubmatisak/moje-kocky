// Anglická stránka en/index.html sa vyrába z index.html, ručne sa neupravuje.
// Obsah je ten istý (texty .sk aj .en sú v jednom súbore), mení sa len
// <head>: jazyk, titulok, popis, canonical a náhľad na zdieľanie. Roboty
// a četovacie appky JavaScript nespúšťajú, preto anglický náhľad musí
// byť v súbore napísaný, nie doplnený skriptom.
//
// Spustenie po každej zmene index.html:  node scripts/build-en.mjs
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const SITE = 'https://jakubmatisak.github.io/moje-kocky/'
const EN = `${SITE}en/`

const EN_TITLE = 'Moje kocky – free LEGO® collection tracker for Windows'
const EN_DESCRIPTION = 'A free tracker for your LEGO® sets and minifigures on Windows: purchase price, value and profit, barcodes, collectible series. No ads, your data stays with you.'
const EN_OG_TITLE = 'Moje kocky – LEGO® set collection tracker for Windows'
const EN_OG_DESCRIPTION = 'A free tracker for LEGO® sets and minifigures. Value, profit, barcodes and minifigure series, with no ads and no tracking.'
const EN_TWITTER_DESCRIPTION = 'A free LEGO® set and minifigure collection tracker for Windows, with no ads and no tracking.'
const EN_IMAGE_ALT = 'The collection overview in Moje kocky: invested, value, profit and portfolio chart'
const EN_APP_DESCRIPTION = 'A free tracker for LEGO® sets and minifigures on Windows: purchase price, market value, profit, barcode scanning and collectible series. Your data stays on your computer.'

let html = readFileSync(join(root, 'index.html'), 'utf8')
const before = html

function swap (pattern, value, label) {
  if (!pattern.test(html)) throw new Error(`build-en: chýba ${label}`)
  html = html.replace(pattern, value)
}

const attr = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;')

swap(/<html lang="sk" data-page="sk">/, '<html lang="en" data-page="en">', '<html>')
swap(/<title>[^<]*<\/title>/, `<title>${EN_TITLE}</title>`, 'title')
swap(/(<meta name="description" content=")[^"]*(")/, `$1${attr(EN_DESCRIPTION)}$2`, 'description')
swap(/(<link rel="canonical" href=")[^"]*(")/, `$1${EN}$2`, 'canonical')
swap(/(<meta property="og:url" content=")[^"]*(")/, `$1${EN}$2`, 'og:url')
swap(/(<meta property="og:title" content=")[^"]*(")/, `$1${attr(EN_OG_TITLE)}$2`, 'og:title')
swap(/(<meta property="og:description" content=")[^"]*(")/, `$1${attr(EN_OG_DESCRIPTION)}$2`, 'og:description')
swap(/<meta property="og:locale" content="sk_SK">\n<meta property="og:locale:alternate" content="en_US">/,
  '<meta property="og:locale" content="en_US">\n<meta property="og:locale:alternate" content="sk_SK">', 'og:locale')
swap(/(<meta property="og:image:alt" content=")[^"]*(")/, `$1${attr(EN_IMAGE_ALT)}$2`, 'og:image:alt')
swap(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${attr(EN_OG_TITLE)}$2`, 'twitter:title')
swap(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${attr(EN_TWITTER_DESCRIPTION)}$2`, 'twitter:description')
swap(/(<meta name="twitter:image:alt" content=")[^"]*(")/, `$1${attr(EN_IMAGE_ALT)}$2`, 'twitter:image:alt')
swap(/("url": ")https:\/\/jakubmatisak\.github\.io\/moje-kocky\/(",)/, `$1${EN}$2`, 'JSON-LD url')
swap(/("description": ")[^"]*(",\n  "applicationCategory")/, `$1${EN_APP_DESCRIPTION}$2`, 'JSON-LD description')

// Súbory stránky ležia o priečinok vyššie.
html = html.replace(/\b(src|href|data-full)="(?!https?:|#|mailto:|data:|\.\.\/|\/)([^"]+)"/g, '$1="../$2"')

// Popisy obrázkov po anglicky už v súbore, nie až zo skriptu.
html = html.replace(/ alt="[^"]*" data-alt-en="([^"]*)"/g, ' alt="$1" data-alt-en="$1"')

if (html === before) throw new Error('build-en: nič sa nezmenilo')
const banner = '<!-- Vyrobené z index.html cez scripts/build-en.mjs, neupravovať ručne. -->\n'
mkdirSync(join(root, 'en'), { recursive: true })
writeFileSync(join(root, 'en', 'index.html'), html.replace(/^<!doctype html>\n/i, m => m + banner))
console.log('en/index.html je hotové')
