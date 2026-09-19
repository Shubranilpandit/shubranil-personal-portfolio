# 🌐 TRON: Legacy Personal Digital Identity & Portfolio System
### **Shubranil Pandit — MCA Student (Specializing in Data Science) | Full-Stack Developer**

[![Status](https://img.shields.io/badge/GRID_CORE-ONLINE-00f0ff?style=for-the-badge&logo=shield)](http://localhost:5000/api/health)
[![Degree](https://img.shields.io/badge/MCA-DATA_SCIENCE-0077ff?style=for-the-badge)](https://github.com/shubranil-pandit)
[![Stack](https://img.shields.io/badge/REACT_19-FLASK-POSTGRESQL-00ffaa?style=for-the-badge)](https://github.com/shubranil-pandit)

An immersive, futuristic personal portfolio website and digital operating system built for **Shubranil Pandit**. Inspired by the cinematic visual language of **TRON: Legacy** (dark aesthetics, glowing cyan HUDs, digital grid, rotating identity cores, procedural audio FX, and interactive terminals) while engineered to professional developer standards for placements, internships, research demonstrations, and technical interviews.

---

## 🏛️ System Architecture

```text
                                  VISITOR / ADMIN
                                         │
                                         ▼
                ┌─────────────────────────────────────────────────┐
                │          REACT + VITE FRONTEND (HUD UI)         │
                │  - TRON Grid Canvas & Particle Stream           │
                │  - Procedural Audio Synth (Web Audio API)       │
                │  - Cinematic Boot Sequence & CLI Terminal       │
                │  - Projects Command Center & RAG Visualizer     │
                │  - Protected Admin Control Room                 │
                └────────────────────────┬────────────────────────┘
                                         │ REST API / JWT Auth
                                         ▼
                ┌─────────────────────────────────────────────────┐
                │               FLASK REST BACKEND                │
                │  - Blueprints: Profile, Skills, Projects,       │
                │    Education, Experience, Achievements, GitHub, │
                │    Contact (Rate-Limited), Health, Auth, Admin  │
                │  - SQLAlchemy ORM with auto-migration & seed    │
                │  - Security: Hashed passwords, JWT, CORS, XSS   │
                └────────────┬───────────────────┬────────────────┘
                             │                   │
               ┌─────────────▼───────────┐ ┌─────▼──────────────────┐
               │        DATABASE         │ │   EXTERNAL SERVICES    │
               │  PostgreSQL (Production)│ │  - GitHub REST API     │
               │  SQLite (Local Fallback)│ │  - Contact Mailer Mock │
               └─────────────────────────┘ └────────────────────────┘
```

---

## ✨ Features Breakdown

1. **Cinematic Boot Sequence**: Short sci-fi initialization sequence with animated progress bar, log stream, identity verification, and skip button.
2. **Hero Identity Core**: Full-screen hero featuring rotating concentric HUD coordinate data rings (azimuth angles, radar sweep), technical telemetry readouts, and call-to-action buttons.
3. **Interactive Terminal (CLI)**: In-page dropdown terminal accepting operational commands (`help`, `about`, `skills`, `projects`, `experience`, `education`, `contact`, `health`, `resume`, `clear`, `exit`).
4. **Skills Matrix**: Categorized technical repertoire (Programming, Data Science / ML, Backend, Databases, Tools, Big Data, AI/GenAI) with realistic proficiency indicators (`Project Experience`, `Working Knowledge`, `Familiar`, `Learning`).
5. **Projects Command Center**: Interactive project grid with category filters, detailed modal inspections, and an **interactive visual RAG architecture flowchart** for the *GenAI Expert Knowledge Retrieval System*.
6. **Featured Projects Pre-Populated**:
   - **V-Mirror**: Virtual Try-On Cyber System (MediaPipe, Flask, PostgreSQL, Computer Vision).
   - **Stability-Aware Pharmacovigilance**: ADR Signal Mining in Elderly Cohorts using 5M+ FAERS records.
   - **GenAI Expert Knowledge Retrieval**: Domain-specific RAG knowledge engine powered by quantized local LLMs and vector embeddings.
   - **Smart Room Safety & Environment Monitor**: IoT cyber-physical sensing grid with Arduino ATMega328P, gas/smoke detectors, and servomotors.
   - **Machine Learning Suite**: House Price Prediction, K-Means Clustering, CNN Cats vs Dogs, Hand Gesture Recognition.
7. **Education & Experience Timelines**: Glowing node vertical timelines detailing MCA Data Science coursework, academic standings, and research lab contributions.
8. **GitHub Telemetry Radar**: Dynamic repository synchronization with caching, stars, forks, and automatic fallback.
9. **Curriculum Vitae / Resume Console**: Direct browser viewing (`/api/resume/view`) and download (`/api/resume/download`) powered by backend file routing.
10. **Futuristic Communication Console**: Contact form with animated 4-stage transmission sequence (`CONNECTING... ENCRYPTING... TRANSMITTING... MESSAGE RECEIVED`), server-side validation, and IP sliding-window rate limiting.
11. **Live System Telemetry HUD**: Real-time health monitor (`GET /api/health`) querying actual database connectivity, latency in milliseconds, and server uptime.
12. **Admin Control Room**: Secure JWT-authenticated management portal for creating, editing, and deleting projects, skills, education, and viewing received contact transmissions.
13. **Procedural Web Audio FX**: Synthesizes sci-fi clicks, hums, and transmission chirps with the browser's native Web Audio API (zero audio files needed, muted by default for accessibility).

---

## 🚀 Quickstart Guide

### Option 1: Local Development (Recommended)

#### Prerequisites
- **Python 3.10+** (Tested on Python 3.14)
- **Node.js 18+** & **npm**

#### Step 1: Install Backend Dependencies & Start Flask
```bash
# From the project root:
cd backend
pip install -r requirements.txt
python app.py
```
*The Flask backend will automatically create and seed `portfolio.db` (SQLite fallback) if no PostgreSQL `DATABASE_URL` is set.*  
*Backend runs at: `http://localhost:5000`*

#### Step 2: Start Frontend Development Server
```bash
# In a new terminal window:
cd frontend
npm install
npm run dev
```
*Frontend runs at: `http://localhost:5173`*

#### Step 3: Or use the one-click launchers!
- **Windows**: Double-click `run_dev.bat` or execute `./run_dev.ps1` in PowerShell.

---

### Option 2: Docker Compose (Full-Stack + PostgreSQL)

Run the entire application (PostgreSQL 16 + Flask Backend + React Nginx Frontend) with one single command:

```bash
docker compose up --build
```

- **Frontend Application**: `http://localhost:80`
- **Backend REST API**: `http://localhost:5000`
- **PostgreSQL Database**: `localhost:5432`

---

## 🔐 Default Admin Credentials

Access the **Admin Control Room** by clicking the **Shield icon** in the top navigation bar or bottom footer:

- **Username**: `admin`
- **Password**: `Admin@Tron2026`

*You can modify passwords and create new administrators directly through the database or API.*

---

## 📡 REST API Reference

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/health` | Live database connectivity, latency & uptime | No |
| `GET` | `/api/profile` | Personal digital identity profile & dossier | No |
| `GET` | `/api/skills` | Technical skills grouped by category | No |
| `GET` | `/api/projects` | All project records (supports `?category=` filter) | No |
| `GET` | `/api/projects/<id>` | Single project detailed telemetry | No |
| `GET` | `/api/education` | Academic timeline & coursework | No |
| `GET` | `/api/experience` | Research & practical activities timeline | No |
| `GET` | `/api/achievements` | Commendations, awards & certifications | No |
| `GET` | `/api/github` | Cached GitHub repository data | No |
| `GET` | `/api/resume/download`| Download PDF resume file | No |
| `GET` | `/api/resume/view` | View PDF resume in browser | No |
| `POST` | `/api/contact` | Submit contact transmission (rate-limited) | No |
| `POST` | `/api/auth/login` | Administrator login (returns JWT token) | No |
| `GET` | `/api/admin/overview` | Dashboard summary metrics & counts | **Yes (Bearer JWT)** |
| `POST` | `/api/admin/projects` | Create new project node | **Yes (Bearer JWT)** |
| `PUT` | `/api/admin/projects/<id>` | Update existing project | **Yes (Bearer JWT)** |
| `DELETE` | `/api/admin/projects/<id>` | Remove project node | **Yes (Bearer JWT)** |
| `POST` | `/api/admin/skills` | Add new technical skill | **Yes (Bearer JWT)** |
| `DELETE` | `/api/admin/skills/<id>` | Delete technical skill | **Yes (Bearer JWT)** |
| `PUT` | `/api/admin/profile` | Update profile bio & status | **Yes (Bearer JWT)** |
| `GET` | `/api/admin/contacts` | View logged contact transmissions | **Yes (Bearer JWT)** |

---

## 🌐 Production Deployment Guide

### 1. Database (PostgreSQL)
Provision a free or managed PostgreSQL instance on **Neon.tech**, **Supabase**, or **Render**:
1. Copy the connection string (e.g. `postgresql://user:pass@ep-host.neon.tech/neondb`).
2. Run `database/schema.sql` and `database/seed.sql` in your SQL query console, or let the Flask backend auto-seed upon first launch!

### 2. Backend (Render / Railway / VPS)
1. Push your repository to GitHub.
2. In **Render** or **Railway**, create a **Web Service**:
   - **Root Directory**: `.`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `gunicorn --bind 0.0.0.0:$PORT backend.app:app`
   - **Environment Variables**:
     - `DATABASE_URL`: Your PostgreSQL connection string.
     - `SECRET_KEY`: A cryptographically secure secret key.
     - `JWT_SECRET_KEY`: A secure JWT signing key.
     - `CORS_ORIGINS`: Your production frontend domain URL.

### 3. Frontend (Vercel / Netlify)
1. In **Vercel** or **Netlify**, import your GitHub repository.
2. **Root Directory**: `frontend`
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Environment Variables**:
   - `VITE_API_URL`: Your deployed backend URL (e.g. `https://shubranil-portfolio-api.onrender.com`).

---

## 📂 Project Structure

```text
shubranil-portfolio/
│
├── frontend/                     # React 19 + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/           # Tron HUD Components
│   │   │   ├── TronCanvas.jsx    # Animated perspective grid & particle stream
│   │   │   ├── BootScreen.jsx    # Cinematic system initialization sequence
│   │   │   ├── Navbar.jsx        # Top HUD bar with audio, status & terminal toggles
│   │   │   ├── Hero.jsx          # Digital identity core with rotating coordinate HUD
│   │   │   ├── About.jsx         # Specification dossier and focus areas
│   │   │   ├── Skills.jsx        # Skill Matrix with realistic indicators
│   │   │   ├── Projects.jsx      # Command center with category filters & modals
│   │   │   ├── RagVisualizer.jsx # Interactive RAG pipeline flow diagram
│   │   │   ├── Education.jsx     # Glowing node academic timeline
│   │   │   ├── Experience.jsx    # Research and practical operations log
│   │   │   ├── Achievements.jsx  # Commendations database
│   │   │   ├── Resume.jsx        # Resume viewer and PDF download
│   │   │   ├── GitHubActivity.jsx# GitHub repository radar
│   │   │   ├── Contact.jsx       # 4-stage encrypted transmission console
│   │   │   ├── InteractiveTerminal.jsx # In-page interactive CLI
│   │   │   ├── SystemStatusModal.jsx   # Real-time health & latency telemetry
│   │   │   ├── AdminDashboard.jsx      # JWT authenticated CRUD control room
│   │   │   ├── CyberIcons.jsx    # Clean SVG icons
│   │   │   └── Footer.jsx        # Grid footer with coordinates
│   │   ├── services/
│   │   │   ├── api.js            # Central REST API client
│   │   │   └── soundService.js   # Procedural Web Audio API sound FX
│   │   ├── App.jsx               # Master application container
│   │   ├── main.jsx              # Vite React bootstrap
│   │   └── index.css             # Tron custom CSS, neon glows & scanlines
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── backend/                      # Python + Flask REST Backend
│   ├── models/                   # SQLAlchemy ORM Models
│   │   ├── base.py
│   │   ├── user.py               # Admin user with hashed passkeys
│   │   ├── profile.py            # Digital identity core
│   │   ├── skill.py              # Skill matrix
│   │   ├── project.py            # Projects & associations
│   │   ├── education.py          # Academic timeline
│   │   ├── experience.py         # Experience timeline
│   │   ├── achievement.py        # Commendations
│   │   └── contact.py            # Contact transmissions
│   ├── routes/                   # Flask REST API Blueprints
│   │   ├── health.py             # Real DB connectivity & latency
│   │   ├── profile.py
│   │   ├── skills.py
│   │   ├── projects.py
│   │   ├── education.py
│   │   ├── experience.py
│   │   ├── achievements.py
│   │   ├── contact.py            # Rate-limited transmission receiver
│   │   ├── github.py             # Cached GitHub integration
│   │   ├── resume.py             # Secure PDF file streaming
│   │   ├── auth.py               # JWT login & verification
│   │   └── admin.py              # Protected CRUD operations
│   ├── services/
│   │   └── github_service.py     # GitHub API proxy with fallback
│   ├── utils/
│   │   ├── auth.py               # Token decorators & verification
│   │   ├── seeder.py             # Automatic database initialization
│   │   └── validators.py         # IP sliding-window rate limiter
│   ├── tests/
│   │   └── test_api.py           # Automated pytest test suite
│   ├── app.py                    # Application factory & server entry
│   ├── config.py                 # Multi-environment config
│   └── requirements.txt          # Python dependencies
│
├── database/
│   ├── schema.sql                # PostgreSQL DDL table definitions
│   └── seed.sql                  # Production seed data
│
├── Dockerfile.backend
├── Dockerfile.frontend
├── docker-compose.yml
├── nginx.conf
├── run_dev.bat
├── run_dev.ps1
├── .env.example
├── .gitignore
└── README.md
```

---

## 🛡️ Security & Quality Standards

- **Environment Isolation**: No hardcoded API keys or database passwords. All configuration managed via `.env`.
- **Password Protection**: Passwords hashed using `scrypt` via Werkzeug.
- **Session Security**: Stateless, tamper-proof JSON Web Tokens (JWT) with expiration.
- **Anti-Spam Rate Limiting**: Contact endpoint strictly enforces IP sliding-window rate limiting.
- **Input Sanitization**: Multi-layer server-side validation against injection and malformed inputs.
- **Accessibility**: Procedural audio is strictly opt-in (muted by default), respecting browser autoplay restrictions and user preferences.

---

**Developed with precision for Shubranil Pandit — MCA Data Science.**
