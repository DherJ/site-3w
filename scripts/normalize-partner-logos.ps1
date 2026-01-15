param(
  [string]$Source = "public\partners",
  [string]$Destination = "public\partners\normalized-800x400",
  [int]$TargetWidth = 800,
  [int]$TargetHeight = 400
)

Add-Type -AssemblyName System.Drawing
New-Item -ItemType Directory -Force -Path $Destination | Out-Null

Get-ChildItem -Path $Source -Filter *.png -File | ForEach-Object {
  $img = [System.Drawing.Image]::FromFile($_.FullName)
  $bmp = New-Object System.Drawing.Bitmap $TargetWidth, $TargetHeight
  $gfx = [System.Drawing.Graphics]::FromImage($bmp)
  $gfx.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $gfx.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $gfx.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $gfx.Clear([System.Drawing.Color]::White)

  $ratio = [Math]::Min($TargetWidth / $img.Width, $TargetHeight / $img.Height)
  $newW = [int]([Math]::Round($img.Width * $ratio))
  $newH = [int]([Math]::Round($img.Height * $ratio))
  $x = [int](($TargetWidth - $newW) / 2)
  $y = [int](($TargetHeight - $newH) / 2)
  $gfx.DrawImage($img, $x, $y, $newW, $newH)

  $outPath = Join-Path $Destination $_.Name
  $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)

  $gfx.Dispose()
  $bmp.Dispose()
  $img.Dispose()
}