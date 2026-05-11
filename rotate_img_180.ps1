
Add-Type -AssemblyName System.Drawing
$imgPath = "public/team/sirkovskaya-tatyana.jpg"
$img = [System.Drawing.Image]::FromFile($imgPath)
$img.RotateFlip([System.Drawing.RotateFlipType]::Rotate180FlipNone)
$img.Save($imgPath + ".new.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$img.Dispose()
Move-Item ($imgPath + ".new.jpg") $imgPath -Force
Write-Host "Rotated Sirkovskaya photo 180 degrees to fix upside down issue."
