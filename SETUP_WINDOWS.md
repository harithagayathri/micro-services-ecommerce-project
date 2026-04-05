# Windows Setup Guide

## Option 1: Install Maven (Recommended)

### Step 1: Download Maven
1. Go to https://maven.apache.org/download.cgi
2. Download `apache-maven-3.9.x-bin.zip` (latest version)

### Step 2: Extract Maven
1. Extract the zip file to `C:\Program Files\Apache\maven` (or your preferred location)
2. Note the full path (e.g., `C:\Program Files\Apache\maven\apache-maven-3.9.5`)

### Step 3: Set Environment Variables
1. Open **System Properties** → **Environment Variables**
2. Under **System Variables**, click **New**:
   - Variable name: `MAVEN_HOME`
   - Variable value: `C:\Program Files\Apache\maven\apache-maven-3.9.5` (your Maven path)
3. Edit the **Path** variable:
   - Click **Edit** → **New**
   - Add: `%MAVEN_HOME%\bin`
   - Click **OK** on all dialogs

### Step 4: Verify Installation
Open a **new** PowerShell window and run:
```powershell
mvn -version
```

You should see Maven version information.

## Option 2: Use Maven Wrapper (No Installation Required)

The project includes Maven Wrapper scripts. Use these commands instead of `mvn`:

### Windows PowerShell:
```powershell
# Build all services
.\mvnw.cmd clean install

# Run Eureka Server
cd eureka-server
..\mvnw.cmd spring-boot:run

# Run User Service
cd user-service
..\mvnw.cmd spring-boot:run
```

### Alternative: Use IDE (Easiest)

**IntelliJ IDEA:**
1. Open the project folder in IntelliJ IDEA
2. IntelliJ will automatically detect Maven and download it
3. Right-click on each service's main class → Run

**VS Code:**
1. Install "Extension Pack for Java" extension
2. Open the project folder
3. VS Code will prompt to install Maven if needed
4. Use the Run/Debug panel to start services

**Eclipse:**
1. Import as Maven Project
2. Eclipse has built-in Maven support

## Quick Start (After Maven Installation)

### 1. Verify Java is installed:
```powershell
java -version
```
Should show Java 17 or higher. If not, install Java 17+ from https://adoptium.net/

### 2. Build all services:
```powershell
mvn clean install
```

### 3. Start services in order:

**Terminal 1 - Eureka Server:**
```powershell
cd eureka-server
mvn spring-boot:run
```

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

## Troubleshooting

### Maven not found after installation:
- Close and reopen PowerShell/Command Prompt
- Verify PATH includes `%MAVEN_HOME%\bin`
- Check `MAVEN_HOME` is set correctly

### Java version issues:
- Ensure Java 17+ is installed
- Set `JAVA_HOME` environment variable to your JDK path

### Port already in use:
- Check if ports 8761, 8080-8083 are available
- Use `netstat -ano | findstr :8080` to find processes using ports


