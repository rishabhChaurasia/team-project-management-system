# Team Project Management System - Server

A Node.js/Express.js backend API for a team project management system with authentication, workspace management, and task tracking.

## Features

- **Authentication**: Google OAuth 2.0 and local authentication with Passport.js
- **Workspace Management**: Create and manage workspaces with role-based permissions
- **Project Management**: Create projects within workspaces
- **Task Management**: Create, assign, and track tasks
- **Role-Based Access Control**: Different permission levels for workspace members
- **Analytics**: Workspace analytics and reporting

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js (Google OAuth 2.0, Local Strategy)
- **Validation**: Zod
- **Session Management**: Express Session

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB database
- Google OAuth credentials (for Google authentication)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp src/.env.example .env
```

3. Configure your `.env` file:
```env
NODE_ENV=development
PORT=5000
BASE_PATH=/api
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
FRONTEND_ORIGIN=http://localhost:3000
FRONTEND_GOOGLE_CALLBACK_URL=http://localhost:3000/auth/callback
```

4. Seed the database with default roles:
```bash
npm run seed
```

5. Start the development server:
```bash
npm run dev
```

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run seed` - Seed database with default roles

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/google` - Google OAuth login
- `POST /api/auth/logout` - Logout user

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

### Workspace Management
- `POST /api/workspace` - Create workspace
- `GET /api/workspace` - Get user workspaces
- `GET /api/workspace/:id` - Get workspace by ID
- `PUT /api/workspace/:id` - Update workspace
- `DELETE /api/workspace/:id` - Delete workspace
- `GET /api/workspace/:id/members` - Get workspace members
- `GET /api/workspace/:id/analytics` - Get workspace analytics
- `PUT /api/workspace/:id/member/role` - Change member role

### Project Management
- `POST /api/project` - Create project
- `GET /api/project/workspace/:workspaceId` - Get workspace projects
- `GET /api/project/:id` - Get project by ID
- `PUT /api/project/:id` - Update project
- `DELETE /api/project/:id` - Delete project

### Task Management
- `POST /api/task` - Create task
- `GET /api/task/project/:projectId` - Get project tasks
- `GET /api/task/:id` - Get task by ID
- `PUT /api/task/:id` - Update task
- `DELETE /api/task/:id` - Delete task

### Member Management
- `POST /api/member/invite` - Invite member to workspace
- `POST /api/member/join` - Join workspace
- `DELETE /api/member/:id` - Remove member

## Project Structure

```
src/
├── config/          # Configuration files
├── controllers/     # Route controllers
├── enums/          # TypeScript enums
├── middlewares/    # Express middlewares
├── models/         # Mongoose models
├── routes/         # API routes
├── seeders/        # Database seeders
├── services/       # Business logic
├── utils/          # Utility functions
├── validation/     # Zod validation schemas
└── index.ts        # Application entry point
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `5000` |
| `BASE_PATH` | API base path | `/api` |
| `MONGO_URI` | MongoDB connection string | Required |
| `SESSION_SECRET` | Session secret key | Required |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Required |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | Required |
| `GOOGLE_CALLBACK_URL` | Google OAuth callback URL | Required |
| `FRONTEND_ORIGIN` | Frontend URL for CORS | `localhost` |

## Role-Based Permissions

The system includes role-based access control with the following permissions:
- View Only
- Edit Workspace
- Delete Workspace
- Change Member Role
- Manage Projects
- Manage Tasks

## Development

The server uses TypeScript with hot reload for development. All routes are protected with authentication middleware except for auth routes.

## License

ISC