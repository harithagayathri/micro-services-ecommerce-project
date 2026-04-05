# Quick Start Guide

## Prerequisites Installation

### 1. Install Java 17 or Higher

**Option A: Using Chocolatey (Recommended for Windows)**
```powershell
# Install Chocolatey first (if not installed)
# Run PowerShell as Administrator, then:
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install Java 17
choco install openjdk17 -y

# Install Maven
choco install maven -y
```

**Option B: Manual Installation**

1. **Java:**
   - Download from: https://adoptium.net/temurin/releases/
   - Choose: Windows x64, JDK 17, .msi installer
   - Run installer and follow instructions
   - Set `JAVA_HOME` environment variable to JDK installation path

2. **Maven:**
   - Download from: https://maven.apache.org/download.cgi
   - Extract to `C:\Program Files\Apache\maven`
   - Set `MAVEN_HOME` environment variable
   - Add `%MAVEN_HOME%\bin` to PATH

**Option C: Use IDE (Easiest - No Manual Installation)**

- **IntelliJ IDEA Community Edition** (Free):
  - Download: https://www.jetbrains.com/idea/download/
  - Open project → IntelliJ will auto-download Maven and Java
  - Right-click main classes → Run

- **VS Code**:
  - Install "Extension Pack for Java"
  - Open project → VS Code will prompt for Java/Maven installation

### 2. Install Node.js (for React Frontend)

Download from: https://nodejs.org/ (LTS version)
- This includes npm automatically

## Verify Installation

Open a **new** PowerShell window and run:

```powershell
java -version
mvn -version
node -v
npm -v
```

All commands should show version information.

## Running the Project

### Method 1: Using Maven Commands

**Terminal 1 - Eureka Server:**
```powershell
cd eureka-server
mvn spring-boot:run
```
Wait for "Started EurekaServerApplication" message

**Terminal 2 - User Service:**
```powershell
cd user-service
mvn spring-boot:run
```

**Terminal 3 - Product Service:**
```powershell
cd product-service
mvn spring-boot:run
```

**Terminal 4 - Order Service:**
```powershell
cd order-service
mvn spring-boot:run
```

**Terminal 5 - API Gateway:**
```powershell
cd api-gateway
mvn spring-boot:run
```

**Terminal 6 - React Frontend:**
```powershell
cd frontend
npm install
npm start
```

### Method 2: Using IDE (Recommended)

1. Open project in IntelliJ IDEA or VS Code
2. Wait for Maven dependencies to download
3. Run each service's main class:
   - `EurekaServerApplication`
   - `UserServiceApplication`
   - `ProductServiceApplication`
   - `OrderServiceApplication`
   - `ApiGatewayApplication`
4. Run frontend: `cd frontend && npm install && npm start`

## Access Points

- **Frontend:** http://localhost:3000
- **Eureka Dashboard:** http://localhost:8761
- **API Gateway:** http://localhost:8080
- **User Service:** http://localhost:8081
- **Product Service:** http://localhost:8082
- **Order Service:** http://localhost:8083

## Common Issues

### "mvn is not recognized"
- Maven not installed or not in PATH
- Close and reopen terminal after installation
- See SETUP_WINDOWS.md for detailed instructions

### "java is not recognized"
- Java not installed
- Install Java 17+ from https://adoptium.net/

### Port already in use
- Another application is using the port
- Stop other applications or change port in `application.yml`

### Services not registering with Eureka
- Make sure Eureka Server is running first
- Wait 30-60 seconds for services to register
- Check Eureka dashboard at http://localhost:8761


