param(
	[Parameter(Mandatory=$true, Position=0)]
    [string]$InputPath,
    [string]$OutputFolder = ".\traite",
    [switch]$T,
    [switch]$B,
    [switch]$L,
    [switch]$R,
    [int]$Depth = 4,
    [int]$Roughness = 2
)

# Création du dossier de sortie
# if (!(Test-Path $OutputFolder)) { New-Item -ItemType Directory -Force -Path $OutputFolder | Out-Null }

# Vérification ImageMagick
if (-not (Get-Command magick -ErrorAction SilentlyContinue)) {
    Write-Error "ImageMagick introuvable. Installez-le ou ajoutez-le au PATH."
    exit
}

$files = Get-ChildItem $InputPath
Write-Host "Traitement de $($files.Count) image(s)..." -ForegroundColor Cyan

foreach ($file in $files) {
    # $outName = Join-Path $OutputFolder $file.Name
    $outName = $file.Name
    
    # On construit une liste d'arguments propre pour éviter les erreurs de parsing
    $magickArgs = @()
    $magickArgs += "$($file.FullName)"
    
# Début de la parenthèse (masque)
    $magickArgs += "("
    $magickArgs += "+clone"
    $magickArgs += "-alpha", "extract"
    $magickArgs += "-fill", "white"
    $magickArgs += "-colorize", "100"
    $magickArgs += "-fill", "black"


# Nous réinitialisons la gravité à NorthWest (+gravity) pour utiliser des coordonnées absolues
    # et éviter les conflits d'état.
    $magickArgs += "+gravity" 

    # Ajout dynamique des bords
    if ($T)    { 
        # Bord Haut (coordonnées standard 0,0)
        $magickArgs += "-draw", "rectangle 0,0 %w,$Depth" 
    }
    if ($L)   { 
        # Bord Gauche (coordonnées standard 0,0)
        $magickArgs += "-draw", "rectangle 0,0 $Depth,%h" 
    }
    if ($B) { 
        # Bord Bas (décalage vers le bas en Y)
        # Point 1: 0, %h-$Depth | Point 2: %w, %h
        $magickArgs += "-draw", "rectangle 0,%[fx:h-$Depth] %w,%h" 
    }
    if ($R)  { 
        # Bord Droit (décalage vers la gauche en X)
        # Point 1: %w-$Depth, 0 | Point 2: %w, %h
        $magickArgs += "-draw", "rectangle %[fx:w-$Depth],0 %w,%h" 
    }

    # Si aucun bord n'est sélectionné, on avertit et on passe
    if (-not ($T -or $B -or $L -or $R)) {
        Write-Warning "Ignoré (aucun bord choisi) : $($file.Name)"
        continue
    }

    # Finition du masque (effet cassé)
    $magickArgs += "-spread", "$Roughness"
    $magickArgs += "-blur", "0x1"
    $magickArgs += "-threshold", "50%"
    
    # Fin de la parenthèse
    $magickArgs += ")"

    # Application du masque
    $magickArgs += "-alpha", "off"
    $magickArgs += "-compose", "CopyOpacity"
    $magickArgs += "-composite"
    $magickArgs += "$outName"

    # Exécution de la commande
    # Le splatting (@magickArgs) permet de passer chaque élément comme un argument distinct
	Write-Host "Appel de: $magickArgs" -ForegroundColor Yellow
    magick @magickArgs

    if ($LASTEXITCODE -eq 0) {
        Write-Host "OK : $outName" -ForegroundColor Green
    } else {
        Write-Error "Erreur sur $outName"
    }
}