# EduLibrary Project

## 📚 Overview
EduLibrary is a full-stack web application designed to manage and explore a digital library of categorized books. It supports **user registration**, **role-based login**, **interactive browsing**, and **admin book management**. It is built using modern technologies such as **Node.js**, **Express**, **MongoDB**, and **AWS S3**, with **JWT-based authentication** for security.

---

## ⚙️ Technologies Used

### Frontend
- **HTML** – Structure of the web interface
- **CSS** – Responsive and clean styling
- **JavaScript** – Dynamic interactivity, fetch calls, and user session handling

### Backend
- **Node.js** – JavaScript runtime for server-side logic
- **Express.js** – HTTP routing and middleware handling
- **MongoDB** – NoSQL database to store users, books, and messages
- **AWS S3** – Storage for book cover images
- **Sharp** – Image compression before uploading to S3
- **JWT (JSON Web Token)** – Secure authentication

---

## ✨ Features

### 🔐 User Authentication
- **Register**: Create a new user account with name, email, and password.
- **Login**: Authenticate via email and password.
- **Role-Based Access**:
  - **User**: Can browse books, view book details, and contact admin.
  - **Admin**: Has full access to book management (add, edit, delete).

### 📚 Book Management
- **Categories**: Browse books by genre - Textbooks, Science, History, Biography, Adventure, Fantasy.
- **Admin Dashboard**:
  - Add new books with cover image (uploaded to S3)
  - Edit existing books
  - Delete books
  - Preview image before upload
- **User View**: user can view, search, and filter books.

### 📬 Contact Page
- Submit name, email, subject, and message via contact form.
- All messages are stored in MongoDB for admin review.

### 👤 User Profile Page
- Users can view and edit their profile.
- Admin accounts can only be created manually and redirected to admin dashboard upon login.

---

## 🧑‍💻 Installation and Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas or local MongoDB instance
- AWS S3 credentials for image storage
- JWT Secret key

### Steps

1. **Clone the repository**

```bash
git clone https://github.com/Sovatharothh/EduLibrary.git
cd EduLibrary
```

2. **Install backend dependencies**

```bash
npm install
```

3. **Create your `.env` file**

```env
PORT=5000
MONGO_URI=mongodb+srv://<your-mongo-uri>
JWT_SECRET=<your-jwt-secret>
AWS_ACCESS_KEY_ID=<your-AWS_ACCESS_KEY_ID>
AWS_SECRET_ACCESS_KEY=<your-AWS_SECRET_ACCESS_KEY>
AWS_REGION=<your-AWS_REGION>
AWS_S3_BUCKET_NAME=<your-AWS_S3_BUCKET_NAME>
```

4. **Start the server**

```bash
npm start
```
5. **Open frontend**
Navigate to the `frontend` folder and open `index.html` in your browser.



## 📡 API Endpoint Table

| Method | Endpoint                          | Description                             | Access         |
|--------|-----------------------------------|-----------------------------------------|----------------|
| POST   | `/api/auth/register`              | Register a new user                     | Public         |
| POST   | `/api/auth/login`                 | Login and receive JWT token             | Public         |
| GET    | `/api/user/profile`               | Get logged-in user's profile            | Authenticated  |
| PUT    | `/api/user/profile`               | Update logged-in user's profile         | Authenticated  |
| PUT    | `/api/user/change-password`       | Change user password                    | Authenticated  |
| GET    | `/api/user/all`                   | Get all users                           | Admin          |
| DELETE | `/api/user/delete/:fullName`      | Delete user by full name                | Admin          |
| POST   | `/api/books`                      | Create a new book                       | Admin          |
| GET    | `/api/books`                      | Get all books                           | Public         |
| GET    | `/api/books/:id`                  | Get book by ID                          | Public         |
| PUT    | `/api/books/:id`                  | Update book details                     | Admin          |
| DELETE | `/api/books/:id`                  | Delete book by ID                       | Admin          |
| POST   | `/api/contact`                    | Submit contact form                     | Public         |
| GET    | `/api/contact`                    | Get all contact messages                | Admin          |
