import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { BarChart3, Briefcase, Code, GraduationCap, MessageSquare } from 'lucide-react';
import api from '../services/api';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    experiences: 0,
    educations: 0,
    messages: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [projects, skills, experiences, educations, messages] = await Promise.all([
        api.get('/projects'),
        api.get('/skills'),
        api.get('/experience'),
        api.get('/education'),
        api.get('/messages')
      ]);

      setStats({
        projects: projects.data.length,
        skills: skills.data.length,
        experiences: experiences.data.length,
        educations: educations.data.length,
        messages: messages.data.length
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  const statCards = [
    {
      label: 'Projects',
      value: stats.projects,
      icon: <Briefcase size={24} />,
      path: '/projects',
      color: 'text-blue-400'
    },
    {
      label: 'Skills',
      value: stats.skills,
      icon: <Code size={24} />,
      path: '/skills',
      color: 'text-green-400'
    },
    {
      label: 'Experiences',
      value: stats.experiences,
      icon: <Briefcase size={24} />,
      path: '/experience',
      color: 'text-purple-400'
    },
    {
      label: 'Education',
      value: stats.educations,
      icon: <GraduationCap size={24} />,
      path: '/education',
      color: 'text-orange-400'
    },
    {
      label: 'Messages',
      value: stats.messages,
      icon: <MessageSquare size={24} />,
      path: '/messages',
      color: 'text-red-400'
    }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-cyan mb-2">Dashboard</h1>
        <p className="text-gray-300">Welcome, {user.name}!</p>
      </div>

      {loading ? (
        <div className="text-center text-gray-400">Loading statistics...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((card) => (
            <a
              key={card.label}
              href={card.path}
              className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-cyan/50 transition cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`${card.color}`}>
                  {card.icon}
                </div>
                <span className="text-4xl font-bold text-white">{card.value}</span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-cyan transition">
                {card.label}
              </h3>
              <p className="text-gray-400 text-sm mt-2">Manage your {card.label.toLowerCase()}</p>
            </a>
          ))}
        </div>
      )}

      <div className="mt-12 bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-cyan mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/projects"
            className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded transition"
          >
            Add New Project
          </a>
          <a
            href="/skills"
            className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded transition"
          >
            Add New Skill
          </a>
          <a
            href="/experience"
            className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded transition"
          >
            Add New Experience
          </a>
          <a
            href="/education"
            className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded transition"
          >
            Add New Education
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
