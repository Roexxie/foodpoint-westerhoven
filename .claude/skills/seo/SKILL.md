---
name: seo
description: Controleer de SEO- en launch-hygiëne van de Foodpoint-website — titels, meta descriptions, Open Graph, koppenstructuur, alt-teksten, interne links en de placeholders die prepare-launch.ps1 nodig heeft. Gebruik dit bij vragen over vindbaarheid, metadata, of of de site klaar is om live te gaan.
---

# SEO- en launch-check

Controleer `site-template/` op alles wat de vindbaarheid en de launch-build raakt.

## Per pagina controleren

1. **`<title>`** — uniek, 50–60 tekens, met "Foodpoint Westerhoven" erin.
2. **`<meta name="description">`** — uniek, 140–160 tekens, Nederlands, met
   een concrete reden om te klikken.
3. **Open Graph** — `og:title`, `og:description`, `og:image`, `og:type`,
   `og:locale` (`nl_NL`), plus `twitter:card`. `og:image` verwijst naar
   `__SITE_URL__/images/...` — die placeholder moet blijven staan.
4. **Koppen** — precies één `h1`, daarna geen niveau overgeslagen.
5. **`<html lang="nl">`**.
6. **`<meta name="robots" content="noindex, nofollow" data-launch-robots>`** —
   moet aanwezig blijven; zonder dit attribuut kan het launch-script indexering
   niet inschakelen.
7. **`<!-- LAUNCH_HEAD:/pad -->`** — aanwezig, met het pad dat bij de pagina hoort
   (`/` voor de homepage, `/assortiment.html` enzovoort).
8. **Alt-teksten** — elke inhoudelijke `img` beschrijvend; decoratieve `alt=""`.
9. **Interne links** — relatief (`assortiment.html`), geen dode links, geen
   absolute URL's naar het nog onbekende domein.

Snelle inventarisatie:

```bash
cd site-template
for f in *.html; do
  printf '%s\n' "$f"
  grep -o '<title>[^<]*</title>' "$f"
  grep -o '<meta name="description" content="[^"]*"' "$f"
  grep -c 'data-launch-robots' "$f"
  grep -o 'LAUNCH_HEAD:[^ ]*' "$f"
done
grep -rn '__[A-Z_]*__' . | grep -v images/
grep -o 'alt="[^"]*"' *.html | sort | uniq -c | sort -rn | head
```

## Launch-blokkers

Loop `README-LAUNCH.md` na. Deze gegevens verzin je **nooit** — vraag ze of laat
de placeholder staan: definitief domein, juridische naam, KvK-nummer,
btw-nummer, sluitingstijd, prijzen, bewaartermijn en camerabewaking in de
privacytekst.

Controleer ook dat er geen externe requests bij zijn gekomen (fonts, CDN's,
analytics) — de privacytekst gaat ervan uit dat die er niet zijn:

```bash
grep -rn 'https\?://' site-template --include=*.html --include=*.css | grep -v '__SITE_URL__' | grep -v schema.org
```

## Rapporteer

Geef een tabel per pagina met wat goed staat en wat mist, gesorteerd op impact.
Voer kleine, zekere fixes (ontbrekende alt, te lange title) direct door in de
geminificeerde stijl van het bestand; leg keuzes die inhoudelijk zijn — een
andere description, een andere kop — eerst voor.
