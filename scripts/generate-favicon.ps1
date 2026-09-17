param(
    [string]$SourcePng = "assets/logo.png",
    [string]$TargetIco = "assets/favicon.ico"
)

Add-Type -AssemblyName System.Drawing

function Resize-Image($srcImg, $width, $height) {
    $bmp = New-Object System.Drawing.Bitmap($width, $height)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)
    $g.DrawImage($srcImg, 0, 0, $width, $height)
    $g.Dispose()
    return $bmp
}

$fullSource = [System.IO.Path]::GetFullPath($SourcePng)
$src = [System.Drawing.Image]::FromFile($fullSource)

# 1. Save favicon.png (64x64) and apple-touch-icon.png (180x180)
$bmp64 = Resize-Image $src 64 64
$bmp64.Save("assets/favicon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp64.Dispose()

$bmp180 = Resize-Image $src 180 180
$bmp180.Save("assets/apple-touch-icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp180.Dispose()

$bmp32 = Resize-Image $src 32 32
$bmp32.Save("assets/favicon-32x32.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp32.Dispose()

# 2. Build multi-resolution favicon.ico containing 16, 32, 48, 64, 128, 256
$sizes = @(16, 32, 48, 64, 128, 256)
$images = @()

foreach ($sz in $sizes) {
    $bmp = Resize-Image $src $sz $sz
    $ms = New-Object System.IO.MemoryStream
    $bmp.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
    $bytes = $ms.ToArray()
    $ms.Dispose()
    $bmp.Dispose()
    $images += ,@($sz, $bytes)
}
$src.Dispose()

$fullTarget = [System.IO.Path]::GetFullPath($TargetIco)
$fs = [System.IO.File]::Create($fullTarget)
$bw = New-Object System.IO.BinaryWriter($fs)

# ICONDIR header
$bw.Write([uint16]0) # Reserved
$bw.Write([uint16]1) # Type = 1 (ICO)
$bw.Write([uint16]$images.Count)

$offset = 6 + (16 * $images.Count)

foreach ($entry in $images) {
    $sz = $entry[0]
    $bytes = $entry[1]
    $w = if ($sz -ge 256) { 0 } else { [byte]$sz }
    $h = if ($sz -ge 256) { 0 } else { [byte]$sz }
    
    $bw.Write([byte]$w)
    $bw.Write([byte]$h)
    $bw.Write([byte]0)
    $bw.Write([byte]0)
    $bw.Write([uint16]1)
    $bw.Write([uint16]32)
    $bw.Write([uint32]$bytes.Length)
    $bw.Write([uint32]$offset)
    
    $offset += $bytes.Length
}

foreach ($entry in $images) {
    $bw.Write($entry[1])
}

$bw.Flush()
$bw.Close()
$fs.Close()

Write-Host "Successfully generated favicon.ico, favicon.png, favicon-32x32.png, apple-touch-icon.png from $SourcePng"
