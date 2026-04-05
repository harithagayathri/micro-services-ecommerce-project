# PowerShell script to start all microservices
# Make sure Java, Maven, and Node.js are installed first

Write-Host "Starting Microservices Project..." -ForegroundColor Green
Write-Host ""

# Check if Java is installed
try {
    $javaVersion = java -version 2>&1
    Write-Host "Java found: $($javaVersion[0])" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Java is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Java 17+ from https://adoptium.net/" -ForegroundColor Yellow
    exit 1
}

# Check if Maven is installed
try {
    $mvnVersion = mvn -version 2>&1 | Select-Object -First 1
    Write-Host "Maven found: $mvnVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Maven is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Maven from https://maven.apache.org/download.cgi" -ForegroundColor Yellow
    Write-Host "Or use an IDE like IntelliJ IDEA which has built-in Maven support" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Starting services in separate windows..." -ForegroundColor Cyan
Write-Host ""

# Start Eureka Server
Write-Host "Starting Eureka Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\eureka-server'; mvn spring-boot:run"
Start-Sleep -Seconds 5

# Start User Service
Write-Host "Starting User Service..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\user-service'; mvn spring-boot:run"
Start-Sleep -Seconds 3

# Start Product Service
Write-Host "Starting Product Service..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\product-service'; mvn spring-boot:run"
Start-Sleep -Seconds 3

# Start Order Service
Write-Host "Starting Order Service..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\order-service'; mvn spring-boot:run"
Start-Sleep -Seconds 3

# Start API Gateway
Write-Host "Starting API Gateway..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\api-gateway'; mvn spring-boot:run"
Start-Sleep -Seconds 3

# Start React Frontend
Write-Host "Starting React Frontend..." -ForegroundColor Yellow
if (Test-Path "$PSScriptRoot\frontend\node_modules") {
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; npm start"
} else {
    Write-Host "Installing frontend dependencies first..." -ForegroundColor Yellow
    Set-Location "$PSScriptRoot\frontend"
    npm install
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; npm start"
}

Write-Host ""
Write-Host "All services are starting in separate windows!" -ForegroundColor Green
Write-Host ""
Write-Host "Access points:" -ForegroundColor Cyan
Write-Host "  - Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "  - Eureka Dashboard: http://localhost:8761" -ForegroundColor White
Write-Host "  - API Gateway: http://localhost:8080" -ForegroundColor White
Write-Host ""
Write-Host "Wait for all services to start (about 1-2 minutes)" -ForegroundColor Yellow
Write-Host "Check Eureka dashboard to see registered services" -ForegroundColor Yellow


