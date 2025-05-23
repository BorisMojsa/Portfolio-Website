# Add Git to PATH
$env:Path = "C:\Program Files\Git\cmd;" + $env:Path

# Configure Git
& git config --global user.email "mojsaboris@gmail.com"
& git config --global user.name "Boris Mojsa"

# Initialize repository
& git init
& git add .
& git commit -m "Initial commit: Project structure setup"

# Add remote repository
& git remote add origin https://github.com/BorisMojsa/Portfolio-Website.git

# Push to GitHub
Write-Host "Please run these commands in a new terminal:"
Write-Host "1. git push -u origin main"
Write-Host "2. When prompted, enter your GitHub credentials"
