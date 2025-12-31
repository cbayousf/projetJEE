# Cabinet Medical - Complete Setup Guide

This guide provides step-by-step instructions to set up and run the merged medical cabinet application with three interfaces: Administrator, Doctor, and Secretary.

## Prerequisites

- Java 17 or higher
- PostgreSQL 12 or higher
- Node.js 16 or higher
- Maven 3.6 or higher
- Git

## 1. Database Setup

### Create PostgreSQL Database

1. Open PostgreSQL command line or pgAdmin
2. Create a new database named `cabinet_medical_db`:

```sql
CREATE DATABASE cabinet_medical_db;
```

3. Create a user (optional, but recommended):

```sql
CREATE USER cabinet_user WITH PASSWORD 'your_password_here';
GRANT ALL PRIVILEGES ON DATABASE cabinet_medical_db TO cabinet_user;
```

### Import Initial Data (Optional)

If you have the `data_test.sql` file from the admin part:

```bash
psql -U postgres -d cabinet_medical_db -f projet/projet_JEE-feature-admin/data_test.sql
```

## 2. Backend Setup

### Configure Database Connection

Edit `src/main/resources/application.properties`:

```properties
# PostgreSQL Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/cabinet_medical_db
spring.datasource.username=postgres  # or your username
spring.datasource.password=your_password_here
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# Server Configuration
server.port=8080
server.servlet.context-path=/api

# Email Configuration (for password reset)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your_email@gmail.com
spring.mail.password=your_app_password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

### Build and Run Backend

1. Navigate to the project root:

```bash
cd projet
```

2. Clean and compile:

```bash
mvn clean compile
```

3. Run the application:

```bash
mvn spring-boot:run
```

The backend will start on `http://localhost:8080/api`

## 3. Frontend Setup

### Install Dependencies

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install Node.js dependencies:

```bash
npm install
```

### Configure API Base URL

The frontend is configured to proxy API requests to `http://localhost:8080` (see `package.json` proxy setting).

If you need to change the backend URL, edit `src/services/api.js` and other service files.

### Run Frontend

```bash
npm start
```

The frontend will start on `http://localhost:3000`

## 4. Application Usage

### Default Users

After running the application, you can log in with these default users (if data_test.sql was imported):

- **Administrator**: username: admin, password: admin123
- **Doctor**: username: doctor, password: doctor123
- **Secretary**: username: secretary, password: secretary123

### Interfaces

1. **Administrator Interface** (`/admin/*`):
   - Dashboard with statistics
   - Manage cabinets, users, specialties, medications
   - User management and password reset

2. **Doctor Interface** (`/doctor/*`):
   - Patient management
   - Medical records (dossiers)
   - Document management
   - Statistics

3. **Secretary Interface** (`/secretary/*`):
   - Appointment management (rendez-vous)
   - Consultations
   - Prescriptions (ordonnances)
   - Billing (factures)
   - Notifications

### Authentication Flow

1. Access `http://localhost:3000`
2. Log in with appropriate credentials
3. You will be redirected to your role-specific dashboard

## 5. API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Administrator
- `GET /api/admin/cabinets` - List cabinets
- `POST /api/admin/cabinets` - Create cabinet
- `GET /api/admin/users` - List users
- `POST /api/admin/users` - Create user
- `GET /api/admin/specialites` - List specialties
- `GET /api/admin/medicaments` - List medications

### Doctor
- `GET /api/patients` - List patients
- `POST /api/patients` - Create patient
- `GET /api/dossiers` - List medical records
- `POST /api/documents` - Upload document

### Secretary
- `GET /api/rendezvous` - List appointments
- `POST /api/rendezvous` - Create appointment
- `GET /api/consultations` - List consultations
- `GET /api/ordonnances` - List prescriptions
- `GET /api/factures` - List invoices
- `GET /api/notifications` - List notifications

## 6. Troubleshooting

### Backend Issues

1. **Database Connection Error**:
   - Verify PostgreSQL is running
   - Check database name, username, and password in `application.properties`
   - Ensure database exists

2. **Port Already in Use**:
   - Change `server.port` in `application.properties`
   - Or kill process using port 8080

3. **Compilation Errors**:
   - Ensure Java 17+ is installed
   - Run `mvn clean compile` to check for issues

### Frontend Issues

1. **API Connection Error**:
   - Ensure backend is running on port 8080
   - Check proxy setting in `package.json`

2. **Dependencies Error**:
   - Run `npm install` again
   - Clear node_modules: `rm -rf node_modules && npm install`

3. **Build Errors**:
   - Ensure Node.js 16+ is installed
   - Check for missing files in merged components

### Common Issues

1. **Role-based Access**:
   - Ensure user has correct role in database
   - Check authentication service configuration

2. **CORS Issues**:
   - Backend has CORS configuration in `CorsConfig.java`
   - Frontend proxy should handle most CORS issues

## 7. Development

### Project Structure

```
projet/
├── src/main/java/com/cabinet/medical/
│   ├── MedicalManagementApplication.java
│   ├── admin/          # Admin module
│   ├── patient/        # Patient/Doctor module
│   ├── facturation/    # Billing module
│   ├── notification/   # Notification module
│   └── rendezvous/     # Appointment module
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/      # Admin components
│   │   │   ├── doctor/     # Doctor components
│   │   │   └── secretary/  # Secretary components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── App.js          # Main app with routing
│   └── package.json
└── pom.xml
```

### Adding New Features

1. **Backend**: Add new entities, repositories, services, and controllers in appropriate modules
2. **Frontend**: Add new components in role-specific folders and update routing in `App.js`

## 8. Production Deployment

### Backend
```bash
mvn clean package
java -jar target/medical-management-1.0.0.jar
```

### Frontend
```bash
npm run build
# Serve build files with nginx or apache
```

### Environment Variables
For production, use environment variables for sensitive data:
- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`
- `MAIL_USERNAME`
- `MAIL_PASSWORD`

## Support

If you encounter issues not covered in this guide, check:
1. Application logs in console/terminal
2. Browser developer tools for frontend issues
3. PostgreSQL logs for database issues
4. Ensure all prerequisites are correctly installed

The application is now ready to use with all three interfaces merged into a single cohesive system!
