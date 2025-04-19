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
- **User Authentication**: Register, login, and role-based access control
- **Book Management**: CRUD operations for books with image uploads
- **Admin Dashboard**: Full management capabilities
- **Contact System**: User messaging to administrators

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
Open `index.html` in your browser (or deploy via live server/Vercel/Netlify).

---

# API Documentation

## 🔐 Authentication

| Method | Endpoint              | Description                 | Access       |
|--------|-----------------------|-----------------------------|--------------|
| POST   | `/api/auth/register`  | Register a new user         | Public       |
| POST   | `/api/auth/login`     | Login and receive JWT token | Public       |

## 👥 User Management

| Method | Endpoint            | Description                     | Access       |
|--------|---------------------|---------------------------------|--------------|
| GET    | `/api/users/profile` | Get logged-in user's profile    | Authenticated |
| PUT    | `/api/users/profile/:userId` | Update user profile            | Authenticated |
| GET    | `/api/users`     | Get all users                  | Admin        |
| POST   | `/api/users`        | Create new user                | Admin        |
| PUT    | `/api/users/:userId` | Update user details            | Admin        |
| DELETE | `/api/users/:userId` | Delete user                    | Admin        |

## 📚 Book Management

| Method | Endpoint                  | Description                     | Access       |
|--------|---------------------------|---------------------------------|--------------|
| GET    | `/api/books`              | Get all books                  | Public       |
| GET    | `/api/books/:id`          | Get book by ID                 | Admin        |
| POST   | `/api/books`              | Create new book                | Admin        |
| PUT    | `/api/books/:id`          | Update book details            | Admin        |
| DELETE | `/api/books/:id`          | Delete book by ID              | Admin        |
| DELETE | `/api/books/title/:title` | Delete book by title           | Admin        |

## 📬 Contact System

| Method | Endpoint        | Description                     | Access       |
|--------|-----------------|---------------------------------|--------------|
| POST   | `/api/contact`  | Submit contact form             | Public       |
| GET    | `/api/contact`  | Get all contact messages        | Admin        |

### Access Levels:
- **Public**: No authentication required
- **Authenticated**: Requires valid JWT token
- **Admin**: Requires admin privileges (role: "admin")