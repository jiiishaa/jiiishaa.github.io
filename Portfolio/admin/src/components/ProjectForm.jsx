import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

const ProjectForm = ({ project, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    technologies: [],
    link: '',
    github: ''
  });

  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    if (project) {
      setFormData(project);
      setTechInput('');
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput)) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput]
      });
      setTechInput('');
    }
  };

  const removeTechnology = (tech) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter(t => t !== tech)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (project?._id) {
        await api.put(`/projects/${project._id}`, formData);
        toast.success('Project updated successfully');
      } else {
        await api.post('/projects', formData);
        toast.success('Project created successfully');
      }
      onSubmit();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save project');
    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-cyan mb-6">
        {project ? 'Edit Project' : 'Add New Project'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-2">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-cyan"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-cyan"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-cyan h-24"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-2">Live Link</label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-cyan"
              placeholder="https://example.com"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">GitHub Link</label>
            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
              className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-cyan"
              placeholder="https://github.com/..."
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Technologies</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
              className="flex-1 p-2 bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-cyan"
              placeholder="Enter technology and press Add or Enter"
            />
            <button
              type="button"
              onClick={addTechnology}
              className="px-4 py-2 bg-cyan text-navy rounded font-semibold hover:bg-cyan/80 transition"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.technologies.map((tech) => (
              <span
                key={tech}
                className="bg-cyan/10 text-cyan px-3 py-1 rounded flex items-center gap-2"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => removeTechnology(tech)}
                  className="hover:text-red-400 transition"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-semibold transition"
          >
            {project ? 'Update Project' : 'Create Project'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded font-semibold transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
