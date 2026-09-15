---
name: producent
description: Voeg een producentenpagina toe aan de Foodpoint-website of werk er een bij, inclusief de postzegel op producenten.html, het logo en de bronvermelding in PRODUCENTEN-BRONNEN.md. Gebruik dit wanneer er een boer, bakker of maker bij komt, wegvalt, of wanneer een bio of assortiment moet worden aangepast.
---

# Producent toevoegen of bijwerken

## Eerst: bronnen

Producenteninformatie is feitelijk en wordt door Foodpoint gecontroleerd.
**Verzin niets** — geen bedrijfsverhaal, geen aantallen dieren, geen assortiment,
geen jaartallen. Heb je geen bron van de gebruiker of uit
`PRODUCENTEN-BRONNEN.md`, vraag er dan om en zet er anders een duidelijke
`TODO`-markering neer in plaats van een aanname.

## Werkwijze

1. **Neem een bestaande pagina als model.** Kopieer de meest vergelijkbare
   `site-template/producent-*.html` en pas die aan. De bestandsnaam is
   `producent-<slug>.html` met een kleine-letter-slug zonder diakrieten
   (`producent-het-zuivelbos.html`).

2. **Werk de head bij** — `<title>`, `<meta name="description">`, de Open
   Graph-velden, en vooral `<!-- LAUNCH_HEAD:/producent-<slug>.html -->` met het
   juiste pad. Laat `data-launch-robots` en de `__SITE_URL__`-placeholders staan.

3. **Beeld** — logo in `site-template/images/logos/<slug>.png` (of `.jpg`),
   eventuele sfeerfoto als `images/producent-<slug>.jpg`. Geef elke `img` een
   `width`, `height` en beschrijvende `alt`. Gebruik geen beeld waarvan de
   herkomst onduidelijk is.

4. **Postzegel op `producenten.html`** — voeg de kaart toe in dezelfde volgorde
   en opmaak als de bestaande, met de "Lees meer"-link naar de nieuwe pagina.
   Controleer dat de popup (`assets/producer-lightbox.js`) de nieuwe kaart oppikt;
   die werkt op de data-attributen van de bestaande kaarten, dus neem die exact over.

5. **Assortiment** — staat de producent ook op `assortiment.html` of de homepage?
   Werk die vermeldingen mee bij, zodat de site niet tegenstrijdig wordt.

6. **`PRODUCENTEN-BRONNEN.md`** — voeg de bron toe in hetzelfde formaat als de
   bestaande regels. Dit is verplicht bij elke inhoudelijke wijziging.

7. **Controleer** — open `producenten.html` en de nieuwe pagina in de browser op
   375px en 1440px, klik de popup open en de "Lees meer"-link door.

## Stijl

- Nederlands, informeel en concreet, in de toon van de bestaande bio's.
- Geminificeerde HTML blijft geminificeerd — geen herformattering.
- Geen nieuwe kleuren of lettertypen; gebruik de tokens uit `assets/site.css`.
