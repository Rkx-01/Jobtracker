# JobTracker

A full-stack MERN application to track and manage job applications with an intuitive dashboard, automated email parsing, and analytics.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![React](https://img.shields.io/badge/react-19.2.0-blue)

## 🚀 Features

### Core Functionality
- **Email Parsing**: Automatically extract job details from application emails
- **Dashboard**: Clean, organized view of all job applications
- **Status Tracking**: Track applications through Applied → Interview → Rejected stages
- **Search & Filter**: Find applications by company name, status, or date
- **Analytics**: View statistics on total applications, interviews, and rejections
- **Notes & Reminders**: Add notes and set follow-up dates for each application
- **Timeline**: Visual timeline of application status changes

### UI/UX
- **Dark Mode**: Full light/dark theme support with system preference detection
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern Interface**: Built with Tailwind CSS for a clean, professional look
- **Real-time Updates**: Instant UI updates after adding or modifying applications

### Technical Features
- **JWT Authentication**: Secure user authentication and authorization
- **RESTful API**: Well-structured backend API with proper error handling
- **MongoDB**: Efficient data storage with Mongoose ODM
- **Auto-cleanup**: Scheduled job to remove old rejected applications (90+ days)

## 🛠️ Tech Stack

### Frontend
- **React** 19.2.0 - UI library
- **React Router** 7.13.0 - Client-side routing
- **Tailwind CSS** 4.1.18 - Utility-first CSS framework
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **Vite** - Build tool and dev server

### Backend
- **Node.js** - Runtime environment
- **Express** 4.22.1 - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** 9.1.5 - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **node-cron** - Scheduled tasks
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

- Node.js >= 18.0.0
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/Rkx-01/Jobtracker.git
cd Jobtracker
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3000
NODE_ENV=development
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
Backend runs on `http://localhost:3000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:5173`

### Production Build

**Frontend:**
```bash
cd frontend
npm run build
```

## 📁 Project Structure

```
Jobtracker/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── user.js          # User model with bcrypt hashing
│   │   │   └── job.js           # Job model with status tracking
│   │   ├── routes/
│   │   │   ├── auth.js          # Authentication routes
│   │   │   └── jobs.js          # Job CRUD and stats routes
│   │   ├── middleware/
│   │   │   └── auth.js          # JWT verification middleware
│   │   └── app.js               # Express server setup
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx       # Navigation bar
    │   │   ├── Sidebar.jsx      # Dashboard sidebar
    │   │   ├── JobCard.jsx      # Job application card
    │   │   ├── Timeline.jsx     # Status timeline
    │   │   ├── ThemeToggle.jsx  # Dark mode toggle
    │   │   └── EmptyState.jsx   # Empty state component
    │   ├── pages/
    │   │   ├── LandingPage.jsx  # Landing page
    │   │   ├── Login.jsx        # Login page
    │   │   ├── Register.jsx     # Registration page
    │   │   └── Dashboard.jsx    # Main dashboard
    │   ├── context/
    │   │   └── ThemeContext.jsx # Theme state management
    │   ├── api.js               # Axios instance
    │   ├── App.jsx              # Root component
    │   └── main.jsx             # Entry point
    ├── index.html
    ├── tailwind.config.js
    └── package.json
```

## 🔌 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Jobs
- `GET /jobs` - Get all jobs (with search, filter, sort)
- `GET /jobs/stats` - Get application statistics
- `POST /jobs/parse` - Parse email and create job
- `PUT /jobs/:id` - Update job
- `DELETE /jobs/:id` - Delete job

## 🎨 Features in Detail

### Email Parsing
Paste job application emails and the system automatically extracts:
- Company name
- Job role
- Application date
- Email content

### Search & Filter
- **Search**: Find applications by company name
- **Filter**: Filter by status (Applied, Interview, Rejected)
- **Sort**: Sort by newest or oldest first

### Analytics Dashboard
- Total applications
- Applications by status
- Visual statistics cards

### Dark Mode
- System preference detection
- Manual toggle
- Persistent across sessions (localStorage)

## 🌐 Deployment

### Backend (Render)
1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node src/app.js`
4. Add environment variables (MONGO_URI, JWT_SECRET, PORT, NODE_ENV)

### Frontend (Vercel)
1. Create a new project on [Vercel](https://vercel.com)
2. Connect your GitHub repository
3. Configure:
   - **Framework**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

## 🔒 Environment Variables

### Backend (.env)
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/jobtracker
JWT_SECRET=your_super_secret_jwt_key_here
PORT=3000
NODE_ENV=production
```

### Frontend
The frontend automatically uses:
- **Development**: `http://localhost:3000`
- **Production**: Your deployed backend URL (configured in `src/api.js`)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Rkx-01**
- GitHub: [@Rkx-01](https://github.com/Rkx-01)

## 🙏 Acknowledgments

- Built as a portfolio project to demonstrate full-stack development skills
- Designed for students and professionals managing job applications
- Inspired by modern SaaS dashboards and productivity tools

## 📧 Support

For support, email or open an issue in the GitHub repository.

---

**Note**: This is a portfolio project built for educational purposes. Feel free to use it as a template for your own job tracking application!
