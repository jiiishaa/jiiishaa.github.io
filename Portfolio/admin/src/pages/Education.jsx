import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Trash2, Edit, Plus } from 'lucide-react';
import api from '../services/api';
import EducationForm from '../components/EducationForm';

const Education = () => {
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEducation, setEditingEducation] = useState(null);

  useEffect(() => {
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    try {
      setLoading(true);
      const response = await api.get('/education');
      setEducations(response.data);
    } catch (error) {
      toast.error('Failed to fetch educations');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this education?')) {
      try {
        await api.delete(`/education/${id}`);
        setEducations(educations.filter(e => e._id !== id));
        toast.success('Education deleted');
      } catch (error) {
        toast.error('Failed to delete education');
      }
    }
  };

  const handleFormSubmit = () => {
    setEditingEducation(null);
    setShowForm(false);
    fetchEducations();
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-cyan">Education</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-cyan text-navy px-4 py-2 rounded font-semibold hover:bg-cyan/80 transition"
        >
          <Plus size={20} />
          Add Education
        </button>
      </div>

      {showForm && (
        <div className="mb-8">
          <EducationForm 
            education={editingEducation} 
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingEducation(null);
            }}
          />
        </div>
      )}

      {loading ? (
        <div className="text-center text-gray-400">Loading educations...</div>
      ) : educations.length === 0 ? (
        <div className="text-center text-gray-400">No educations yet. Add one to get started!</div>
      ) : (
        <div className="space-y-4">
          {educations.map((edu) => (
            <div key={edu._id} className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-cyan/50 transition">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                  <p className="text-cyan">{edu.school}</p>
                  <p className="text-gray-400 text-sm">
                    {edu.fieldOfStudy && `${edu.fieldOfStudy} • `}
                    {new Date(edu.startDate).toLocaleDateString()} - {new Date(edu.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingEducation(edu);
                      setShowForm(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(edu._id)}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              {edu.description && (
                <p className="text-gray-300">{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Education;
