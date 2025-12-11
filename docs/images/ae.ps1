function Add-EdgeBlur {
    param(
        [Parameter(Mandatory=$true, Position=0)]
        [string]$ImagePath,
        [switch]$B,  # Bas
        [switch]$H,  # Haut
        [switch]$G,  # Gauche
        [switch]$D,  # Droite
        [int]$BlurSize = 2,
        [int]$EdgeWidth = 5
    )
    
    # Verifier que le fichier existe
    if (-not (Test-Path $ImagePath)) {
        Write-Error "Fichier introuvable: $ImagePath"
        return
    }
    
    # Si aucun bord n'est specifie, ne rien faire
    if (-not ($B -or $H -or $G -or $D)) {
        Write-Warning "Aucun bord specifie. Utilisez -B, -H, -G ou -D"
        return
    }
    
    # Creer un fichier temporaire
    $tempFile = [System.IO.Path]::GetTempFileName() + ".png"
    
    # Construire les arguments sous forme de tableau
    $args = @($ImagePath)
    
    if ($B) {
        $args += '(', '+clone', '-crop', "x$EdgeWidth+0+0", '-blur', "0x$BlurSize", ')'
        $args += '-gravity', 'South', '-composite'
    }
    if ($D) {
        $args += '(', '+clone', '-crop', "${EdgeWidth}x+0+0", '-blur', "0x$BlurSize", ')'
        $args += '-gravity', 'East', '-composite'
    }
    if ($H) {
        $args += '(', '+clone', '-crop', "x$EdgeWidth+0+0", '-blur', "0x$BlurSize", ')'
        $args += '-gravity', 'North', '-composite'
    }
    if ($G) {
        $args += '(', '+clone', '-crop', "${EdgeWidth}x+0+0", '-blur', "0x$BlurSize", ')'
        $args += '-gravity', 'West', '-composite'
    }
    
    $args += $tempFile
    
    try {
        # Appeler magick avec les arguments
        & magick $args
        
        if (Test-Path $tempFile) {
            # Remplacer le fichier original
            Move-Item -Path $tempFile -Destination $ImagePath -Force
            
            $edges = @()
            if ($H) { $edges += "Haut" }
            if ($B) { $edges += "Bas" }
            if ($G) { $edges += "Gauche" }
            if ($D) { $edges += "Droite" }
            
            Write-Host "OK $ImagePath - Bords traites: $($edges -join ', ')" -ForegroundColor Green
        } else {
            Write-Error "Le fichier temporaire n'a pas ete cree"
        }
    }
    catch {
        Write-Error "Erreur lors du traitement: $_"
        if (Test-Path $tempFile) {
            Remove-Item $tempFile
        }
    }
}

function Add-EdgeTorn {
    param(
        [Parameter(Mandatory=$true, Position=0)]
        [string]$ImagePath,
        [switch]$B,  # Bas
        [switch]$H,  # Haut
        [switch]$G,  # Gauche
        [switch]$D,  # Droite
        [int]$EdgeDepth = 5
    )
    
    if (-not (Test-Path $ImagePath)) {
        Write-Error "Fichier introuvable: $ImagePath"
        return
    }
    
    if (-not ($B -or $H -or $G -or $D)) {
        Write-Warning "Aucun bord specifie. Utilisez -B, -H, -G ou -D"
        return
    }
    
    $tempFile = [System.IO.Path]::GetTempFileName() + ".png"
    $maskFile = [System.IO.Path]::GetTempFileName() + ".png"
    
    try {
        # Obtenir les dimensions de l'image
        $info = & magick identify -format "%w %h" $ImagePath
        $dims = $info -split ' '
        $width = [int]$dims[0]
        $height = [int]$dims[1]
        
        # Creer un masque blanc de base
        & magick -size "${width}x${height}" xc:white $maskFile
        
        # Ajouter le bruit sur les bords specifies
        if ($B) {
            & magick $maskFile -region "${width}x${EdgeDepth}+0+$($height-$EdgeDepth)" `
                +noise Random -threshold 50% $maskFile
        }
        if ($H) {
            & magick $maskFile -region "${width}x${EdgeDepth}+0+0" `
                +noise Random -threshold 50% $maskFile
        }
        if ($G) {
            & magick $maskFile -region "${EdgeDepth}x${height}+0+0" `
                +noise Random -threshold 50% $maskFile
        }
        if ($D) {
            & magick $maskFile -region "${EdgeDepth}x${height}+$($width-$EdgeDepth)+0" `
                +noise Random -threshold 50% $maskFile
        }
        
        # Appliquer le masque a l'image
        & magick $ImagePath $maskFile -alpha off -compose CopyOpacity -composite $tempFile
        
        if (Test-Path $tempFile) {
            Move-Item -Path $tempFile -Destination $ImagePath -Force
            
            $edges = @()
            if ($H) { $edges += "Haut" }
            if ($B) { $edges += "Bas" }
            if ($G) { $edges += "Gauche" }
            if ($D) { $edges += "Droite" }
            
            Write-Host "OK $ImagePath - Bords dechires: $($edges -join ', ')" -ForegroundColor Green
        }
    }
    catch {
        Write-Error "Erreur: $_"
    }
    finally {
        if (Test-Path $maskFile) { Remove-Item $maskFile }
        if (Test-Path $tempFile) { Remove-Item $tempFile }
    }
}

