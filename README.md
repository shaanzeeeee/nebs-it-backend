# 📋 Notice Management System

A modern, full-stack web application for managing employee notices and announcements. Built with the MERN stack, this system provides a comprehensive solution for HR departments and administrators to create, publish, and manage organizational notices efficiently.

![Tech Stack](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)

---

## 📖 Project Overview

The Notice Management System is a comprehensive platform designed to streamline internal communication within organizations. It enables HR personnel and administrators to efficiently manage employee notices with features including:

### Key Features

✅ **Notice Creation & Publishing**
- Create detailed notices with multiple notice types
- Target specific departments or individuals
- Set publish dates and manage notice lifecycle
- Add employee information and attachments

✅ **Notice Management**
- View all notices in a paginated table (6 notices per page)
- Filter by department, employee, status, and date
- Toggle notice status (Published/Unpublished/Draft)
- Edit existing notices with pre-filled forms

✅ **User-Friendly Interface**
- Clean, modern UI with responsive design
- Sidebar navigation for easy access
- Multi-select dropdowns for departments and notice types
- Real-time status updates with visual feedback
- Success popups and confirmation dialogs

✅ **Advanced Filtering & Search**
- Filter by department or individual
- Search by employee ID or name
- Filter by status (Published, Unpublished, Draft)
- Filter by publish date

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **Vite** - Fast build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Icon library (Material Design & Font Awesome)

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Database
- **MongoDB** - NoSQL database (local or Atlas)

### Development Tools
- **ESLint** - Code linting
- **Nodemon** - Auto-restart server during development

---

