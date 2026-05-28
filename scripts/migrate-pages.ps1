$siteRoot = Split-Path $PSScriptRoot -Parent
$pages = @(
    @{ Html = 'prestations.html'; Astro = 'prestations.astro'; Active = 'prestations'; Title = 'Nos Prestations — Mécanique, Carrosserie & Pneumatique | Car Repair Toulouse'; Desc = 'Découvrez les prestations de Car Repair Toulouse : entretien mécanique, carrosserie, pneumatique et vente de véhicules.'; Og = 'https://www.car-repair.fr/assets/prestations.jpeg' },
    @{ Html = 'a-propos.html'; Astro = 'a-propos.astro'; Active = 'a-propos'; Title = 'À Propos — Garage Car Repair à Toulouse depuis 2021'; Desc = 'Découvrez Car Repair, réparateur auto multimarque à Toulouse. Qualité, prix et professionnalisme.'; Og = 'https://www.car-repair.fr/assets/qui-somme-nous.jpeg' },
    @{ Html = 'contact.html'; Astro = 'contact.astro'; Active = 'contact'; Title = 'Contact — Garage Car Repair Toulouse | Devis Gratuit'; Desc = 'Contactez Car Repair à Toulouse. Devis gratuit en ligne ou par téléphone.'; Og = 'https://www.car-repair.fr/assets/logo.png' },
    @{ Html = 'mentions-legales.html'; Astro = 'mentions-legales.astro'; Active = ''; Title = 'Mentions Légales — Car Repair Toulouse'; Desc = 'Mentions légales du site car-repair.fr.'; Og = 'https://www.car-repair.fr/assets/logo.png'; Noindex = $true }
)

function Fix-Body([string]$body) {
    $body = $body -replace 'href="index\.html"', 'href="/index.html"'
    $body = $body -replace 'href="prestations\.html', 'href="/prestations.html'
    $body = $body -replace 'href="a-propos\.html', 'href="/a-propos.html'
    $body = $body -replace 'href="contact\.html', 'href="/contact.html'
    $body = $body -replace 'href="mentions-legales\.html', 'href="/mentions-legales.html'
    $body = $body -replace 'src="assets/', 'src="/assets/'
    $body = $body -replace 'poster="assets/', 'poster="/assets/'
    $body = $body -replace 'https://videos\.pexels\.com/video-files/8470382/8470382-hd_1920_1080_25fps\.mp4', '/videos/hero.mp4'
    $body = $body -replace 'https://videos\.pexels\.com/video-files/8987207/8987207-hd_1920_1080_30fps\.mp4', '/videos/garage-pneus.mp4'
    $body = $body -replace 'https://videos\.pexels\.com/video-files/3130284/3130284-hd_1920_1080_30fps\.mp4', '/videos/garage-atelier.mp4'
    $body = $body -replace 'https://videos\.pexels\.com/video-files/3045163/3045163-hd_1920_1080_25fps\.mp4', '/videos/garage-atelier.mp4'
    $body = $body -replace 'https://videos\.pexels\.com/video-files/3254065/3254065-hd_1920_1080_25fps\.mp4', '/videos/hero.mp4'
    $body = $body -replace '<div class="hero-glow"[^>]*></div>\s*', ''
    $body = $body -replace '<p class="video-credit[^>]*>.*?</p>\s*', ''
    $body = $body -replace 'cta-banner--animated', 'cta-banner'
    $body = $body -replace 'autoplay muted loop', 'muted loop'
    $body = $body -replace 'preload="metadata"', 'preload="none"'
    $body = $body -replace '<video class="hero-video"', '<video class="hero-video" data-bg-video'
    $body = $body -replace '<video class="prestation-video"', '<video class="prestation-video" data-bg-video'
    $body = $body -replace '<video class="why-video"', '<video class="why-video" data-bg-video'
    return $body.Trim()
}

foreach ($p in $pages) {
    $htmlPath = Join-Path $siteRoot $p.Html
    $raw = Get-Content $htmlPath -Raw -Encoding UTF8
    if ($raw -notmatch '(?s)</header>\s*(.*?)\s*<footer>') { Write-Warning "Skip $($p.Html)"; continue }
    $body = Fix-Body $matches[1]
    $activeProp = if ($p.Active) { "active=`"$($p.Active)`"`n  " } else { '' }
    $noindex = if ($p.Noindex) { "`n  noindex" } else { '' }
    $astro = @"
---
import BaseLayout from '../layouts/BaseLayout.astro';
import SubpageHero from '../components/SubpageHero.astro';
import { VIDEOS, POSTERS } from '../data/videos';

const jsonLd = undefined;
---

<BaseLayout
  title="$($p.Title)"
  description="$($p.Desc)"
  ${activeProp}ogImage="$($p.Og)"$noindex
  jsonLd={jsonLd}
>
$body
</BaseLayout>
"@
    # Subpage heroes with inline video blocks -> simplify later; body kept as-is from HTML
    $outPath = Join-Path $siteRoot "src\pages\$($p.Astro)"
    Set-Content -Path $outPath -Value $astro -Encoding UTF8
    Write-Host "Created $($p.Astro)"
}
