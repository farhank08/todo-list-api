# Todo List API

A clean and modular **Node.js + Express** backend application featuring **session-based authentication**, **MongoDB persistence**, and **protected CRUD operations** for managing todos. Built to demonstrate backend engineering fundamentals including authentication, data modeling, routing structure, and API design.

---

## 🚀 Key Features

- User registration, login, and logout
- Secure session-based authentication (no JWT)
- Protected CRUD API for todo items
- Pagination support for efficient data retrieval
- MongoDB + Mongoose data modeling
- Clean separation of controllers, routers, and services

---

## ⚙️ Quick Start

```
npm install
```

Create a `.env` file:

```
MONGODB_URI=your_uri
SESSION_SECRET_KEY=your_secret
PORT=5000
```

Start the server:

```
npm start
```

Demo URL:
http://localhost:5000/

API Base URL:
http://localhost:5000/api

---

## 📘 API Overview

### User Authentication (Public)

| Method | Endpoint      | Description   |
| ------ | ------------- | ------------- |
| POST   | /api/register | Register user |
| POST   | /api/login    | Login user    |
| POST   | /api/logout   | Logout user   |

### Todos (Authenticated)

| Method | Endpoint       | Description    |
| ------ | -------------- | -------------- |
| GET    | /api/todos     | List todos     |
| GET    | /api/todos/:id | Get todo by ID |
| POST   | /api/todos     | Create todo    |
| PATCH  | /api/todos/:id | Update todo    |
| DELETE | /api/todos/:id | Delete todo    |

---

## 🧱 Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- express-session
- bcrypt
- dotenv

---

## 📄 Summary

This project demonstrates secure authentication, data validation, routing architecture, and REST API best practices. It is designed to be clean, readable, and aligned with professional backend standards. Project from https://roadmap.sh/projects/todo-list-api
