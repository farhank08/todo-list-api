# Todo List API

A Node.js **Todo List API** with user authentication that allows users to register, log in, and manage personal todo items. The application uses **Express**, **MongoDB (Mongoose)**, and serves both **JSON API endpoints** and **HTML views** for interacting with todos through the browser.

Project from https://roadmap.sh/projects/todo-list-api

## Prerequisites

- Node.js runtime
- Express framework
- MongoDB (local instance or managed service)

## Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd todo-list-api
```

2. **Install dependencies**

```bash
npm install
```

## Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

- `PORT` – Port the server runs on
- `MONGODB_URI` – MongoDB connection string
- `JWT_SECRET` – Secret used for signing authentication tokens

## Running the Application

Start the server:

```bash
npm start
```

The application will be available at:

```
http://localhost:3000
```

## Authentication

- Users can register and log in using the authentication API
- Passwords are hashed using **bcrypt**
- Authentication state is enforced using middleware
- Protected routes require a valid authenticated session

## API Endpoints

### Users

| Method | Endpoint              | Description         |
| ------ | --------------------- | ------------------- |
| POST   | `/api/users/register` | Register a new user |
| POST   | `/api/users/login`    | Authenticate a user |

### Todos

All todo routes require authentication.

| Method | Endpoint         | Description                              |
| ------ | ---------------- | ---------------------------------------- |
| GET    | `/api/todos`     | Get all todos for the authenticated user |
| POST   | `/api/todos`     | Create a new todo                        |
| PUT    | `/api/todos/:id` | Update a todo                            |
| DELETE | `/api/todos/:id` | Delete a todo                            |

## Views

The server also serves HTML pages for interacting with the application:

- Login page
- Todo list page

These views interact with the API via client-side JavaScript.

## Notes

- MongoDB connection is initialized on server startup
- Authentication and authorization logic is centralized in middleware
- Designed as a simple full-stack example combining API and views

## License

This project is licensed under the ISC License.
