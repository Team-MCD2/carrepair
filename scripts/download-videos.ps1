# Télécharge les 30 premières secondes des vidéos YouTube (nécessite yt-dlp + ffmpeg)
$ErrorActionPreference = "Stop"
$outDir = Join-Path $PSScriptRoot "..\public\videos"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$videos = @{
  hero       = "CI8aM-MMI0E"
  pourquoi   = "PVRqLIgtZ5o"
  carrosserie = "FQaYkfmLEUU"
  achat      = "mYMVqLfj3T4"
  apropos    = "eMBlkjCA298"
}

foreach ($name in $videos.Keys) {
  $id = $videos[$name]
  $url = "https://www.youtube.com/watch?v=$id"
  $dest = Join-Path $outDir "$name.mp4"
  Write-Host ">>> $name ($id)"
  yt-dlp `
    -f "bestvideo[height<=720][ext=mp4]+bestaudio[ext=m4a]/best[height<=720][ext=mp4]/best" `
    --download-sections "*0-30" `
    --force-keyframes-at-cuts `
    --merge-output-format mp4 `
    -o $dest `
    --no-playlist `
    $url
}

Write-Host "Terminé. Fichiers dans public/videos/"
