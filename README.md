# Project Management App

A comprehensive project management application built with a React frontend and Express backend.

## 🚀 Features

- User authentication with Google OAuth via Passport.js
- User registration and login with email/password
- Workspace management with member roles
- Project organization within workspaces
- Task tracking and management
- Team collaboration with invite codes
- Analytics for workspaces and projects
- Responsive design for all devices
- Form validation with Zod

## 🛠️ Tech Stack

### Frontend

- **React** + **Vite**: Fast and efficient development environment
- **TypeScript**: Type safety and better development experience
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Radix UI**: Accessible component primitives

### Backend

- **Express.js**: Fast, unopinionated web framework for Node.js
- **TypeScript**: Enhanced code quality and maintainability
- **MongoDB**: NoSQL database for flexible data storage
- **Passport.js**: Authentication middleware with Google OAuth strategy
- **Express Session**: Session management
- **Zod**: TypeScript-first schema validation
- **Dotenv**: Environment variable management

## 📋 Prerequisites

- Node.js (v16+)
- MongoDB
- Google OAuth credentials

## 🚀 Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/project-management-app.git
cd project-management-app
```

2. Install dependencies:

```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

3. Set up environment variables:
   Create a `.env` file in the server directory with the following variables:

```
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

4. Start the development servers:

```bash
# Start backend server
cd server
npm run dev

# Start frontend server
cd client
npm run dev
```

## 🌐 Usage

1. Navigate to `http://localhost:5173` in your browser
2. Sign in with your Google account or register with email/password
3. Create workspaces and invite team members using invite codes
4. Create and manage projects within workspaces
5. Create and assign tasks
6. View analytics for workspaces and projects

## 📁 Project Structure

### Backend Structure

```
backend/
├── src/
│   ├── @types/              # TypeScript type definitions
│   ├── config/              # Application configuration
│   │   ├── app.config.ts    # App settings
│   │   ├── database.config.ts # MongoDB connection
│   │   ├── http.config.ts   # HTTP status codes
│   │   └── passport.config.ts # Passport auth setup
│   ├── controllers/         # Request handlers
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
│   ├── routes/              # API route definitions
│   │   ├── auth.routes.ts
│   │   ├── member.routes.ts
│   │   ├── projects.routes.ts
│   │   ├── task.routes.ts
│   │   ├── user.routes.ts
│   │   └── workspace.routes.ts
│   ├── seeders/             # Database seed scripts
│   ├── services/            # Business logic layer
│   ├── utils/               # Utility functions
│   │   └── appError.ts
│   ├── validations/         # Input validation schemas
│   └── index.ts             # Application entry point
```

## 🔒 Authentication

This application supports multiple authentication methods:

1. **Email/Password Authentication**:

   - Register with email and password
   - Login with registered credentials

2. **Google OAuth**:
   - Sign in with your Google account
   - Automatic profile creation

All protected routes are secured with the `isAuthenticated` middleware to ensure only authenticated users can access them.

## 📝 API Documentation

### Base Path

All API endpoints are prefixed with the BASE_PATH defined in your environment variables (default: `/api`).

### Authentication Routes

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: User login
- `POST /api/auth/logout`: User logout
- `GET /api/auth/google`: Initiate Google OAuth flow
- `GET /api/auth/google/callback`: Google OAuth callback

### User Routes

- `GET /api/user/current`: Get current user information

### Workspace Routes

- `POST /api/workspace/create/new`: Create a new workspace
- `GET /api/workspace/all`: Get all workspaces the user is a member of
- `GET /api/workspace/:id`: Get workspace by ID
- `GET /api/workspace/members/:id`: Get all members of a workspace
- `GET /api/workspace/analytics/:id`: Get analytics for a workspace
- `PUT /api/workspace/change/member/role/:id`: Change a member's role in a workspace
- `PUT /api/workspace/update/:id`: Update workspace details
- `DELETE /api/workspace/delete/:id`: Delete a workspace

### Member Routes

- `POST /api/member/workspace/:inviteCode/join`: Join a workspace using an invite code

### Project Routes

- `POST /api/project/workspace/:workspaceId/create`: Create a new project
- `GET /api/project/workspace/:workspaceId/all`: Get all projects in a workspace
- `GET /api/project/:id/workspace/:workspaceId`: Get project by ID within a workspace
- `GET /api/project/:id/workspace/:workspaceId/analytics`: Get project analytics
- `PUT /api/project/:id/workspace/:workspaceId/update`: Update a project
- `DELETE /api/project/:id/workspace/:workspaceId/delete`: Delete a project

### Task Routes

- `POST /api/task/project/:projectId/workspace/:workspaceId/create`: Create a new task
- `GET /api/task/workspace/:workspaceId/all`: Get all tasks in a workspace
- `GET /api/task/:id/project/:projectId/workspace/:workspaceId`: Get task by ID
- `PUT /api/task/:id/project/:projectId/workspace/:workspaceId/update`: Update a task
- `DELETE /api/task/:id/workspace/:workspaceId/delete`: Delete a task

## 🔧 Architecture

The application follows a layered architecture pattern:

1. **Routes**: Define API endpoints and map them to controllers
2. **Controllers**: Handle HTTP requests and responses
3. **Services**: Contain business logic and interact with models
4. **Models**: Define data structure and interact with the database
5. **Validations**: Ensure data integrity using Zod schemas
6. **Middlewares**: Process requests before they reach route handlers
7. **Utils**: Provide helper functions and custom error classes

This separation of concerns makes the codebase more maintainable and testable.

## 🤝 Contributing

Contributions, issues and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/project-management-app/issues).

## 📜 License

This project is [MIT](LICENSE) licensed.
