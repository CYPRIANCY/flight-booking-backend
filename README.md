# ✈️ CYPIDON Flight Booking System — Backend API

A production-oriented RESTful API for managing flight search, bookings, authentication, payments, and electronic flight tickets.

Built with **Node.js, Express.js, MongoDB, and Mongoose**, this backend provides a secure foundation for a modern flight-booking platform with passenger and administrator workflows.

---

## 🚀 Overview

The **CYPIDON Flight Booking System** is a backend API designed to support the core operations of an online flight reservation platform.

The system allows passengers to:

* Create an account and authenticate securely
* Search available flights
* View flight details
* Book available seats
* View their booking history
* Cancel bookings
* Make payments
* Receive electronic tickets by email
* Download generated PDF tickets

Administrators can:

* Create flights
* Update flight information
* Delete flights
* View all bookings
* Filter booking records
* Monitor booking statistics
* Track total revenue

The project demonstrates practical backend engineering concepts including **REST API design, authentication, authorization, database relationships, email services, PDF generation, and API security**.

---

## 🛠️ Technology Stack

| Technology | Purpose                       |
| ---------- | ----------------------------- |
| Node.js    | JavaScript runtime            |
| Express.js | REST API framework            |
| MongoDB    | NoSQL database                |
| Mongoose   | MongoDB ODM                   |
| JWT        | Authentication                |
| bcryptjs   | Password hashing              |
| Nodemailer | Email notifications           |
| PDFKit     | PDF ticket generation         |
| PayPal SDK | Payment integration           |
| CORS       | Cross-origin resource sharing |
| dotenv     | Environment configuration     |
| Nodemon    | Development server            |

---

## ✨ Key Features

### 🔐 Authentication & Authorization

* User registration
* User login
* JWT-based authentication
* Password hashing with bcrypt
* Protected API routes
* Passenger/admin role-based authorization

### ✈️ Flight Management

Administrators can:

* Create flights
* Update flights
* Delete flights
* View available flights
* View individual flight details

Passengers and visitors can:

* Browse available flights
* Search flights by route
* Filter by airline
* Filter by departure date
* Filter by price range

### 🎫 Booking Management

Passengers can:

* Book one or more seats
* View their bookings
* Cancel bookings
* Automatically restore seats when a booking is cancelled
* Calculate booking total price

### 💳 Payment Processing

The API supports the payment workflow for bookings and records:

* Payment ID
* Payment status
* Payment email
* Payment timestamp
* Booking payment status

### 📄 Electronic Ticket Generation

After successful payment:

* A PDF ticket is generated
* Ticket information is stored
* Ticket is attached to an email
* Passengers can download their ticket

### 📧 Email Notifications

The system sends email notifications for:

* Booking confirmation
* Booking cancellation
* Flight ticket delivery

### 📊 Administration

Administrators can access:

* All bookings
* Booking filters
* Total bookings
* Total flights
* Total revenue

---

# 🏗️ Project Architecture

The application follows a modular MVC-style backend architecture.

```text
flight-booking-backend/
│
├── config/
│   ├── db.js
│   └── paypal.js
│
├── controllers/
│   ├── adminController.js
│   ├── authController.js
│   ├── bookingController.js
│   ├── flightController.js
│   ├── paymentController.js
│   └── ticketController.js
│
├── middleware/
│   ├── adminMiddleware.js
│   ├── authMiddleware.js
│   └── errorMiddleware.js
│
├── models/
│   ├── Booking.js
│   ├── Flight.js
│   └── User.js
│
├── routes/
│   ├── adminRoutes.js
│   ├── authRoutes.js
│   ├── bookingRoutes.js
│   ├── flightRoutes.js
│   ├── paymentRoutes.js
│   └── ticketRoutes.js
│
├── utils/
│   ├── emailService.js
│   ├── generateToken.js
│   ├── pdfGenerator.js
│   └── sendEmail.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

---

# 🔄 Application Workflow

```text
                    ┌─────────────────┐
                    │     Client      │
                    │ Web / Mobile UI │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   Express API   │
                    └────────┬────────┘
                             │
            ┌────────────────┼────────────────┐
            │                │                │
            ▼                ▼                ▼
       Authentication     Flights          Bookings
            │                │                │
            ▼                ▼                ▼
           JWT           MongoDB          MongoDB
                             │
                             ▼
                         Payment
                             │
                             ▼
                      PDF Ticket
                             │
                             ▼
                       Email Service
```

---

# 🔑 API Endpoints

## Authentication

### Register

```http
POST /api/auth/register
```

Example request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

### Login

```http
POST /api/auth/login
```

Example:

```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

---

# ✈️ Flight Endpoints

### Get all flights

```http
GET /api/flights
```

### Get a flight

```http
GET /api/flights/:id
```

### Search flights

```http
GET /api/flights/search
```

Supported query parameters:

```text
from
to
date
airline
minPrice
maxPrice
```

Example:

```http
GET /api/flights/search?from=ABV&to=LOS
```

### Create flight

```http
POST /api/flights
```

**Admin only**

### Update flight

```http
PUT /api/flights/:id
```

**Admin only**

### Delete flight

```http
DELETE /api/flights/:id
```

**Admin only**

---

# 🎫 Booking Endpoints

### Create booking

```http
POST /api/bookings
```

Example:

