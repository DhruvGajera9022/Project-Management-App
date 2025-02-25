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
git clone https://github.com/DhruvGajera9022/Project-Management-App.git
cd Project-Management-App
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

MONGO_URI=your_mongodb_connection_string

SESSION_SECRET=your_session_secret
SESSION_EXPIRES_IN=1d

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=your_google_callback_url

FRONTEND_ORIGIN=http://localhost:5173
FRONTEND_GOOGLE_CALLBACK_URL=http://localhost:5173/auth/callback
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
│   ├── controllers/         # Route handlers
│   ├── enums/               # Enumeration types
│   ├── middlewares/         # Express middlewares
│   ├── models/              # MongoDB schema models
│   ├── routes/              # API endpoints
│   ├── seeders/             # Database seeding scripts
│   ├── services/            # Business logic
│   ├── utils/               # Utility functions
│   ├── validations/         # Input validation schemas
│   └── index.ts             # Entry point

client/
├── src/
│   ├── assets/        # Static assets (images, icons, etc.)
│   ├── components/    # Reusable UI components
│   ├── constant/      # Constants and static data
│   ├── context/       # React context for state management
│   ├── hoc/           # Higher-order components
│   ├── hooks/         # Custom React hooks
│   ├── layout/        # Layout components (header, sidebar, etc.)
│   ├── lib/           # Utility functions and libraries
│   ├── page/          # Page components for different routes
│   ├── routes/        # React Router configuration
│   ├── types/         # TypeScript type definitions
│   └── App.tsx        # Main application entry point
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
