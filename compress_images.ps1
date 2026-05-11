
Add-Type -AssemblyName System.Drawing
$teamDir = "public/team"
$files = Get-ChildItem $teamDir -Filter *.jpg

foreach ($file in $files) {
    if ($file.Length -gt 200000) { # If larger than 200KB
        Write-Host "Compressing $($file.Name)..."
        $img = [System.Drawing.Image]::FromFile($file.FullName)
        
        # Calculate new dimensions (max 800px width/height)
        $ratio = [Math]::Min(800 / $img.Width, 800 / $img.Height)
        if ($ratio -lt 1) {
            $newWidth = [int]($img.Width * $ratio)
            $newHeight = [int]($img.Height * $ratio)
            $newImg = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
            $g = [System.Drawing.Graphics]::FromImage($newImg)
            $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $g.DrawImage($img, 0, 0, $newWidth, $newHeight)
            $g.Dispose()
            $img.Dispose()
            
            # Save as JPEG with 70% quality
            $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
            $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
            $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 70)
            
            $tempPath = $file.FullName + ".tmp"
            $newImg.Save($tempPath, $encoder, $params)
            $newImg.Dispose()
            
            Move-Item $tempPath $file.FullName -Force
            Write-Host "Done: $($file.Name)"
        } else {
            $img.Dispose()
            Write-Host "Skipping $($file.Name) (already small or tiny)"
        }
    }
}
