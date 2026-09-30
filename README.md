# NGO Connect

NGO Connect is a full-stack MERN web application designed to connect volunteers with NGOs and simplify event management, volunteer registration, attendance tracking, and certificate generation.

The platform provides separate functionality for volunteers and coordinators, allowing them to manage and participate in NGO events through a centralized system.

---

## Features

### Volunteer

- User registration and login
- JWT-based authentication
- Browse published events
- Register for events
- View registered events
- View personal profile
- View earned certificates
- Print/download certificates
- Certificate verification using a unique certificate ID

### Coordinator

- Coordinator login
- Coordinator dashboard
- Create NGO events
- Edit events
- Delete events
- View coordinator's own events
- View registered volunteers
- Approve or reject volunteer registrations
- Mark volunteer attendance as Present or Absent
- Generate certificates for eligible volunteers

### Certificate System

Certificates are generated only when:

1. The volunteer's registration is approved
2. The volunteer is marked as present

Each certificate receives a unique certificate ID.

The certificate can then be viewed and printed/downloaded by the volunteer.

---

## Technology Stack

### Frontend

- React
- Vite
- React Router
- Tailwind CSS
- JavaScript

### Backend

- Node.js
- Express.js
- REST API
- JWT Authentication
- bcrypt.js

### Database

- MongoDB
- MongoDB Atlas
- Mongoose

---

## User Roles

### Volunteer

Volunteers can discover NGO events, register for events, track their registrations, and receive certificates for participating in events.

### Coordinator

Coordinators can create and manage their NGO events, manage volunteer registrations, record attendance, and generate certificates.

---

## Application Workflow

### Volunteer Workflow

```text
Register / Login
      ↓
Browse Events
      ↓
Register for Event
      ↓
Coordinator Reviews Registration
      ↓
Registration Approved
      ↓
Attend Event
      ↓
Coordinator Marks Attendance
      ↓
Attendance = Present
      ↓
Certificate Generated
      ↓
Volunteer Views / Downloads Certificate