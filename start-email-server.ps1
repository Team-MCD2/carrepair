# Script pour maintenir le serveur d'emails actif
$EmailServerPath = "c:\Users\PC\Desktop\car_repare\carrepair\email-server.js"

while ($true) {
    Write-Host "🚀 Démarrage du serveur d'emails..."
    & node $EmailServerPath
    Write-Host "⚠️ Le serveur s'est arrêté, redémarrage dans 5 secondes..."
    Start-Sleep -Seconds 5
}