## 📦 Installation Steps

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **MongoDB** - [Local installation](https://www.mongodb.com/try/download/community) or [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas)
- **Git** - For cloning the repository

### 1️⃣ Clone the Repository

```bash
git clone <your-repository-url>
cd "Nebs Notice Board"
```

### 2️⃣ Backend Setup

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

**Create a `.env` file** in the `server` directory with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
```

**Start the backend server:**

```bash
# Production mode
npm start

# Development mode (with auto-restart)
npm run dev
```

The server will start on `http://localhost:5000`

### 3️⃣ Frontend Setup

Open a new terminal, navigate to the client directory, and install dependencies:

```bash
cd client
npm install
```

**Start the React development server:**

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4️⃣ Verify Installation

1. Open your browser and go to `http://localhost:5173`
2. You should see the Notice Management System interface
3. Try creating a test notice to verify the connection

---

## 🔐 Environment Variables

### Backend Configuration (`server/.env`)

Create a `.env` file in the `server` directory with the following variables:

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `PORT` | Port number for the Express server | `5000` | No (defaults to 5000) |
| `MONGO_URI` | MongoDB connection string | See below | **Yes** |

### MongoDB Connection String Examples

**Local MongoDB:**
```env
MONGO_URI=mongodb://127.0.0.1:27017/noticeboard
```

**MongoDB Atlas (Cloud):**
```env
MONGO_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/noticeboard?retryWrites=true&w=majority
```

> **⚠️ Important:** Replace `username`, `password`, and `cluster.xxxxx` with your actual MongoDB Atlas credentials.

### Frontend Configuration

The frontend is configured to connect to `http://localhost:5000` by default. If you deploy the backend to a different URL, update the API endpoints in the frontend code.

---

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd server
npm start
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

### Production Build

**Build the frontend:**
```bash
cd client
npm run build
```

The production-ready files will be in the `client/dist` folder.

---

## 🌐 Deployment to Vercel

This project is configured for deployment on Vercel with separate repositories for frontend and backend.

### Quick Deployment Steps

1. **Create two GitHub repositories:**
   - `nebs-notice-board-client` (frontend)
   - `nebs-notice-board-server` (backend)

2. **Deploy Backend:**
   - Push server folder contents to backend repo
   - Import to Vercel
   - Add `MONGO_URI` and `FRONTEND_URL` environment variables
   - Deploy

3. **Deploy Frontend:**
   - Push client folder contents to frontend repo
   - Import to Vercel
   - Add `VITE_API_URL` environment variable (your backend URL)
   - Deploy

### 📚 Detailed Deployment Guide

For complete step-by-step instructions, configuration files, and troubleshooting tips, see:

**[📖 DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete Vercel deployment guide

The deployment guide includes:
- ✅ Detailed setup instructions for both repos
- ✅ Environment variable configuration
- ✅ CORS setup for production
- ✅ Troubleshooting common issues
- ✅ Verification checklist

---

## 📡 API Endpoints

### Notices

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `POST` | `/api/notices` | Create a new notice | Notice object |
| `GET` | `/api/notices` | Get all notices | Query params: `?status=Published` |
| `GET` | `/api/notices/:id` | Get a single notice by ID | - |
| `PUT` | `/api/notices/:id` | Update an entire notice | Notice object |
| `PUT` | `/api/notices/:id/status` | Update notice status only | `{ status: "Published" }` |

### Example Request Body (Create Notice)

```json
{
  "title": "Team Meeting Notice",
  "type": ["General / Company-Wide"],
  "department": ["All Department", "Sales Team"],
  "employeeId": "EMP001",
  "employeeName": "John Doe",
  "position": "Sales Manager",
  "publishDate": "2025-12-15",
  "content": "All team members are requested to attend the monthly meeting.",
  "status": "Published",
  "attachments": []
}
```

---

## 📂 Project Structure

```
Intern Assesment/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── NoticeForm.jsx
│   │   │   ├── NoticeTable.jsx
│   │   │   ├── ViewNoticeModal.jsx
│   │   │   ├── SuccessPopup.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── NoticeList.jsx
│   │   │   ├── CreateNotice.jsx
│   │   │   └── EditNotice.jsx
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── package.json
│   └── vite.config.js
│
├── server/                # Backend Node.js application
│   ├── models/           # Mongoose schemas
│   │   └── Notice.js
│   ├── routes/           # API routes
│   │   └── noticeRoutes.js
│   ├── index.js          # Server entry point
│   ├── diagnose.js       # Database diagnostic tool
│   ├── test-api.js       # API testing script
│   ├── test-db.js        # Database connection test
│   ├── .env              # Environment variables
│   └── package.json
│
└── README.md             # This file
```

---

## 🧪 Testing & Diagnostics

### Test Database Connection

```bash
cd server
node test-db.js
```

### Test API Endpoints

```bash
cd server
node test-api.js
```

### Run Full Diagnostics

```bash
cd server
node diagnose.js
```

---

## 🎨 Features Showcase

### Notice Creation
- Multi-select dropdowns for notice types and departments
- Employee information fields with validation
- Date picker for publish date
- Rich text content area
- File attachment support (drag & drop)
- Save as draft or publish immediately

### Notice Management
- Paginated table view (6 notices per page)
- Advanced filtering options
- Quick status toggle
- Bulk selection for future bulk actions
- View full notice details in modal
- Edit existing notices

### User Interface
- Responsive design for all screen sizes
- Clean, modern aesthetic
- Intuitive navigation with sidebar
- Color-coded department badges
- Status indicators (Published/Draft/Unpublished)
- Success notifications

---

## 🔧 Troubleshooting

### Common Issues

**1. MongoDB Connection Error**
- Verify your `MONGO_URI` in `.env` is correct
- Check if MongoDB service is running (for local installations)
- Ensure network access is allowed (for MongoDB Atlas)

**2. Port Already in Use**
- Change the `PORT` in `.env` to a different number
- Kill the process using the port: `npx kill-port 5000`

**3. Frontend Can't Connect to Backend**
- Ensure backend server is running on port 5000
- Check CORS configuration in `server/index.js`
- Verify API endpoints in frontend code

**4. Dependencies Installation Fails**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Try using `npm install --legacy-peer-deps`

---

## 👨‍💻 Development

### Code Style
- All files include comprehensive comments
- JSDoc-style documentation for functions
- Casual, developer-friendly language
- Consistent naming conventions

### Adding New Features
1. Create new components in `client/src/components/`
2. Add new routes in `server/routes/`
3. Update models in `server/models/` if needed
4. Test thoroughly before committing

---

## 📝 License

This project is created for assessment purposes.

---

## 🤝 Support

For issues or questions, please contact the development team.

---

**Built with ❤️ using the MERN Stack**
