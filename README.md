# Planify — Enterprise Planning Platform

> 📊 Robust full-stack planning application with modern 3D glassmorphism UI & scalable architecture

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Angular](https://img.shields.io/badge/Angular-DD0031?style=flat-square&logo=angular&logoColor=white)](https://angular.io/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-13AA52?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)

## 🎯 Overview

Planify is an **enterprise-grade planning architecture** that integrates:
- 🎨 **Strictly typed Angular frontend** with modern 3D glassmorphism UI
- ⚡ **Scalable Node.js/Express backend** with TypeScript
- 🗄️ **MongoDB database** with reactive state management
- 🔒 **Secure RESTful API** with authentication & authorization

Perfect for teams managing projects, tasks, timelines, and resource allocation.

### Key Features
✅ **Responsive Dashboard** — Real-time planning visualization  
✅ **Project Management** — Create, organize, and track projects  
✅ **Task Management** — Assign tasks, set deadlines, track progress  
✅ **Team Collaboration** — Multi-user support with role-based access  
✅ **Modern UI** — 3D glassmorphism design paradigm  
✅ **Reactive State** — Angular state management with RxJS  
✅ **RESTful API** — Clean, documented API endpoints  

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────┐
│     Frontend (Angular 21, TypeScript)        │
│  - Strictly Typed Components                 │
│  - RxJS State Management                     │
│  - 3D Glassmorphism UI Design                │
│  - Responsive & Accessible                   │
│         (port 4200)                          │
└─────────────────┬──────────────────────────┘
                  │ REST API + JWT
                  ▼
┌──────────────────────────────────────────────┐
│   Backend (Node.js + Express, TypeScript)    │
│  - RESTful API Endpoints                     │
│  - JWT Authentication                        │
│  - Request Validation & Error Handling       │
│  - Business Logic & Services                 │
│         (port 5000)                          │
└─────────────────┬──────────────────────────┘
                  │ Mongoose ODM
                  ▼
         ┌────────────────┐
         │   MongoDB      │
         │  Collections   │
         │  - users       │
         │  - projects    │
         │  - tasks       │
         │  - timelines   │
         └────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Angular 21, TypeScript, Tailwind CSS | Modern SPA with reactive UI |
| **State Management** | RxJS Observables | Real-time reactive state |
| **Backend** | Node.js 20+, Express.js, TypeScript | Scalable RESTful API |
| **Database** | MongoDB, Mongoose | NoSQL document storage |
| **Authentication** | JWT tokens, bcrypt | Secure user management |
| **Deployment** | Docker, Docker Compose | Containerized deployments |
| **Testing** | Vitest, Jasmine | Unit & E2E testing |

---

## 📋 Project Status

✨ **Active Development**

- ✅ Full-stack setup (Angular + Express + MongoDB)
- ✅ User authentication & JWT
- ✅ Project CRUD operations
- ✅ Task management system
- ✅ Modern UI with glassmorphism design
- ✅ Docker & Docker Compose configuration
- 🔄 Advanced filtering & reporting
- 🔄 Real-time notifications (WebSocket)
- 🔄 Mobile responsive enhancements

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 20
- **npm** ≥ 10
- **MongoDB** (local or Atlas)
- **Angular CLI** ≥ 21

### 1️⃣ Backend Setup (Express API)

```bash
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Fill in: DATABASE_URL, JWT_SECRET, PORT

# Run development server
npm run dev
```

**Expected output:** `Server running on port 5000`

### 2️⃣ Frontend Setup (Angular)

```bash
cd planify-web

# Install dependencies
npm install

# Run development server
ng serve
# or
npm run dev
```

**Visit:** http://localhost:4200

### 3️⃣ Verify Production Build

```bash
# Frontend
cd planify-web && ng build

# Backend
cd ../backend && npm run build
```

---

## 📡 API Endpoints

### Authentication
```bash
POST   /api/auth/register        # User registration
POST   /api/auth/login           # User login
POST   /api/auth/logout          # User logout
GET    /api/auth/me              # Get current user
POST   /api/auth/refresh         # Refresh JWT token
```

### Projects
```bash
GET    /api/projects             # List all projects
POST   /api/projects             # Create new project
GET    /api/projects/:id         # Get project details
PUT    /api/projects/:id         # Update project
DELETE /api/projects/:id         # Delete project
GET    /api/projects/:id/tasks   # Get project tasks
```

### Tasks
```bash
GET    /api/tasks                # List all tasks
POST   /api/tasks                # Create new task
GET    /api/tasks/:id            # Get task details
PUT    /api/tasks/:id            # Update task
DELETE /api/tasks/:id            # Delete task
PATCH  /api/tasks/:id/status     # Update task status
```

### Timelines
```bash
GET    /api/timelines            # Get project timeline
POST   /api/timelines            # Create timeline
PUT    /api/timelines/:id        # Update timeline
```

**Full API documentation:** See `backend/README.md`

---

## 🎨 Frontend Components

### Main Features
- **Dashboard** — Overview of all projects & tasks
- **Project Board** — Kanban-style project management
- **Task Editor** — Detailed task creation & editing
- **Team View** — Team member management
- **Timeline/Gantt** — Visual project timeline
- **Settings** — User preferences & notifications

### Design System
- **Glassmorphism UI** — Modern, translucent design
- **Dark Mode Support** — Eye-friendly interface
- **Responsive Layout** — Mobile, tablet, desktop
- **Accessibility** — WCAG 2.1 compliant

---

## 🔐 Security Features

### Authentication
- JWT tokens with configurable expiration
- Refresh token rotation
- Password hashing with bcrypt
- Secure HTTP-only cookies

### Authorization
- Role-based access control (RBAC)
- Project-level permissions
- Task assignment validation

### Data Protection
- Input validation on all endpoints
- CORS configuration
- Rate limiting on auth endpoints
- SQL/NoSQL injection protection

---

## 📊 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  name: String,
  role: String ("admin" | "manager" | "user"),
  avatar: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Projects Collection
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  owner: ObjectId (ref: User),
  members: [ObjectId] (ref: User),
  status: String ("planning" | "active" | "completed"),
  startDate: Date,
  endDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Tasks Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  project: ObjectId (ref: Project),
  assignee: ObjectId (ref: User),
  priority: String ("low" | "medium" | "high"),
  status: String ("todo" | "in-progress" | "review" | "done"),
  dueDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🧪 Testing

### Frontend Tests
```bash
cd planify-web

# Run unit tests
npm run test

# Run E2E tests
npm run e2e

# Generate coverage report
npm run test:coverage
```

### Backend Tests
```bash
cd backend

# Run all tests
npm run test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

---

## 📁 Repository Structure

```
Planify/
├── planify-web/                 # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── services/
│   │   │   ├── guards/
│   │   │   ├── interceptors/
│   │   │   └── models/
│   │   ├── assets/
│   │   ├── styles/
│   │   └── environments/
│   ├── angular.json
│   ├── tsconfig.json
│   └── package.json
│
├── backend/                     # Express Backend
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── models/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   └── main.ts
│   ├── config/
│   ├── tests/
│   ├── tsconfig.json
│   └── package.json
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## 🔄 Environment Variables

### Backend (`.env`)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/planify
MONGODB_DEV=mongodb://localhost:27017/planify-dev

# Security
JWT_SECRET=your-secret-key-min-32-chars
JWT_EXPIRATION=7d
BCRYPT_ROUNDS=10

# Server
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:4200

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

See `backend/.env.example` for complete list.

---

## 🚢 Deployment

### Docker Compose (Development)
```bash
docker compose up --build
```

### Production Deployment
1. Build frontend: `npm run build` → `dist/`
2. Build backend: `npm run build` → `dist/`
3. Deploy to your hosting (Vercel, Heroku, AWS, DigitalOcean)
4. Ensure MongoDB connection string is set
5. Configure JWT_SECRET in production environment

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes following code style guidelines
3. Commit with conventional commits: `git commit -m "feat: description"`
4. Push to GitHub: `git push origin feature/your-feature`
5. Open a Pull Request

**Code Style:**
- TypeScript strict mode
- ESLint + Prettier
- Conventional commits
- 80% test coverage minimum

---

## 📄 License

MIT License — See LICENSE file for details

---

## 📞 Support & Contact

- 💬 **GitHub Issues** — Bug reports & feature requests
- 📧 **Email** — karbia.rahma94@gmail.com
- 🔗 **LinkedIn** — [linkedin.com/in/rahmakarbia](https://linkedin.com/in/rahmakarbia)
- 🐦 **Twitter** — [@RahmaKarbia](https://twitter.com/rahmakarbia)

---

## 🎓 Learning Resources

- [Angular Documentation](https://angular.io/docs)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [JWT Authentication](https://jwt.io/introduction)
- [Glassmorphism UI Design](https://www.glassmorphism.com/)

---

**Built with ❤️ by [Rahma Karbia](https://github.com/RahmaKarbia94)**
