# Attendance Management System – InnoViast

A full-stack Attendance Management System built using the MERN stack for the InnoViast Week 1 Full-Stack Product Engineering Assignment.

## Live Demo

Frontend:
https://attendance-system-innoviast.vercel.app/

Backend:
Currently runs locally (Express + MongoDB)

GitHub Repository:
https://github.com/Rimz25/Attendance-System-InnoViast

# Project Overview

The Attendance Management System allows institutions, bootcamps, and organizations to manage attendance digitally.

The application provides secure role-based authentication and allows administrators and instructors to manage students, classes, attendance records, sessions, and reports.

# Features

## Authentication

- JWT Authentication
- Secure Login
- Password Encryption using bcrypt
- Role Based Authorization

## User Roles

### Admin

- Login
- Dashboard
- Manage Students
- Manage Classes
- Manage Sessions
- Mark Attendance
- View Reports
- Export Reports

### Instructor

- Login
- Dashboard
- Manage Classes
- Manage Sessions
- Mark Attendance
- View Reports

### Student

- Login
- Dashboard
- View Personal Attendance

# Modules

## Dashboard

- Statistics Cards
- Attendance Summary
- Pie Chart
- Bar Chart
- Recent Attendance
- Quick Actions

## Student Management

- Add Student
- Edit Student
- Delete Student
- View Students

## Class Management

- Create Class
- Edit Class
- Delete Class

## Session Management

- Create Session
- Edit Session
- Delete Session

## Attendance

- Mark Present
- Mark Absent
- Mark Late

## Reports

- Filter by Class
- Filter by Session
- Filter by Status
- Filter by Date
- Search Student
- CSV Export
- Printable Report

# Tech Stack

## Frontend

- React
- React Router
- Axios
- Tailwind CSS
- React Hot Toast
- React Icons
- Recharts

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

# Folder Structure

Attendance-System-InnoViast
│
├── client
│ ├── src
│ ├── public
│ └── package.json
│
├── server
│ ├── config
│ ├── controllers
│ ├── middleware
│ ├── models
│ ├── routes
│ ├── server.js
│ └── package.json
│
└── README.md

# Database Schema

The following Entity Relationship Diagram (ERD) represents the database structure used in the Attendance Management System.

<p align="center">
  <img src="screenshots/database-schema.png" width="90%">
</p>

# Database Collections

## Users

- Name
- Email
- Password
- Role

## Students

- Name
- Roll Number
- Department
- Semester
- Email

## Classes

- Class Name
- Subject
- Instructor

## Sessions

- Session Date
- Class

## Attendance

- Student
- Class
- Session
- Status
- Date

# Installation

## Clone Repository

```bash
git clone https://github.com/Rimz25/Attendance-System-InnoViast.git
```

## Backend

```bash
cd server
npm install
npm run dev
```

## Frontend

```bash
cd client
npm install
npm run dev
```

# Environment Variables

PORT=5000

MONGO_URI=mongodb://su92bssemf24353_db_user:B8vxYwqhcVeoWoQ9@ac-9dysijx-shard-00-00.rtg8o6e.mongodb.net:27017,ac-9dysijx-shard-00-01.rtg8o6e.mongodb.net:27017,ac-9dysijx-shard-00-02.rtg8o6e.mongodb.net:27017/attendanceDB?ssl=true&replicaSet=atlas-coifni-shard-0&authSource=admin&appName=Cluster0

JWT_SECRET=mysecretkey123

# Sample Login Credentials

## Admin

Email:
admin@gmail.com

Password:
123456

## Instructor

Email:
aiman@gmail.com

Password:
$2b$10$9jSgnKOr/cXByVx9PcDkJOeE6DfZFcYH0uTQyhOSEBDs.efi8u1XG

## Student

Email:
rmsha456@gmail.com

Password:
$2b$10$PKAqTaq0dk988RWDKskpHeNY4iNXOeSCDzGFQGzO6k.ChEKp74t/a

# Screenshots

## Login Page

![Login](screenshots/login.png)

---

## Dashboard

![Dashboard](screenshots/dashboard.png)

---

## Student Management

![Students](screenshots/students.png)

---

## Attendance Management

![Attendance](screenshots/attendance.png)

---

## Reports

![Reports](screenshots/reports.png)

# Future Improvements

- Email Notifications
- QR Code Attendance
- Face Recognition Attendance
- Mobile Application
- Dark Mode
- Attendance Analytics
- Excel Export
- PDF Reports

---

# Author

**Rimsha Aamir**

Software Engineering Student

GitHub:
https://github.com/Rimz25

---

# License

This project was developed for the **InnoViast Full Stack Product Engineering Internship Assignment (Week 1)**.
