# EduLibrary Project

## Overview
EduLibrary is a full-stack web application designed to manage and explore a library of categorized books. The system allows users to register, login, and explore various book genres, while administrators can manage the library's content. EduLibrary uses modern technologies like Node.js, Express, MongoDB, and JWT to provide a secure, user-friendly platform for book management and communication.

## Technologies Used

### Frontend
- **HTML**: Structure of the application.
- **CSS**: Styling to make the app responsive and user-friendly.
- **JavaScript**: Client-side scripting for interactive features.

### Backend
- **Node.js**: JavaScript runtime for building the backend.
- **Express**: Web framework for handling HTTP requests.
- **MongoDB**: NoSQL database for storing books, users, and contact messages.
- **JWT (JSON Web Token)**: Secure authentication for login and registration.
- **bcryptjs**: Library for securely hashing passwords.

## Features

### User Authentication
- **Register**: Users can create a new account with full name, email, and password.
- **Login**: Existing users can log in with email and password to access the platform.
- **JWT Authentication**: Secure user authentication via JWT tokens, which are stored in localStorage after a successful login.
- **Role-Based Access**: Two roles - User and Admin. Admins have additional permissions to manage the library's content.

### Book Management
- **View Books**: Users can browse books based on different categories such as Textbooks, Science, History, Biography, Adventure, and Fantasy.
- **Add Book**: Admins can add new books to the library by providing details like title, author, category, year, description, and cover image.
- **CRUD Operations**: Admins can create, update, and delete books from the library.

### Contact Form
- **Submit Inquiries**: Users can send messages to the admin via a contact form, providing details like name, email, subject, and message.
- **Message Storage**: All contact messages are stored in MongoDB for admin review.

## Installation and Setup

### Prerequisites
- **Node.js** (Recommended version: v16.x or higher)
- **MongoDB Atlas** account or local MongoDB instance
- **JWT Secret Key** for authentication

1. Clone the Repository
```bash
git clone https://github.com/yourusername/EduLibrary.git
cd EduLibrary
```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up the `.env` file:

    ```env
    PORT=5000
    MONGO_URI=mongodb+srv://<your-mongo-uri>
    JWT_SECRET=<your-jwt-secret>

    ```

4. Start the API Gateway:

    ```bash
    npm start
    ```

