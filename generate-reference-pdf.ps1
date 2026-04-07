# Script pour générer un PDF de la section Reference
# Utilise mr-pdf en spécifiant toutes les pages manuellement

Write-Host "Génération du PDF pour la section Reference..." -ForegroundColor Green

# Liste des pages de la section Reference dans l'ordre
$pages = @(
    "http://localhost:3000/sdmpbitable-docs/docs/reference/table-content",
    "http://localhost:3000/sdmpbitable-docs/docs/reference/sorting",
    "http://localhost:3000/sdmpbitable-docs/docs/reference/ranking",
    "http://localhost:3000/sdmpbitable-docs/docs/reference/significance",
    "http://localhost:3000/sdmpbitable-docs/docs/reference/totals",
    "http://localhost:3000/sdmpbitable-docs/docs/reference/percentage-series",
    "http://localhost:3000/sdmpbitable-docs/docs/reference/mean-series",
    "http://localhost:3000/sdmpbitable-docs/docs/reference/thresholds",
    "http://localhost:3000/sdmpbitable-docs/docs/reference/filtering"
)

# Joindre les URLs avec des virgules
$urlsParam = $pages -join ","

# Lancer mr-pdf avec toutes les URLs
mr-pdf `
    --initialDocURLs="$urlsParam" `
    --contentSelector="article" `
    --paginationSelector="a[class*='pagination']" `
    --excludeSelectors=".margin-vent--xl a,.breadcrumbs,.theme-edit-this-page,.navbar,.theme-doc-sidebar-container" `
    --outputPDFFilename="./reference.pdf"

Write-Host "`n✅ PDF généré avec succès: reference.pdf" -ForegroundColor Green
