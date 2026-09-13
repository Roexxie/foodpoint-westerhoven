# Foodpoint Westerhoven — SEO-ready website

Deze map is bewust domeinneutraal. De bestanden in `site-template` staan op **noindex** zodat een testversie niet per ongeluk in Google verschijnt.

## Website bekijken

Open `site-template/index.html` in een browser.

## Online preview

`site-template` staat als preview online op **https://roexxie.github.io/foodpoint-westerhoven/** (noindex). Elke push naar `main` werkt de preview binnen een paar minuten bij via `.github/workflows/pages.yml`.

## Definitieve website klaarmaken

Open PowerShell in deze map en voer uit:

```powershell
.\prepare-launch.ps1 -Domain "https://jullie-domein.nl" -LegalName "Juridische naam zoals bij de KvK" -KvkNumber "12345678" -VatNumber "NL123456789B01"
```

De publiceerbare website staat daarna in `public`. Upload de **inhoud** van die map naar de webroot van de hosting.

Het script:

- schakelt indexering in;
- voegt canonicals en Open Graph-URL's toe;
- voegt lokale bedrijfsgegevens als JSON-LD toe;
- vult juridische naam, KvK- en btw-nummer in op de privacypagina en stopt als er nog een plaatshouder (`__...__`) over is;
- maakt `robots.txt` en `sitemap.xml`;
- vult het domein in bij absolute afbeeldings-URL's.

De lettertypen (Fredoka, Poppins, Work Sans) staan in `assets/fonts` en worden niet meer bij Google opgehaald. Voeg geen externe lettertype-links toe zonder de privacytekst aan te passen.

## Voor livegang bevestigen

- definitieve domeinnaam;
- officiële sluitingstijd (alleen 07:00 is momenteel bevestigd);
- prijzen voordat die online worden toegevoegd;
- juridische bedrijfsnaam, KvK- en btw-nummer (verplicht bij `prepare-launch.ps1`);
- bewaartermijn en eventuele camerabewaking bij de automaten: zo nodig aanvullen in de privacytekst;
- controle door Foodpoint van de producentenbio's en het daadwerkelijk beschikbare assortiment (zie `PRODUCENTEN-BRONNEN.md`);
- Google Bedrijfsprofiel: exact hetzelfde adres, telefoonnummer en openingstijden;
- upload `public/sitemap.xml` in Google Search Console.

## Structuur

- Homepage
- Assortiment
- Producenten
  - Eigen pagina per producent (`producent-*.html`), bereikbaar via "Lees meer" in de postzegel-popup
- Zo werkt het
- Over ons
- Locatie & contact
- Privacy
- Eigen 404-pagina
