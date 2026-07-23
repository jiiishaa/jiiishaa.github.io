import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

const SkillForm = ({ skill, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    proficiency: 50
  });

  useEffect(() => {
    if (skill) {
      setFormData(skill);
    }
  }, [skill]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'proficiency' ? parseInt(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (skill?._id) {
        await api.put(`/skills/${skill._id}`, formData);
        toast.success('Skill updated successfully');
      } else {
        await api.post('/skills', formData);
        toast.success('Skill created successfully');
      }
      onSubmit();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save skill');
    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-cyan mb-6">
        {skill ? 'Edit Skill' : 'Add New Skill'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block text-gray-300 mb-2">Skill Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-cyan"
            placeholder="e.g., React, Python, Node.js"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-cyan"
          >
            <option value="">Select Category</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Database">Database</option>
            <option value="DevOps">DevOps</option>
            <option value="Tools">Tools</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-300 mb-2">
            Proficiency: {formData.proficiency}%
          </label>
          <input
            type="range"
            name="proficiency"
            min="0"
            max="100"
            value={formData.proficiency}
            onChange={handleChange}
            className="w-full"
          />
          <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
            <div
              className="bg-cyan h-2 rounded-full transition-all"
              style={{ width: `${formData.proficiency}%` }}
            ></div>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-semibold transition"
          >
            {skill ? 'Update Skill' : 'Create Skill'}
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

export default SkillForm;
