# NGO Connect

**A Full-Stack Platform for NGO Event and Volunteer Management**

NGO Connect is a full-stack web application that connects volunteers with NGOs and simplifies event management, volunteer registrations, attendance tracking, and certificate generation. It provides dedicated functionality for volunteers and coordinators through a centralized platform.

## Technology Stack

![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react\&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-Build_Tool-646CFF?logo=vite\&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=nodedotjs\&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-API-000000?logo=express\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb\&logoColor=white)

| Category        | Technologies                               |
| --------------- | ------------------------------------------ |
| Frontend        | React, Vite, React Router, JavaScript, CSS |
| Backend         | Node.js, Express.js, REST APIs             |
| Database        | MongoDB Atlas, Mongoose                    |
| Authentication  | JWT, bcrypt.js                             |
| Version Control | Git, GitHub                                |

## Features

### Volunteer

* Register and log in securely.
* Browse available NGO events and register for them.
* Track registration status.
* View and manage personal profile information.
* Access, print, and download earned certificates.
* Verify certificates using a unique certificate ID.

### Coordinator

* Access the coordinator dashboard.
* Create, edit, and delete NGO events.
* View and manage events created by the coordinator.
* Review volunteer registrations.
* Approve or reject registration requests.
* Record attendance as Present or Absent.
* Generate certificates for eligible volunteers.

### Certificate Management

* Generate certificates based on registration approval and attendance eligibility.
* Associate certificates with unique IDs.
* Allow volunteers to view and print or download their certificates.
* Support certificate verification using the certificate ID.

## Application Workflow

**Volunteer Workflow**

Register/Login → Browse Events → Register → Registration Approval → Attend Event → Attendance Marked Present → Certificate Generation → View or Verify Certificate

**Coordinator Workflow**

Login → Manage Events → Review Registrations → Approve or Reject Requests → Record Attendance → Generate Certificates for Eligible Volunteers

## Project Structure

```text
ngo-connect/
├── public/
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Installation and Setup

### Prerequisites

* Node.js and npm
* MongoDB Atlas account or another configured MongoDB database
* Git

### 1. Clone the Repository

```bash
git clone https://github.com/Anushka9090/NGO-Connect.git
cd NGO-Connect
```

### 2. Install Dependencies

Install frontend dependencies from the project root:

```bash
npm install
```

Install backend dependencies:

```bash
cd server
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the `server` directory and configure the variables required by your backend.

Example only — use the exact variable names referenced in your code:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_secret_key
```

Never commit `.env` files or expose database credentials, passwords, or secret keys in GitHub.

### 4. Run the Application

Start the backend from the `server` directory using the start script defined in `server/package.json`.

In a **separate terminal**, navigate to the project root and start the frontend:

```bash
npm run dev
```

Open the local URL displayed by Vite in your terminal. Ensure the frontend API configuration points to the correct backend URL.

## Security

* Hash passwords before storing them.
* Validate JWTs on protected API routes.
* Enforce role-based permissions on the backend.
* Store credentials in environment variables.
* Keep secrets and `.env` files out of version control.

## Future Improvements

* Email notifications for registration updates
* Event search and filtering
* Automated testing
* Enhanced reporting and analytics

---

**NGO Connect — Simplifying NGO Event Management and Volunteer Participation.**
