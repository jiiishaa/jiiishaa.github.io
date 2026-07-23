import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

const ExperienceForm = ({ experience, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    startDate: '',
    endDate: '',
    currentlyWorking: false,
    description: ''
  });

  useEffect(() => {
    if (experience) {
      setFormData({
        ...experience,
        startDate: experience.startDate?.split('T')[0] || '',
        endDate: experience.endDate?.split('T')[0] || ''
      });
    }
  }, [experience]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (experience?._id) {
        await api.put(`/experience/${experience._id}`, formData);
        toast.success('Experience updated successfully');
      } else {
        await api.post('/experience', formData);
        toast.success('Experience created successfully');
      }
      onSubmit();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save experience');
    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-cyan mb-6">
        {experience ? 'Edit Experience' : 'Add New Experience'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-2">Job Title *</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-cyan"
              placeholder="e.g., Senior Developer"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Company *</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-cyan"
              placeholder="e.g., Tech Company"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-2">Start Date *</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-cyan"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              disabled={formData.currentlyWorking}
              className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-cyan disabled:opacity-50"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="currentlyWorking"
              checked={formData.currentlyWorking}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span className="text-gray-300">Currently Working Here</span>
          </label>
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-cyan h-24"
            placeholder="Describe your responsibilities and achievements..."
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-semibold transition"
          >
            {experience ? 'Update Experience' : 'Create Experience'}
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

export default ExperienceForm;
