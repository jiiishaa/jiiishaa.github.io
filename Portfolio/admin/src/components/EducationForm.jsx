import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

const EducationForm = ({ education, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  useEffect(() => {
    if (education) {
      setFormData({
        ...education,
        startDate: education.startDate?.split('T')[0] || '',
        endDate: education.endDate?.split('T')[0] || ''
      });
    }
  }, [education]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (education?._id) {
        await api.put(`/education/${education._id}`, formData);
        toast.success('Education updated successfully');
      } else {
        await api.post('/education', formData);
        toast.success('Education created successfully');
      }
      onSubmit();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save education');
    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-cyan mb-6">
        {education ? 'Edit Education' : 'Add New Education'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-2">School/University *</label>
            <input
              type="text"
              name="school"
              value={formData.school}
              onChange={handleChange}
              className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-cyan"
              placeholder="e.g., MIT"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Degree *</label>
            <input
              type="text"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-cyan"
              placeholder="e.g., Bachelor of Science"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Field of Study</label>
          <input
            type="text"
            name="fieldOfStudy"
            value={formData.fieldOfStudy}
            onChange={handleChange}
            className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-cyan"
            placeholder="e.g., Computer Science"
          />
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
            <label className="block text-gray-300 mb-2">End Date *</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-cyan"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-cyan h-20"
            placeholder="Add any additional details about your education..."
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-semibold transition"
          >
            {education ? 'Update Education' : 'Create Education'}
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

export default EducationForm;
