import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, user } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Logged in successfully');
    } catch (error) {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy">
      <div className="bg-slate-800 p-8 rounded-lg shadow-lg w-96 border border-cyan/20">
        <h2 className="text-2xl font-bold text-center text-cyan mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input 
              type="email" 
              className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-cyan"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Password</label>
            <input 
              type="password" 
              className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-cyan"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-cyan text-navy font-bold py-2 px-4 rounded hover:bg-cyan/80 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
