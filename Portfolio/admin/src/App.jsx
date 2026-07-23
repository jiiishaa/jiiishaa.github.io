import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthContext, AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Experience from './pages/Experience';
import Education from './pages/Education';
import Messages from './pages/Messages';
import Sidebar from './components/Sidebar';

// Require auth wrapper
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) return <div className="min-h-screen bg-navy flex items-center justify-center text-cyan">Loading...</div>;
  
  return user ? (
    <div className="flex min-h-screen bg-navy text-white">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

function AppContent() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/projects" 
          element={
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/skills" 
          element={
            <PrivateRoute>
              <Skills />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/experience" 
          element={
            <PrivateRoute>
              <Experience />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/education" 
          element={
            <PrivateRoute>
              <Education />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/messages" 
          element={
            <PrivateRoute>
              <Messages />
            </PrivateRoute>
          } 
        />
        <Route 
          path="*" 
          element={
            <PrivateRoute>
              <div className="p-8"><h1 className="text-2xl text-cyan">Coming Soon...</h1></div>
            </PrivateRoute>
          } 
        />
      </Routes>
      <ToastContainer theme="dark" />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
