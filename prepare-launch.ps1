param(
  [Parameter(Mandatory=$true)]
  [string]$Domain,
  [Parameter(Mandatory=$true)]
  [string]$LegalName,
  [Parameter(Mandatory=$true)]
  [string]$KvkNumber,
  [Parameter(Mandatory=$true)]
  [string]$VatNumber
)

$ErrorActionPreference = 'Stop'
$Domain = $Domain.Trim().TrimEnd('/')
if ($Domain -notmatch '^https://[a-z0-9.-]+(?::[0-9]+)?$') {
  throw 'Gebruik een volledig HTTPS-domein, bijvoorbeeld https://foodpointwesterhoven.nl'
}
$LegalName = $LegalName.Trim()
if ($LegalName -eq '') { throw 'Vul de juridische bedrijfsnaam in, zoals die bij de KvK staat ingeschreven.' }
$KvkNumber = $KvkNumber -replace '[\s.]', ''
if ($KvkNumber -notmatch '^\d{8}$') { throw 'Het KvK-nummer bestaat uit 8 cijfers.' }
$VatNumber = ($VatNumber -replace '[\s.]', '').ToUpper()
if ($VatNumber -notmatch '^NL\d{9}B\d{2}$') { throw 'Gebruik het btw-identificatienummer, bijvoorbeeld NL123456789B01.' }

$PackageRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$TemplateRoot = Join-Path $PackageRoot 'site-template'
$PublicRoot = Join-Path $PackageRoot 'public'

if (Test-Path -LiteralPath $PublicRoot) { Remove-Item -LiteralPath $PublicRoot -Recurse -Force }
Copy-Item -LiteralPath $TemplateRoot -Destination $PublicRoot -Recurse

$producerPages = @(Get-ChildItem -LiteralPath $TemplateRoot -Filter 'producent-*.html' | Sort-Object Name | ForEach-Object { $_.Name })
$pages = @('index.html','assortiment.html','producenten.html','zo-werkt-het.html','over-ons.html','locatie-contact.html','privacy.html','404.html') + $producerPages
foreach ($page in $pages) {
  $file = Join-Path $PublicRoot $page
  $html = Get-Content -LiteralPath $file -Raw
  $path = if ($page -eq 'index.html') { '/' } else { '/' + $page }
  $canonical = $Domain + $path
  $headMarkup = '<link rel="canonical" href="' + $canonical + '"><meta property="og:url" content="' + $canonical + '">'
  if ($page -eq 'index.html') {
    $schema = @{ '@context'='https://schema.org'; '@type'='GroceryStore'; name='Foodpoint Westerhoven'; legalName=$LegalName; vatID=$VatNumber; url=$Domain + '/'; image=$Domain + '/images/hero-vending-interior.jpg'; telephone='+31402015960'; email='foodpoint.westerhoven@gmail.com'; address=@{ '@type'='PostalAddress'; streetAddress='Provincialeweg 17'; postalCode='5563 AG'; addressLocality='Westerhoven'; addressCountry='NL' }; geo=@{ '@type'='GeoCoordinates'; latitude=51.331885; longitude=5.402142 }; paymentAccepted='Pinpas'; currenciesAccepted='EUR'; sameAs=@('https://www.instagram.com/foodpoint_westerhoven','https://www.facebook.com/p/Foodpoint-Westerhoven-61579582334867','https://www.linkedin.com/company/foodpoint-westerhoven') } | ConvertTo-Json -Depth 6 -Compress
    $headMarkup += '<script type="application/ld+json">' + $schema + '</script>'
  }
  $html = $html.Replace('<meta name="robots" content="noindex, nofollow" data-launch-robots>','<meta name="robots" content="index, follow, max-image-preview:large">')
  $html = [regex]::Replace($html, '<!-- LAUNCH_HEAD:[^>]+ -->', [System.Text.RegularExpressions.MatchEvaluator]{ param($m) $headMarkup })
  $html = $html.Replace('__SITE_URL__',$Domain)
  $html = $html.Replace('__JURIDISCHE_NAAM__',[System.Net.WebUtility]::HtmlEncode($LegalName)).Replace('__KVK_NUMMER__',$KvkNumber).Replace('__BTW_NUMMER__',$VatNumber)
  $leftover = [regex]::Match($html, '__[A-Z_]+__')
  if ($leftover.Success) { throw "Niet ingevulde plaatshouder $($leftover.Value) in $page" }
  Set-Content -LiteralPath $file -Value $html -Encoding utf8
}

$publicPages = @('','assortiment.html','producenten.html','zo-werkt-het.html','over-ons.html','locatie-contact.html','privacy.html') + $producerPages
$urls = $publicPages | ForEach-Object { '<url><loc>' + $Domain + '/' + $_ + '</loc></url>' }
$sitemap = '<?xml version="1.0" encoding="UTF-8"?>' + "`n" + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + "`n  " + ($urls -join "`n  ") + "`n</urlset>"
Set-Content -LiteralPath (Join-Path $PublicRoot 'sitemap.xml') -Value $sitemap -Encoding utf8
Set-Content -LiteralPath (Join-Path $PublicRoot 'robots.txt') -Value ("User-agent: *`nAllow: /`n`nSitemap: $Domain/sitemap.xml") -Encoding utf8
Write-Host "Klaar voor publicatie: $PublicRoot"
