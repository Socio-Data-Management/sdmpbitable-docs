
# prend le nom du fichier en paramètre (par défaut)
param (
    [string]$inputFile
)

# Vérifie si le fichier d'entrée est fourni
if (-not $inputFile) {
    Write-Host "Usage: .\bordsblancs.ps1 -inputFile <path_to_image>"
    exit 1
}



# Crée une copie de sauvegarde de l'image originale
Copy-Item $inputFile "$inputFile.bak"

# Définit le %fuzz à 7% pour le fuzz
$fuzz = 7
$mode="4b"

# Démarre une boucle pour traiter les bords blancs
while ($true) {
    # Lance la commande magic pour traiter les 4 bords blancs
    $magicParams4b = @("-alpha","set","-fuzz", "${fuzz}%", "-fill", "none", "-floodfill", "+0+0", "white", "-floodfill", "+0+%[fx:h-1]", "white", "-floodfill", "+%[fx:w-1]+0", "white", "-floodfill", "+%[fx:w-1]+%[fx:h-1]", "white")
    $magicParamsTopOnly = @("-alpha","set", "-region", "x50+0+0", "-fuzz", "${fuzz}%", "-fill", "none", "-floodfill", "+0+0", "white", "-floodfill", "+%[fx:w-1]+0", "white", "+region" )
    if ($mode -eq "top") {
        $magicParams = $magicParamsTopOnly
    } else {
        $magicParams = $magicParams4b
    }
    Write-Host "Commande magick ${inputFile} ${magicParams} ${inputFile}"
    magick $inputFile @magicParams $inputFile
    # demande si on veut + de fuzz ou moins
    $goodAnswer = $false
    while (!$goodAnswer) {
        $goodAnswer = $true
        $answer = Read-Host "Voulez-vous ajuster ou réduire le fuzz, ne faire que le haut, refaire les 4 bords, valider ou annuler ? (+/-/t/4/v/a)"
        if ($answer -eq "+") {
            # restaure le backup
            Copy-Item "$inputFile.bak" $inputFile -Force
            $fuzz += 1
            Write-Host "Augmentation du fuzz à $fuzz%"
        } elseif ($answer -eq "-") {
            # restaure le backup
            Copy-Item "$inputFile.bak" $inputFile -Force
            $fuzz -= 1
            if ($fuzz -lt 0) { $fuzz = 0 }
            Write-Host "Réduction du fuzz à $fuzz%"
        } elseif ($answer -eq "t") {
            # restaure le backup
            Copy-Item "$inputFile.bak" $inputFile -Force
            $mode = "top"
            Write-Host "Mode haut uniquement activé."
        } elseif ($answer -eq "4") {
            # restaure le backup
            Copy-Item "$inputFile.bak" $inputFile -Force
            $mode = "4b"
            Write-Host "Mode 4 bords activé."
        } elseif ($answer -eq "v") {
            Write-Host "Validation des modifications."
            Remove-Item "$inputFile.bak"
            exit 0
        } elseif ($answer -eq "a") {
            Write-Host "Annulation des modifications."
            Copy-Item "$inputFile.bak" $inputFile -Force
            Remove-Item "$inputFile.bak"
            exit 0
        } else {
            # rien, on boucle encore sur la question
            $goodAnswer = $false
        }
    }
}