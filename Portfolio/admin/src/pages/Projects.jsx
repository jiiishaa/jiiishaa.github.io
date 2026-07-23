import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Trash2, Edit, Plus } from 'lucide-react';
import api from '../services/api';
import ProjectForm from '../components/ProjectForm';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (error) {
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await api.delete(`/projects/${id}`);
        setProjects(projects.filter(p => p._id !== id));
        toast.success('Project deleted');
      } catch (error) {
        toast.error('Failed to delete project');
      }
    }
  };

  const handleFormSubmit = () => {
    setEditingProject(null);
    setShowForm(false);
    fetchProjects();
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-cyan">Projects</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-cyan text-navy px-4 py-2 rounded font-semibold hover:bg-cyan/80 transition"
        >
          <Plus size={20} />
          Add Project
        </button>
      </div>

      {showForm && (
        <div className="mb-8">
          <ProjectForm 
            project={editingProject} 
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingProject(null);
            }}
          />
        </div>
      )}

      {loading ? (
        <div className="text-center text-gray-400">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="text-center text-gray-400">No projects yet. Create one to get started!</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project._id} className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden hover:border-cyan/50 transition">
              {project.image && (
                <img src={project.image} alt={project.title} className="w-full h-40 object-cover" />
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies && project.technologies.map((tech, idx) => (
                    <span key={idx} className="bg-cyan/10 text-cyan text-xs px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingProject(project);
                      setShowForm(true);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded transition"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
