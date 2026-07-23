import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, Briefcase, Code, GraduationCap, FileText, MessageSquare, LogOut } from 'lucide-react';

const Sidebar = () => {
  const { logout } = useContext(AuthContext);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Projects', path: '/projects', icon: <Briefcase size={20} /> },
    { name: 'Skills', path: '/skills', icon: <Code size={20} /> },
    { name: 'Experience', path: '/experience', icon: <Briefcase size={20} /> },
    { name: 'Education', path: '/education', icon: <GraduationCap size={20} /> },
    { name: 'Messages', path: '/messages', icon: <MessageSquare size={20} /> },
  ];

  return (
    <div className="w-64 bg-slate-900 min-h-screen border-r border-slate-700 flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h2 className="text-2xl font-bold text-cyan">Admin Panel</h2>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 p-3 rounded transition-colors ${
                isActive ? 'bg-cyan/10 text-cyan border border-cyan/20' : 'text-gray-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={logout}
          className="flex items-center space-x-3 p-3 w-full text-left text-gray-400 hover:bg-slate-800 hover:text-white rounded transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
