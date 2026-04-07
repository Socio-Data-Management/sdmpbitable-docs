# Build et génération du PDF
Write-Host "Construction du site..." -ForegroundColor Green
npm run build

Write-Host "Génération du PDF..." -ForegroundColor Green
# Démarrer le serveur en arrière-plan
Start-Job -ScriptBlock { npm run start } -Name "DocusaurusServer"
Start-Sleep -Seconds 15

# Générer le PDF
npm run pdf

# Arrêter le serveur
Get-Job -Name "DocusaurusServer" | Stop-Job
Get-Job -Name "DocusaurusServer" | Remove-Job

Write-Host "Déploiement..." -ForegroundColor Green
$Env:GIT_USER = "OlivierH71"
npm run deploy --
