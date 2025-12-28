🎓 Online Quiz Portal

A full-stack Online Quiz Portal with User and Admin roles, built using React, PHP, and MySQL.
This project allows users to attempt timed exams and admins to manage exams, questions, users, and results through a secure dashboard.

🚀 Features
👨‍🎓 User Side

-> User Registration & Login

-> View Available Exams

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

-> React.js

-> JavaScript

-> HTML5

-> CSS (Inline Styling)

-> Axios

-> React Router DOM 

Backend

-> PHP (REST APIs)

-> MySQL

-> Apache (XAMPP)

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

1. User & Admin sessions stored using localStorage

2. Protected routes prevent unauthorized access

3. Blocked users cannot login

4. Auto logout clears session

📸 Screens Implemented

1.Landing Page

2.User Login

3.Admin Login

4.Available Exams (Card Layout)

5.Exam Interface (Timer)

6.Result Page

7.History Page

8.Admin Dashboard

9.Add Questions Page

10.View Results Page

🧠 Learning Outcomes

1. Full-stack development using React + PHP

2. REST API integration

3. Authentication & authorization

4. Timers & real-time logic

5. Database design & joins

6. Admin dashboard design

7. Production-level project structure

📌 Future Enhancements

1. Prevent multiple exam attempts

2. Randomized questions per exam

3. Graphical analytics dashboard

4. Export results (CSV/PDF)

5. Dark / Light mode

6. Mobile responsive UI

7. View Past Exam History

8. Logout functionality
