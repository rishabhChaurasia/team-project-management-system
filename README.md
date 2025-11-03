# Team Project Management System

A full-stack project management application built with React, TypeScript, Node.js, Express, and MongoDB. This system enables teams to collaborate on projects, manage tasks, and organize workspaces efficiently.

## Features

- **Workspace Management**: Create and manage multiple workspaces with invite-based member access
- **Project Organization**: Create projects within workspaces with emoji icons and descriptions
- **Task Management**: Full CRUD operations for tasks with status tracking, priority levels, and assignments
- **Team Collaboration**: Invite members to workspaces, assign tasks, and manage team roles
- **Authentication**: Secure authentication with local and Google OAuth strategies
- **Role-Based Access Control**: Granular permissions for workspace owners and members
- **Real-time Updates**: Redux Toolkit Query for efficient state management and caching
- **Responsive UI**: Modern, accessible interface built with Radix UI and Tailwind CSS

## Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for fast development and building
- **Redux Toolkit** with RTK Query for state management
- **React Router** for navigation
- **Radix UI** for accessible component primitives
- **Tailwind CSS** for styling
- **React Hook Form** with Zod validation
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **Passport.js** for authentication (Local & Google OAuth)
- **Express Session** for session management
- **Nodemailer** for email notifications
- **Zod** for validation
- **Bcrypt** for password hashing

## Project Structure

```
team-project-management-system/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── layout/        # Layout components
│   │   ├── lib/           # Utility functions
│   │   ├── pages/         # Page components
│   │   ├── redux/         # Redux store and API slices
│   │   └── types/         # TypeScript type definitions
│   └── package.json
│
└── server/                # Backend application
    ├── src/
    │   ├── config/        # Configuration files
    │   ├── controllers/   # Route controllers
    │   ├── enums/         # Enumerations
    │   ├── middlewares/   # Express middlewares
    │   ├── models/        # Mongoose models
    │   ├── routes/        # API routes
    │   ├── seeders/       # Database seeders
    │   ├── services/      # Business logic
    │   ├── utils/         # Utility functions
    │   └── validation/    # Request validation schemas
    └── package.json
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd team-project-management-system
```

2. **Install dependencies**

Frontend:
```bash
cd client
npm install
```

Backend:
```bash
cd server
npm install
```

3. **Environment Configuration**

Create `.env` file in the `server` directory:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/project-management
SESSION_SECRET=your-session-secret
FRONTEND_ORIGIN=http://localhost:5173
BASE_PATH=/api/v1

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/v1/auth/google/callback

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-email-password
```

Create `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5000/api/v1
```

4. **Seed the database**
```bash
cd server
npm run seed
```

5. **Run the application**

Backend:
```bash
cd server
npm run dev
```

Frontend:
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/logout` - Logout user
- `POST /api/v1/auth/forgot-password` - Request password reset
- `POST /api/v1/auth/reset-password` - Reset password
- `GET /api/v1/auth/google` - Google OAuth login
- `GET /api/v1/auth/google/callback` - Google OAuth callback

### User
- `GET /api/v1/user/profile` - Get user profile
- `PUT /api/v1/user/profile` - Update user profile

### Workspace
- `POST /api/v1/workspace` - Create workspace
- `GET /api/v1/workspace` - Get all workspaces
- `GET /api/v1/workspace/:id` - Get workspace by ID
- `PUT /api/v1/workspace/:id` - Update workspace
- `DELETE /api/v1/workspace/:id` - Delete workspace
- `POST /api/v1/workspace/:id/reset-invite` - Reset invite code

### Members
- `POST /api/v1/member/invite` - Invite member to workspace
- `GET /api/v1/member/workspace/:workspaceId` - Get workspace members
- `DELETE /api/v1/member/:id` - Remove member

### Projects
- `POST /api/v1/project` - Create project
- `GET /api/v1/project/workspace/:workspaceId` - Get workspace projects
- `GET /api/v1/project/:id` - Get project by ID
- `PUT /api/v1/project/:id` - Update project
- `DELETE /api/v1/project/:id` - Delete project

### Tasks
- `POST /api/v1/task` - Create task
- `GET /api/v1/task/workspace/:workspaceId` - Get workspace tasks
- `GET /api/v1/task/project/:projectId` - Get project tasks
- `GET /api/v1/task/:id` - Get task by ID
- `PUT /api/v1/task/:id` - Update task
- `DELETE /api/v1/task/:id` - Delete task

## Key Features Explained

### Workspace System
- Each workspace has a unique invite code for member onboarding
- Workspace owners have full control over settings and members
- Members can collaborate on projects and tasks within the workspace

### Task Management
- Tasks have unique codes for easy reference
- Support for multiple statuses: TODO, IN_PROGRESS, IN_REVIEW, DONE
- Priority levels: LOW, MEDIUM, HIGH, URGENT
- Task assignment to team members
- Due date tracking

### Authentication Flow
- Local authentication with email/password
- Google OAuth integration
- Password reset via email
- Session-based authentication with secure cookies

## Scripts

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Server
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run seed` - Seed database with initial data

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

For support, email support@example.com or open an issue in the repository.
