# Foodpoint Westerhoven

Statische website (geen build step, geen framework) voor een onbemande buurtwinkel
met streekproducten in Westerhoven. Alle teksten zijn **Nederlands**.

## Structuur

- `site-template/` — de hele website. Dit is de bron én wat GitHub Pages serveert.
  - `index.html`, `assortiment.html`, `producenten.html`, `zo-werkt-het.html`,
    `over-ons.html`, `locatie-contact.html`, `privacy.html`, `404.html`
  - `producent-*.html` — één pagina per producent, bereikbaar via "Lees meer"
    in de postzegel-popup op `producenten.html`
  - `assets/` — CSS, JS, zelf-gehoste fonts (woff2)
  - `images/`, `images/logos/`
- `prepare-launch.ps1` — PowerShell build die `site-template/` omzet naar een
  publiceerbare `public/` map (indexering aan, canonicals, JSON-LD, robots.txt,
  sitemap.xml, juridische gegevens).
- `PRODUCENTEN-BRONNEN.md` — bronvermelding per producent. Bij elke wijziging aan
  een producentenbio hoort hier een bron.
- `.github/workflows/pages.yml` — publiceert `site-template/` naar de
  noindex-preview op https://roexxie.github.io/foodpoint-westerhoven/ bij push naar `main`.

## Belangrijke conventies

- **HTML en CSS zijn geminificeerd** (vaak één lange regel). Bewerk met precieze
  string-vervangingen; niet opnieuw formatteren of "opschonen" — dat maakt de diff
  onleesbaar. Lever wijzigingen in dezelfde geminificeerde stijl aan.
- **Placeholders niet invullen.** `__SITE_URL__`, `__LEGAL_NAME__` en andere
  `__...__`-tokens worden door `prepare-launch.ps1` vervangen. Laat ze staan.
- **`<meta name="robots" content="noindex, nofollow" data-launch-robots>`** moet op
  elke pagina blijven staan; het launch-script schakelt indexering pas in.
- **`<!-- LAUNCH_HEAD:/pad -->`** markeert waar het script canonicals/JSON-LD injecteert.
  Nieuwe pagina's hebben deze marker nodig, met het juiste pad.
- **Geen externe requests.** Fonts staan lokaal in `assets/fonts/`. Voeg geen Google
  Fonts, CDN's, analytics of trackers toe — de privacytekst gaat ervan uit dat die er
  niet zijn.
- **Design tokens** staan in `:root` in `assets/site.css`
  (`--cream`, `--paper`, `--ink`, `--soft`, `--red`, `--red-dark`, `--amber`,
  `--green`, `--line`, `--shell`). Gebruik die in plaats van losse hex-waarden.
- **CSS-volgorde** in `<head>` is betekenisvol: `fonts.css` → `original-brand.css` →
  `site.css` → `brand-balance.css` → pagina-specifieke sheets. Niet herschikken.
- **Lettertypen**: Poppins (koppen), Work Sans (broodtekst), Fredoka en Caveat
  (accenten).

## Testen

Er is geen test suite en geen package manager. Controleer wijzigingen door
`site-template/index.html` (of de gewijzigde pagina) in een browser te openen en
minimaal op mobiele breedte (375px) en desktop te bekijken.

## Nog te bevestigen voor livegang

Zie de checklist in `README-LAUNCH.md` — o.a. definitief domein, sluitingstijd,
prijzen, KvK/btw-gegevens en controle van de producentenbio's door Foodpoint.
Verzin deze gegevens nooit; vraag ze of laat de placeholder staan.
