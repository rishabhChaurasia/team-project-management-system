<div align="center">

# 🚀 Team Project Management System

### *Where Teams Transform Chaos into Clarity*

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)

*A modern, full-stack project management platform that empowers teams to collaborate seamlessly, track progress effortlessly, and deliver results consistently.*

[Features](#-features) • [Quick Start](#-quick-start) • [Tech Stack](#-tech-stack) • [API Docs](#-api-reference) • [Contributing](#-contributing)

</div>

---

## 🎯 What Makes This Special?

Tired of juggling multiple tools? This isn't just another project management app—it's your team's command center. Built with cutting-edge technologies and designed for real-world workflows.

```
📊 Workspaces → 🎨 Projects → ✅ Tasks → 🎉 Success
```

## ✨ Features

<table>
<tr>
<td width="50%">

### 🏢 Workspace Management
- 🔐 **Secure Invite System** - Unique codes for each workspace
- 👑 **Owner Controls** - Full administrative power
- 🤝 **Team Collaboration** - Seamless member coordination
- 🔄 **Multi-Workspace** - Manage unlimited workspaces

</td>
<td width="50%">

### 📋 Smart Task Management
- 🏷️ **Unique Task Codes** - Easy reference & tracking
- 📊 **Status Pipeline** - TODO → IN_PROGRESS → IN_REVIEW → DONE
- 🎯 **Priority Levels** - LOW, MEDIUM, HIGH, URGENT
- 📅 **Due Date Tracking** - Never miss a deadline

</td>
</tr>
<tr>
<td width="50%">

### 🎨 Project Organization
- 😊 **Emoji Icons** - Visual project identification
- 📝 **Rich Descriptions** - Context at a glance
- 🗂️ **Workspace Grouping** - Organized hierarchy
- ⚡ **Quick Actions** - CRUD operations made easy

</td>
<td width="50%">

### 🔐 Authentication & Security
- 🔑 **Local Auth** - Email/password login
- 🌐 **Google OAuth** - One-click sign-in
- 🔒 **Session Management** - Secure cookie-based auth
- 📧 **Password Reset** - Email-based recovery

</td>
</tr>
</table>

### 🎨 Modern UI/UX
- 🌓 **Dark/Light Mode** - Easy on the eyes
- 📱 **Fully Responsive** - Works on all devices
- ♿ **Accessible** - Built with Radix UI primitives
- ⚡ **Lightning Fast** - Optimized with RTK Query caching

---

## 🛠️ Tech Stack

<div align="center">

### Frontend Arsenal

| Technology | Purpose | Why We Love It |
|------------|---------|----------------|
| ⚛️ **React 19** | UI Framework | Latest features, best performance |
| 📘 **TypeScript** | Type Safety | Catch bugs before they happen |
| ⚡ **Vite** | Build Tool | Lightning-fast HMR |
| 🔄 **Redux Toolkit** | State Management | Predictable state with RTK Query |
| 🎨 **Tailwind CSS** | Styling | Utility-first, highly customizable |
| 🧩 **Radix UI** | Components | Accessible, unstyled primitives |
| 🎯 **React Hook Form** | Forms | Performant form validation |
| ✅ **Zod** | Validation | Type-safe schema validation |

### Backend Powerhouse

| Technology | Purpose | Why We Love It |
|------------|---------|----------------|
| 🟢 **Node.js** | Runtime | JavaScript everywhere |
| 🚂 **Express** | Web Framework | Fast, minimalist, battle-tested |
| 🍃 **MongoDB** | Database | Flexible, scalable NoSQL |
| 🔐 **Passport.js** | Authentication | Multiple strategies support |
| 📧 **Nodemailer** | Email Service | Reliable email delivery |
| 🔒 **Bcrypt** | Password Hashing | Industry-standard security |

</div>

---

## 📁 Project Architecture

```
team-project-management-system/
│
├── 🎨 client/                    # Frontend Magic
│   ├── src/
│   │   ├── components/          # 🧩 Reusable UI components
│   │   │   └── ui/              # 🎭 Radix UI components
│   │   ├── pages/               # 📄 Route pages
│   │   │   ├── auth/            # 🔐 Authentication pages
│   │   │   ├── dashboard/       # 📊 Main app pages
│   │   │   └── invite/          # 📨 Workspace invites
│   │   ├── redux/               # 🔄 State management
│   │   │   ├── rtk-query/       # 🌐 API endpoints
│   │   │   └── slices/          # 📦 Redux slices
│   │   ├── layout/              # 🏗️ Layout components
│   │   ├── hooks/               # 🪝 Custom React hooks
│   │   ├── lib/                 # 🛠️ Utilities
│   │   └── types/               # 📘 TypeScript types
│   └── package.json
│
└── 🔧 server/                    # Backend Power
    ├── src/
    │   ├── config/              # ⚙️ App configuration
    │   ├── controllers/         # 🎮 Request handlers
    │   ├── services/            # 💼 Business logic
    │   ├── models/              # 📊 Database schemas
    │   ├── routes/              # 🛣️ API routes
    │   ├── middlewares/         # 🔀 Express middlewares
    │   ├── validation/          # ✅ Request validation
    │   ├── utils/               # 🛠️ Helper functions
    │   ├── enums/               # 📋 Enumerations
    │   └── seeders/             # 🌱 Database seeders
    └── package.json
```

---

## 🚀 Quick Start

### Prerequisites

```bash
✅ Node.js v18+
✅ MongoDB (local or Atlas)
✅ npm or yarn
✅ A cup of coffee ☕
```

### ⚡ Lightning Setup

**1️⃣ Clone & Navigate**
```bash
git clone <repository-url>
cd team-project-management-system
```

**2️⃣ Install Dependencies**
```bash
# Frontend
cd client && npm install

# Backend
cd ../server && npm install
```

**3️⃣ Environment Setup**

Create `server/.env`:
```env
# 🌍 Server Config
NODE_ENV=development
PORT=5000
BASE_PATH=/api/v1
FRONTEND_ORIGIN=http://localhost:5173

# 🗄️ Database
MONGO_URI=mongodb://localhost:27017/project-management

# 🔐 Security
SESSION_SECRET=your-super-secret-session-key

# 🌐 Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/v1/auth/google/callback

# 📧 Email Service
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

Create `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api/v1
```

**4️⃣ Seed Database**
```bash
cd server
npm run seed
```

**5️⃣ Launch 🚀**

```bash
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend
cd client && npm run dev
```

**6️⃣ Open & Enjoy**
- 🎨 Frontend: http://localhost:5173
- 🔧 Backend: http://localhost:5000

---

## 📡 API Reference

### 🔐 Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/auth/register` | 📝 Create new account |
| `POST` | `/api/v1/auth/login` | 🔓 Sign in |
| `POST` | `/api/v1/auth/logout` | 👋 Sign out |
| `POST` | `/api/v1/auth/forgot-password` | 🔑 Request password reset |
| `POST` | `/api/v1/auth/reset-password` | 🔄 Reset password |
| `GET` | `/api/v1/auth/google` | 🌐 Google OAuth login |
| `GET` | `/api/v1/auth/google/callback` | ↩️ OAuth callback |

### 👤 User Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/user/profile` | 👁️ Get user profile |
| `PUT` | `/api/v1/user/profile` | ✏️ Update profile |

### 🏢 Workspaces

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/workspace` | ➕ Create workspace |
| `GET` | `/api/v1/workspace` | 📋 List all workspaces |
| `GET` | `/api/v1/workspace/:id` | 🔍 Get workspace details |
| `PUT` | `/api/v1/workspace/:id` | ✏️ Update workspace |
| `DELETE` | `/api/v1/workspace/:id` | 🗑️ Delete workspace |
| `POST` | `/api/v1/workspace/:id/reset-invite` | 🔄 Reset invite code |

### 👥 Members

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/member/invite` | 📨 Invite member |
| `GET` | `/api/v1/member/workspace/:workspaceId` | 👥 List members |
| `DELETE` | `/api/v1/member/:id` | ❌ Remove member |

### 🎨 Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/project` | ➕ Create project |
| `GET` | `/api/v1/project/workspace/:workspaceId` | 📋 List projects |
| `GET` | `/api/v1/project/:id` | 🔍 Get project details |
| `PUT` | `/api/v1/project/:id` | ✏️ Update project |
| `DELETE` | `/api/v1/project/:id` | 🗑️ Delete project |

### ✅ Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/task` | ➕ Create task |
| `GET` | `/api/v1/task/workspace/:workspaceId` | 📋 List workspace tasks |
| `GET` | `/api/v1/task/project/:projectId` | 📋 List project tasks |
| `GET` | `/api/v1/task/:id` | 🔍 Get task details |
| `PUT` | `/api/v1/task/:id` | ✏️ Update task |
| `DELETE` | `/api/v1/task/:id` | 🗑️ Delete task |

---

## 🎓 How It Works

### 🏢 Workspace Flow
```
1. Create Workspace → 2. Get Invite Code → 3. Share with Team → 4. Collaborate!
```

Each workspace is an isolated environment with:
- 🔐 Unique invite code for secure onboarding
- 👑 Owner with full administrative rights
- 👥 Members with collaboration permissions
- 🎨 Multiple projects and tasks

### 📋 Task Lifecycle
```
TODO → IN_PROGRESS → IN_REVIEW → DONE
```

Tasks support:
- 🏷️ Auto-generated unique codes (e.g., `TASK-1234`)
- 🎯 Four priority levels (LOW, MEDIUM, HIGH, URGENT)
- 👤 Assignment to team members
- 📅 Due date tracking
- 📝 Rich descriptions

### 🔐 Authentication Strategy
```
Local Auth ←→ Session Management ←→ Google OAuth
```

- 🔒 Bcrypt-hashed passwords
- 🍪 Secure HTTP-only cookies
- ⏱️ 24-hour session duration
- 📧 Email-based password recovery

---

## 🎯 Available Scripts

### 🎨 Client Commands

```bash
npm run dev      # 🚀 Start dev server (Vite HMR)
npm run build    # 📦 Production build
npm run preview  # 👀 Preview production build
npm run lint     # 🔍 Run ESLint
```

### 🔧 Server Commands

```bash
npm run dev      # 🚀 Start dev server (hot reload)
npm run build    # 📦 Compile TypeScript
npm start        # 🏭 Start production server
npm run seed     # 🌱 Seed database with roles
```

---

## 🤝 Contributing

We love contributions! Here's how to get started:

```bash
# 1️⃣ Fork the repo
# 2️⃣ Create your feature branch
git checkout -b feature/amazing-feature

# 3️⃣ Commit your changes
git commit -m '✨ Add amazing feature'

# 4️⃣ Push to the branch
git push origin feature/amazing-feature

# 5️⃣ Open a Pull Request
```

### 📝 Commit Convention
- ✨ `feat:` New feature
- 🐛 `fix:` Bug fix
- 📚 `docs:` Documentation
- 💄 `style:` Formatting
- ♻️ `refactor:` Code restructuring
- ⚡ `perf:` Performance improvements
- ✅ `test:` Adding tests

---

## 📄 License

This project is licensed under the **ISC License** - see the LICENSE file for details.

---

## 💬 Support & Community

<div align="center">

**Need Help?**

📧 Email: support@example.com  
🐛 Issues: [GitHub Issues](https://github.com/your-repo/issues)  
💬 Discussions: [GitHub Discussions](https://github.com/your-repo/discussions)

---

### ⭐ If you find this project useful, give it a star!

**Built with ❤️ by developers, for developers**

</div>