```json
{
  "flightId": "FLIGHT_ID",
  "seats": 2
}
```

### Get my bookings

```http
GET /api/bookings/my
```

### Cancel booking

```http
DELETE /api/bookings/:id
```

---

# 💳 Payment

### Process booking payment

```http
POST /api/payments/:bookingId/pay
```

Payment requests require an authenticated user.

---

# 📄 Tickets

### Download ticket

```http
GET /api/tickets/download/:bookingId
```

The endpoint returns the generated PDF ticket for the authenticated passenger.

---

# 👨‍💼 Admin API

Admin routes require both authentication and administrator privileges.

### Get all bookings

```http
GET /api/admin/bookings
```

Optional filters:

```text
flight
user
date
```

Example:

```http
GET /api/admin/bookings?date=2026-09-15
```

### Get statistics

```http
GET /api/admin/stats
```

Example response:

```json
{
  "totalBookings": 25,
  "totalFlights": 12,
  "totalRevenue": 4500
}
```

---

# 🔒 Authentication

Protected endpoints use **Bearer JWT authentication**.

Include the token in the request header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

Example:

```text
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

The API validates the token and attaches the authenticated user to the request.

---

# 🗄️ Database Models

## User

```text
User
├── name
├── email
├── password
└── role
```

Roles:

```text
passenger
admin
```

---

## Flight

```text
Flight
├── airline
├── flightNumber
├── departureAirport
├── arrivalAirport
├── departureTime
├── arrivalTime
├── seatsAvailable
└── price
```

---

## Booking

```text
Booking
├── user
├── flight
├── seats
├── totalPrice
├── status
├── paid
├── paymentDetails
├── ticketPDF
└── timestamps
```

The `user` and `flight` fields reference MongoDB documents using Mongoose relationships.

---

# ⚙️ Getting Started

## Prerequisites

Make sure you have installed:

* Node.js 18+
* npm
* MongoDB or MongoDB Atlas
* Git

---

## 1. Clone the repository

```bash
git clone https://github.com/CYPRIANCY/flight-booking-backend.git
```

Navigate into the project:

```bash
cd flight-booking-backend
```

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Configure environment variables

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

If PayPal is enabled, configure the required PayPal credentials as well.

**Never commit your `.env` file to GitHub.**

---

## 4. Run the development server

```bash
npm run dev
```

The API will run locally at:

```text
http://localhost:5000
```

---

## 5. Run production server

```bash
npm start
```

---

# 🧪 API Testing

The API can be tested using tools such as:

* Postman
* Insomnia
* Thunder Client
* cURL

Recommended testing workflow:

```text
Register User
      ↓
Login
      ↓
Receive JWT
      ↓
Create/Search Flight
      ↓
Create Booking
      ↓
Process Payment
      ↓
Generate Ticket
      ↓
Receive Ticket Email
      ↓
Download Ticket
```

---

# 🚀 Deployment

The backend is deployed as a web service using **Render**.

Production environment variables should be configured through the hosting provider rather than committed to the repository.

Example production API:

```text
https://YOUR-RENDER-SERVICE.onrender.com
```

Health check:

```http
GET /
```

Example response:

```json
{
  "message": "Welcome to CYPIDON Flight Booking System",
  "status": "running"
}
```

---

# 🔐 Security Considerations

The project implements several backend security practices:

* Password hashing using bcrypt
* JWT authentication
* Protected routes
* Role-based authorization
* Environment variables for secrets
* CORS configuration
* User ownership validation for bookings and tickets

For a production deployment, additional security improvements should include:

* Rate limiting
* Request validation
* Helmet security headers
* Stronger input sanitization
* Payment provider verification
* Centralized error handling
* Logging and monitoring
* HTTPS enforcement
* More comprehensive automated tests

---

# 📈 Future Improvements

Planned improvements include:

* [ ] Complete PayPal transaction verification
* [ ] Add automated API tests
* [ ] Add request validation
* [ ] Add centralized error handling
* [ ] Add rate limiting
* [ ] Add API documentation with Swagger/OpenAPI
* [ ] Add refresh-token authentication
* [ ] Add booking expiration
* [ ] Add seat selection
* [ ] Add airline management
* [ ] Add passenger profile management
* [ ] Add booking history and receipts
* [ ] Add automated deployment pipeline
* [ ] Add application monitoring
* [ ] Build a React/Next.js frontend

---

# 📚 What This Project Demonstrates

This project demonstrates practical experience with:

```text
REST API Development
        +
Node.js
        +
Express.js
        +
MongoDB
        +
Mongoose
        +
JWT Authentication
        +
Role-Based Authorization
        +
Payment Integration
        +
Email Services
        +
PDF Generation
        +
Deployment
```

It was built to strengthen practical backend engineering skills and demonstrate how multiple backend services can work together in a real-world application.

---

# 👨‍💻 Author

**Akpen Sesugh Cyprian**

Junior Backend Software Engineer

### Core Technologies

```text
Node.js
TypeScript
JavaScript
Express.js
REST APIs
MongoDB
PostgreSQL
Git
GitHub
```

### Connect

* GitHub: https://github.com/CYPRIANCY
* LinkedIn: https://www.linkedin.com/in/akpen-sesugh-cyprian

---

# 📄 License

This project is licensed under the ISC License.

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.
