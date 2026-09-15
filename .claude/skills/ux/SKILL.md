---
name: ux
description: Review een pagina van de Foodpoint-website op UX, visueel ontwerp, responsiveness en toegankelijkheid, en voer de verbeteringen door. Gebruik dit wanneer gevraagd wordt om een pagina te beoordelen, "mooier" of duidelijker te maken, of om mobiel/desktop-problemen te vinden. Geef de pagina mee als argument, bijv. /ux producenten.html — zonder argument wordt de huidige diff beoordeeld.
---

# UX-review

Beoordeel en verbeter de gevraagde pagina('s) in `site-template/`.

## 1. Bepaal de scope

- Argument gegeven (`/ux assortiment.html`, `/ux producent-*`) → die pagina's.
- Geen argument → de pagina's die in `git diff` zijn gewijzigd.
- Neem altijd de gedeelde onderdelen mee die de pagina raakt: header/nav,
  mobiele menu, footer, en de postzegel-popup op `producenten.html`.

## 2. Kijk er echt naar

Maak screenshots voordat je oordeelt — niet alleen de HTML lezen.

```bash
node -e '
const {chromium} = require("playwright");
(async () => {
  const b = await chromium.launch();
  for (const [w, h, tag] of [[375,812,"mobile"],[768,1024,"tablet"],[1440,900,"desktop"]]) {
    const p = await b.newPage({viewport:{width:w,height:h}});
    await p.goto("file://" + process.env.PWD + "/site-template/PAGINA.html");
    await p.screenshot({path:`/tmp/claude-0/ux-${tag}.png`, fullPage:true});
    await p.close();
  }
  await b.close();
})();'
```

Is Playwright niet geïnstalleerd, installeer dan alleen het npm-pakket
(`npm i -D playwright`) — de browser staat al op `/opt/pw-browsers`, dus draai
nooit `playwright install`. Lukt het niet, zeg dat dan en beoordeel op basis van
de HTML/CSS, met die beperking expliciet benoemd.

Bekijk elke screenshot met de Read tool.

## 3. Waar je op let

**Layout en ritme** — consistente verticale ruimte tussen secties; geen
horizontale scroll op 375px; regellengte van broodtekst rond 60–75 tekens;
tekst en beeld uitgelijnd op hetzelfde `--shell`-raster.

**Hiërarchie** — één `h1` per pagina, koppen in volgorde (geen niveau overslaan);
duidelijk verschil tussen kop, intro en broodtekst; één primaire actie per scherm.

**Merk** — kleuren uit de tokens in `:root` (`--red`, `--amber`, `--green`,
`--cream`, `--paper`, `--ink`); Poppins voor koppen, Work Sans voor broodtekst;
Fredoka/Caveat alleen als accent. Geen nieuwe kleuren of lettertypen introduceren.

**Toegankelijkheid** — contrast minstens 4.5:1 voor tekst (3:1 voor grote koppen);
elke `img` een zinnige `alt` (of `alt=""` als puur decoratief); tikdoelen minimaal
44×44px; zichtbare focus-stijl op links en knoppen; `aria-current="page"` op het
actieve nav-item; de popup en het mobiele menu bedienbaar met toetsenbord en
afsluitbaar met Escape.

**Inhoud** — Nederlands, in de toon van de rest van de site (informeel, concreet,
geen marketingtaal); geen verzonnen feiten over openingstijden, prijzen,
producenten of bedrijfsgegevens.

**Performance** — afbeeldingen met `width`/`height` tegen layout shift,
`loading="lazy"` behalve de hero; geen externe requests toevoegen.

## 4. Voer de verbeteringen door

- Respecteer de conventies in `CLAUDE.md`: geminificeerde HTML/CSS blijft
  geminificeerd, placeholders (`__...__`), `data-launch-robots` en
  `<!-- LAUNCH_HEAD:... -->` blijven staan.
- Pagina-specifieke stijl hoort in de bestaande pagina-sheet, niet in `site.css`,
  tenzij het echt site-breed is.
- Verandert een gedeeld onderdeel (nav, footer, popup), controleer dan minstens
  één andere pagina op regressie.
- Maak na de wijziging opnieuw screenshots en vergelijk voor/na.

## 5. Rapporteer

Noem per bevinding: wat er mis was, op welke breedte, en wat je hebt veranderd.
Zet wat je bewust niet hebt aangeraakt apart, met de reden. Stuur de voor/na-
screenshots mee met SendUserFile.
