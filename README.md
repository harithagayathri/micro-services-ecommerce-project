# Microservices Project

A comprehensive microservices architecture implementation using Spring Boot, Java, React, and API Gateway.

## Architecture Overview

This project consists of:

1. **Eureka Server** (Port 8761) - Service Discovery Server
2. **API Gateway** (Port 8080) - Spring Cloud Gateway for routing requests
3. **User Service** (Port 8081) - Manages user data
4. **Product Service** (Port 8082) - Manages product data
5. **Order Service** (Port 8083) - Manages order data
6. **React Frontend** (Port 3000) - User interface

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- Node.js 16+ and npm
- IDE (IntelliJ IDEA, Eclipse, or VS Code)

> **⚠️ First Time Setup?** If you don't have Java or Maven installed, see:
> - **[QUICK_START.md](QUICK_START.md)** - Quick installation guide
> - **[SETUP_WINDOWS.md](SETUP_WINDOWS.md)** - Detailed Windows setup instructions

## Getting Started

### Quick Start (Windows PowerShell)

If you have Java and Maven installed, you can use the provided script:

```powershell
.\start-services.ps1
```

This will start all services in separate windows automatically.

### Manual Start

### 1. Start Eureka Server

```bash
cd eureka-server
mvn spring-boot:run
```

Eureka Dashboard: http://localhost:8761

### 2. Start Microservices

Open separate terminal windows for each service:

**User Service:**
```bash
cd user-service
mvn spring-boot:run
```

**Product Service:**
```bash
cd product-service
mvn spring-boot:run
```

**Order Service:**
```bash
cd order-service
mvn spring-boot:run
```

### 3. Start API Gateway

```bash
cd api-gateway
mvn spring-boot:run
```

### 4. Start React Frontend

```bash
cd frontend
npm install
npm start
```

The frontend will be available at http://localhost:3000

## API Endpoints

All requests should go through the API Gateway at `http://localhost:8080/api`

### User Service
- `GET /api/users/users` - Get all users
- `GET /api/users/users/{id}` - Get user by ID
- `POST /api/users/users` - Create user
- `PUT /api/users/users/{id}` - Update user
- `DELETE /api/users/users/{id}` - Delete user

### Product Service
- `GET /api/products/products` - Get all products
- `GET /api/products/products/{id}` - Get product by ID
- `POST /api/products/products` - Create product
- `PUT /api/products/products/{id}` - Update product
- `DELETE /api/products/products/{id}` - Delete product

### Order Service
- `GET /api/orders/orders` - Get all orders
- `GET /api/orders/orders/{id}` - Get order by ID
- `GET /api/orders/orders/user/{userId}` - Get orders by user ID
- `POST /api/orders/orders` - Create order
- `PUT /api/orders/orders/{id}` - Update order
- `DELETE /api/orders/orders/{id}` - Delete order

## Project Structure

```
microservices-project/
├── eureka-server/          # Service Discovery
├── api-gateway/            # API Gateway
├── user-service/           # User Microservice
├── product-service/        # Product Microservice
├── order-service/          # Order Microservice
├── frontend/               # React Frontend
│   ├── src/
│   │   ├── components/    # React Components
│   │   ├── services/       # API Services
│   │   └── App.js
│   └── package.json
└── pom.xml                 # Parent POM
```

## Features

- ✅ Service Discovery with Eureka
- ✅ API Gateway with Spring Cloud Gateway
- ✅ RESTful APIs for all services
- ✅ React Frontend with routing
- ✅ H2 In-Memory Database for each service
- ✅ Actuator endpoints for monitoring
- ✅ CORS enabled for frontend integration
- ✅ Input validation
- ✅ Error handling

## Database

Each microservice uses H2 in-memory database. H2 Console is enabled for each service:
- User Service: http://localhost:8081/h2-console
- Product Service: http://localhost:8082/h2-console
- Order Service: http://localhost:8083/h2-console

JDBC URL: `jdbc:h2:mem:usersdb` (or `productsdb`, `ordersdb`)
Username: `sa`
Password: (empty)

## Building the Project

### Build All Services

```bash
mvn clean install
```

### Build Individual Service

```bash
cd <service-name>
mvn clean package
```

### Build Frontend

```bash
cd frontend
npm run build
```

## Running with Docker (Optional)

Docker support can be added by creating Dockerfiles for each service and using docker-compose for orchestration.

## Technologies Used

- **Backend:**
  - Spring Boot 3.2.0
  - Spring Cloud 2023.0.0
  - Spring Cloud Gateway
  - Netflix Eureka
  - Spring Data JPA
  - H2 Database
  - Java 17

- **Frontend:**
  - React 18.2.0
  - React Router DOM
  - Axios
  - CSS3

## Troubleshooting

1. **Port Already in Use**: Make sure all ports (8761, 8080-8083, 3000) are available
2. **Service Not Registering**: Ensure Eureka Server is running first
3. **CORS Issues**: Check that API Gateway CORS configuration is correct
4. **Frontend Not Connecting**: Verify API Gateway is running and check the proxy configuration

## License

This project is for educational purposes.