function Add-EdgeJagged {
    param(
        [Parameter(Mandatory=$true, Position=0)]
        [string]$ImagePath,
        [switch]$B, [switch]$H, [switch]$G, [switch]$D,
        [int]$EdgeSize = 10
    )
    
    if (-not (Test-Path $ImagePath)) {
        Write-Error "Fichier introuvable: $ImagePath"
        return
    }
    
    if (-not ($B -or $H -or $G -or $D)) {
        Write-Warning "Aucun bord specifie"
        return
    }
    
    $tempFile = [System.IO.Path]::GetTempFileName() + ".png"
    
    $args = @($ImagePath, '-alpha', 'set')
    
    # Appliquer un effet de morphologie sur les bords
    if ($B) {
        $args += '(', '+clone', '-gravity', 'South', '-splice', "0x$EdgeSize",
                 '-background', 'none', '-wave', "${EdgeSize}x50", 
                 '-chop', "0x$EdgeSize", ')',
                 '-composite'
    }
    if ($D) {
        $args += '(', '+clone', '-gravity', 'East', '-splice', "${EdgeSize}x0",
                 '-background', 'none', '-wave', "50x$EdgeSize",
                 '-chop', "${EdgeSize}x0", ')',
                 '-composite'
    }
    if ($H) {
        $args += '(', '+clone', '-gravity', 'North', '-splice', "0x$EdgeSize",
                 '-background', 'none', '-wave', "${EdgeSize}x50",
                 '-chop', "0x$EdgeSize", ')',
                 '-composite'
    }
    if ($G) {
        $args += '(', '+clone', '-gravity', 'West', '-splice', "${EdgeSize}x0",
                 '-background', 'none', '-wave', "50x$EdgeSize",
                 '-chop', "${EdgeSize}x0", ')',
                 '-composite'
    }
    
    $args += $tempFile
    
    try {
        & magick $args
        
        if (Test-Path $tempFile) {
            Move-Item -Path $tempFile -Destination $ImagePath -Force
            Write-Host "OK $ImagePath" -ForegroundColor Green
        }
    }
    catch {
        Write-Error "Erreur: $_"
        if (Test-Path $tempFile) { Remove-Item $tempFile }
    }
}

function Add-EdgePixelated {
    param(
        [Parameter(Mandatory=$true, Position=0)]
        [string]$ImagePath,
        [switch]$B, [switch]$H, [switch]$G, [switch]$D,
        [int]$PixelSize = 3
    )
    
    if (-not (Test-Path $ImagePath)) {
        Write-Error "Fichier introuvable: $ImagePath"
        return
    }
    
    $tempFile = [System.IO.Path]::GetTempFileName() + ".png"
    
    $args = @($ImagePath)
    
    if ($B) {
        $args += '(', '+clone', '-gravity', 'South', '-crop', "x${PixelSize}+0+0",
                 '-scale', "100x${PixelSize}!", '-scale', "100%x1000%", ')',
                 '-gravity', 'South', '-composite'
    }
    if ($D) {
        $args += '(', '+clone', '-gravity', 'East', '-crop', "${PixelSize}x+0+0",
                 '-scale', "${PixelSize}x100!", '-scale', "1000%x100%", ')',
                 '-gravity', 'East', '-composite'
    }
    
    $args += $tempFile
    
    try {
        & magick $args
        if (Test-Path $tempFile) {
            Move-Item -Path $tempFile -Destination $ImagePath -Force
            Write-Host "OK $ImagePath" -ForegroundColor Green
        }
    }
    catch {
        Write-Error "Erreur: $_"
        if (Test-Path $tempFile) { Remove-Item $tempFile }
    }
}
