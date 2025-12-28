🎓 Online Quiz Portal

A full-stack Online Quiz Portal with User and Admin roles, built using React, PHP, and MySQL.
This project allows users to attempt timed exams and admins to manage exams, questions, users, and results through a secure dashboard.

🚀 Features
👨‍🎓 User Side

-> User Registration & Login

> View Available Exams

-> Start Timed Exams (Auto submit on timeout)

-> Real-time Countdown Timer

-> Auto calculation of score

-> View Exam Result

🔐 Admin Side

-> Admin Login (separate admin table)

-> Protected Admin Routes

-> Create Exam Categories (Maths, Science, Computer, etc.)

-> Create Exams with Duration

-> Add MCQ Questions (4 options + correct answer)

-> View All Student Results

-> Block / Unblock Users

-> Admin Dashboard with Sidebar Navigation

-> Logout functionality

🛠 Tech Stack
Frontend

React.js

JavaScript

HTML5

CSS (Inline Styling)

Axios

React Router DOM 

Backend

PHP (REST APIs)

MySQL

Apache (XAMPP)

⚙️ Setup Instructions
1️⃣ Backend Setup (PHP + MySQL)

1.Install XAMPP

2.Start Apache and MySQL

3.Create database:
CREATE DATABASE online_quiz_portal;

4.Import provided SQL tables (users, admins, exams, questions, results, categories)

5.Place backend files in:
C:\xampp\htdocs\quiz-api

6.Update db.php with your DB credentials

2️⃣ Frontend Setup (React)
npm install
npm start

App will run at:
http://localhost:3000

🔑 Default Routes

| Purpose         | URL                |
| --------------- | ------------------ |
| Home            | `/`                |
| User Login      | `/login`           |
| Admin Login     | `/admin/login`     |
| User Dashboard  | `/exams`           |
| Admin Dashboard | `/admin/dashboard` |

🔐 Authentication & Security

User & Admin sessions stored using localStorage

Protected routes prevent unauthorized access

Blocked users cannot login

Auto logout clears session

📸 Screens Implemented

Landing Page

User Login

Admin Login

Available Exams (Card Layout)

Exam Interface (Timer)

Result Page

History Page

Admin Dashboard

Add Questions Page

View Results Page

🧠 Learning Outcomes

Full-stack development using React + PHP

REST API integration

Authentication & authorization

Timers & real-time logic

Database design & joins

Admin dashboard design

Production-level project structure

📌 Future Enhancements

Prevent multiple exam attempts

Randomized questions per exam

Graphical analytics dashboard

Export results (CSV/PDF)

Dark / Light mode

Mobile responsive UI


View Past Exam History

Logout functionality
