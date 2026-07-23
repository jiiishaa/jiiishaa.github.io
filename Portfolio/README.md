# Premium Portfolio Project

This is a complete MERN stack (MongoDB, Express, React, Node.js) portfolio featuring a 3D animated hero section, glassmorphism design, and a fully functional admin dashboard.

## Folder Structure
- `backend/`: Node.js & Express REST API
- `frontend/`: React Vite app for the public portfolio
- `admin/`: React Vite app for the secure admin dashboard

## How to Run Locally

### Option 1: Using Docker (Recommended for any platform)
If you have Docker and Docker Compose installed:
1. Open a terminal in this root directory.
2. Run `docker compose up --build -d`
3. The services will be available at:
   - Frontend: `http://localhost:5173`
   - Admin: `http://localhost:5174`
   - Backend API: `http://localhost:5000`

### Option 2: Manual Start
You will need Node.js and MongoDB installed locally.

1. **Backend**:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Admin Dashboard**:
   ```bash
   cd admin
   npm install
   npm run dev
   ```
