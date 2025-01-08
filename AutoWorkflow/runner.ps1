Add-Type -AssemblyName System.Windows.Forms
Start-Sleep -Seconds 2  

[System.Windows.Forms.SendKeys]::SendWait("^(+b)")
