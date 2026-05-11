
Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile('public/team/sirkovskaya-tatyana.jpg')
Write-Host "WIDTH: $($img.Width)"
Write-Host "HEIGHT: $($img.Height)"
$img.Dispose()
