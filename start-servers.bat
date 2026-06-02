@echo off
cd c:\Users\PC\Desktop\car_repare\carrepair

REM Lancer les deux serveurs dans deux fenêtres différentes
start "Email Server" cmd /k node email-server.js
start "Astro Preview" cmd /k npm run preview

echo.
echo Les deux serveurs sont en cours de lancement...
echo - Serveur d'emails: http://localhost:3001
echo - Site web: http://localhost:4321
echo.
pause
