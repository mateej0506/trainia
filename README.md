# Trainia

Web app koja složi plan treninga u 10 pitanja.

## Pokretanje lokalno
- Najbrže: dupli klik na `index.html`.
- U VS Codeu: instaliraj ekstenziju **Live Server**, desni klik na `index.html` → **Open with Live Server**.
  Tako radi i PWA (instalacija na mobitel, rad bez interneta), jer to ne radi s `file://`.

## Struktura
- `index.html` – kostur stranice
- `css/style.css` – izgled
- `js/data.js` – baza vježbi, mišići, dani i splitovi
- `js/generator.js` – logika koja slaže plan
- `js/app.js` – pitanja, prikaz plana, kalkulatori i izvoz
- `manifest.json` – ime, boje i ikone za instalaciju na mobitel
- `sw.js` – service worker, appa radi i bez interneta
- `icons/` – logo u raznim veličinama

## Nova verzija
Kad promijeniš bilo koji fajl, u `sw.js` povećaj broj u `trainia-v2` (npr. u `trainia-v3`), da korisnici dobiju novu verziju.
