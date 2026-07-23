import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Trash2, Edit, Plus } from 'lucide-react';
import api from '../services/api';
import SkillForm from '../components/SkillForm';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const response = await api.get('/skills');
      setSkills(response.data);
    } catch (error) {
      toast.error('Failed to fetch skills');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await api.delete(`/skills/${id}`);
        setSkills(skills.filter(s => s._id !== id));
        toast.success('Skill deleted');
      } catch (error) {
        toast.error('Failed to delete skill');
      }
    }
  };

  const handleFormSubmit = () => {
    setEditingSkill(null);
    setShowForm(false);
    fetchSkills();
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-cyan">Skills</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-cyan text-navy px-4 py-2 rounded font-semibold hover:bg-cyan/80 transition"
        >
          <Plus size={20} />
          Add Skill
        </button>
      </div>

      {showForm && (
        <div className="mb-8">
          <SkillForm 
            skill={editingSkill} 
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingSkill(null);
            }}
          />
        </div>
      )}

      {loading ? (
        <div className="text-center text-gray-400">Loading skills...</div>
      ) : skills.length === 0 ? (
        <div className="text-center text-gray-400">No skills yet. Add one to get started!</div>
      ) : (
        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-900 border-b border-slate-700">
              <tr>
                <th className="px-6 py-4 text-left text-cyan font-semibold">Skill</th>
                <th className="px-6 py-4 text-left text-cyan font-semibold">Category</th>
                <th className="px-6 py-4 text-left text-cyan font-semibold">Proficiency</th>
                <th className="px-6 py-4 text-left text-cyan font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr key={skill._id} className="border-b border-slate-700 hover:bg-slate-700/50 transition">
                  <td className="px-6 py-4 text-white font-medium">{skill.name}</td>
                  <td className="px-6 py-4 text-gray-300">{skill.category || '-'}</td>
                  <td className="px-6 py-4 text-gray-300">
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-cyan h-2 rounded-full" 
                          style={{ width: `${skill.proficiency || 0}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{skill.proficiency || 0}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingSkill(skill);
                          setShowForm(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(skill._id)}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Skills;
