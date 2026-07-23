import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Trash2, Edit, Plus } from 'lucide-react';
import api from '../services/api';
import ExperienceForm from '../components/ExperienceForm';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const response = await api.get('/experience');
      setExperiences(response.data);
    } catch (error) {
      toast.error('Failed to fetch experiences');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        await api.delete(`/experience/${id}`);
        setExperiences(experiences.filter(e => e._id !== id));
        toast.success('Experience deleted');
      } catch (error) {
        toast.error('Failed to delete experience');
      }
    }
  };

  const handleFormSubmit = () => {
    setEditingExperience(null);
    setShowForm(false);
    fetchExperiences();
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-cyan">Experience</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-cyan text-navy px-4 py-2 rounded font-semibold hover:bg-cyan/80 transition"
        >
          <Plus size={20} />
          Add Experience
        </button>
      </div>

      {showForm && (
        <div className="mb-8">
          <ExperienceForm 
            experience={editingExperience} 
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingExperience(null);
            }}
          />
        </div>
      )}

      {loading ? (
        <div className="text-center text-gray-400">Loading experiences...</div>
      ) : experiences.length === 0 ? (
        <div className="text-center text-gray-400">No experiences yet. Add one to get started!</div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp._id} className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-cyan/50 transition">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{exp.jobTitle}</h3>
                  <p className="text-cyan">{exp.company}</p>
                  <p className="text-gray-400 text-sm">
                    {new Date(exp.startDate).toLocaleDateString()} - {exp.currentlyWorking ? 'Present' : new Date(exp.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingExperience(exp);
                      setShowForm(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(exp._id)}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              {exp.description && (
                <p className="text-gray-300">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Experience;
