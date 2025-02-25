# 📌 Project Management App

A powerful and intuitive project management application built with a **React** frontend and **Express** backend. Designed for seamless team collaboration, task tracking, and workspace organization.

---

## 🚀 Features

- 🔐 **User Authentication** with Google OAuth via Passport.js
- 📝 **Email/Password Registration & Login**
- 👥 **Workspace Management** with roles & permissions
- 📂 **Project Organization** within workspaces
- ✅ **Task Tracking & Management**
- 🔗 **Team Collaboration** with invite codes
- 📊 **Analytics** for workspaces & projects
- 📱 **Responsive Design** for all devices
- 🛡️ **Form Validation** using Zod

---

## 🛠️ Tech Stack

### Frontend

- **React** + **Vite** ⚡ (Fast development environment)
- **TypeScript** 🔍 (Strong type safety)
- **Tailwind CSS** 🎨 (Utility-first CSS for responsive design)
- **Radix UI** 🏗️ (Accessible UI component library)

### Backend

- **Express.js** 🚀 (Minimalist web framework for Node.js)
- **TypeScript** ✅ (Enhanced maintainability & scalability)
- **MongoDB** 🍃 (NoSQL database for flexible data storage)
- **Passport.js** 🔑 (Authentication middleware with Google OAuth)
- **Express Session** 🔄 (Session management)
- **Zod** 🛡️ (Schema validation for inputs)
- **Dotenv** 📜 (Environment variable management)

---

## 📋 Prerequisites

- **Node.js** (v16+)
- **MongoDB** (Installed & running)
- **Google OAuth Credentials** (Client ID & Secret)

---

## 🚀 Installation

1️⃣ **Clone the repository**:

```bash
git clone https://github.com/yourusername/project-management-app.git
cd project-management-app
```

2️⃣ **Install dependencies**:

```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

3️⃣ **Set up environment variables**:

Create a `.env` file in the `server` directory:

```ini
PORT=5000
NODE_ENV=development
SESSION_SECRET=your_session_secret
FRONTEND_ORIGIN=http://localhost:5173
FRONTEND_GOOGLE_CALLBACK_URL=http://localhost:5173/auth/callback
BASE_PATH=/api
MONGODB_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

4️⃣ **Start the development servers**:

```bash
# Start backend server
cd server
npm run dev

# Start frontend server
cd client
npm run dev
```

---

## 🌐 Usage

1. Open `http://localhost:5173` in your browser.
2. Sign in with Google OAuth or register using email/password.
3. Create **workspaces** and invite team members.
4. Create **projects** within workspaces.
5. Assign and manage **tasks** efficiently.
6. View **analytics** for workspaces & projects.

---

## 📁 Project Structure

### Backend Structure

```
backend/
├── src/
│   ├── @types/              # TypeScript type definitions
│   ├── config/              # Configuration files
│   │   ├── app.config.ts    # Application settings
│   │   ├── database.config.ts # MongoDB connection setup
│   │   ├── http.config.ts   # HTTP status codes
│   │   └── passport.config.ts # OAuth configuration
│   ├── controllers/         # Route handlers
│   │   ├── auth.controller.ts
│   │   ├── member.controller.ts
│   │   ├── project.controller.ts
│   │   ├── task.controller.ts
│   │   ├── user.controller.ts
│   │   └── workspace.controller.ts
│   ├── enums/               # Enumeration types
│   │   └── errorCode.enum.ts
│   ├── middlewares/         # Express middlewares
│   │   ├── asyncHandler.middleware.ts
│   │   ├── errorHandler.middleware.ts
│   │   └── isAuthenticated.middleware.ts
│   ├── models/              # MongoDB schema models
│   │   ├── account.model.ts
│   │   ├── member.model.ts
│   │   ├── projects.model.ts
│   │   ├── role-permission.model.ts
│   │   ├── task.model.ts
│   │   ├── user.model.ts
│   │   └── workspace.model.ts
│   ├── routes/              # API endpoints
│   ├── seeders/             # Database seeding scripts
│   ├── services/            # Business logic
│   ├── utils/               # Utility functions
│   │   └── appError.ts
│   ├── validations/         # Input validation schemas
│   └── index.ts             # Entry point
```

---

## 🔒 Authentication

### Supported Methods

1️⃣ **Email/Password Authentication**:

- Register and login with email/password.

2️⃣ **Google OAuth**:

- Sign in with Google credentials.

✔️ All protected routes require authentication using `isAuthenticated` middleware.

---

## 📝 API Documentation

### Base Path

All API endpoints are prefixed with `/api`.

#### 🛠️ **Authentication**

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/google` - Google OAuth login
- `GET /api/auth/google/callback` - Google OAuth callback

#### 👤 **User**

- `GET /api/user/current` - Get current user

#### 🏢 **Workspace**

- `POST /api/workspace/create/new` - Create workspace
- `GET /api/workspace/all` - Get all user workspaces
- `GET /api/workspace/:id` - Get workspace by ID
- `GET /api/workspace/members/:id` - Get workspace members
- `GET /api/workspace/analytics/:id` - Get workspace analytics
- `PUT /api/workspace/update/:id` - Update workspace
- `DELETE /api/workspace/delete/:id` - Delete workspace

#### 📂 **Projects**

- `POST /api/project/workspace/:workspaceId/create` - Create project
- `GET /api/project/workspace/:workspaceId/all` - Get projects
- `GET /api/project/:id/workspace/:workspaceId` - Get project by ID
- `PUT /api/project/:id/workspace/:workspaceId/update` - Update project
- `DELETE /api/project/:id/workspace/:workspaceId/delete` - Delete project

#### ✅ **Tasks**

- `POST /api/task/project/:projectId/create` - Create task
- `GET /api/task/workspace/:workspaceId/all` - Get tasks
- `PUT /api/task/:id/update` - Update task
- `DELETE /api/task/:id/delete` - Delete task

---

## 🤝 Contributing

Contributions are welcome! Check the [issues page](https://github.com/yourusername/project-management-app/issues) for open tasks.

---

## 📜 License

This project is **MIT Licensed**.
