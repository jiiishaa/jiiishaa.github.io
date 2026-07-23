import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import api from '../services/api';

const fallbackProjectsData = [
  {
    _id: '1',
    title: 'StreakStorm',
    category: 'Full Stack',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=800&auto=format&fit=crop',
    description: 'Habit Tracking & Productivity Platform. Helps users build and maintain daily habits through streak tracking and goal management. Developed a responsive web application with user authentication and progress tracking.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'HTML', 'CSS', 'JavaScript'],
    githubUrl: 'https://github.com/jiiishaa',
    liveUrl: '',
  },
  {
    _id: '2',
    title: 'MediCare',
    category: 'Full Stack',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
    description: 'Healthcare Management System. Simplifies patient registration, appointment booking, and healthcare record management. Built a secure and responsive healthcare management system with database integration.',
    technologies: ['MERN Stack', 'HTML', 'CSS', 'JavaScript'],
    githubUrl: 'https://github.com/jiiishaa',
    liveUrl: '',
  }
];

const categories = ['All', 'Full Stack'];

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-navy/80 backdrop-blur-md"
      >
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl glass-card overflow-hidden cursor-auto"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-navy/50 text-white hover:bg-cyan hover:text-navy transition-colors"
          >
            <FaTimes size={20} />
          </button>
          
          <div className="h-64 md:h-80 w-full relative">
            <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent z-10" />
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          </div>
          
          <div className="p-8 relative z-20 -mt-20">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-cyan/20 text-cyan border border-cyan/30 mb-4 inline-block">
              {project.category}
            </span>
            <h3 className="text-3xl font-bold text-white mb-4 text-glow">{project.title}</h3>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {project.technologies.map((tech, idx) => (
                <span key={idx} className="px-4 py-2 text-sm bg-white/5 border border-white/10 rounded-md text-gray-300">
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="flex space-x-4 border-t border-white/10 pt-6">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-primary flex items-center space-x-2">
                  <span>Live Demo</span>
                  <FaExternalLinkAlt size={14} />
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-outline flex items-center space-x-2">
                  <FaGithub size={18} />
                  <span>Source Code</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectsData, setProjectsData] = useState([]);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await api.get('/projects');
        if (data && data.length > 0) {
          setProjectsData(data);
        } else {
          setProjectsData(fallbackProjectsData);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjectsData(fallbackProjectsData);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = filter === 'All' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-4"
          >
            Featured <span className="text-cyan text-glow">Projects</span>
          </motion.h2>
          <div className="w-24 h-1 bg-cyan mx-auto rounded-full shadow-[0_0_10px_rgba(0,229,255,0.5)] mb-10" />
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  filter === cat 
                    ? 'bg-cyan text-navy font-bold shadow-[0_0_15px_rgba(0,229,255,0.4)]' 
                    : 'bg-white/5 text-gray-300 border border-white/10 hover:border-cyan/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                key={project._id}
                onClick={() => setSelectedProject(project)}
                className="glass-card group cursor-none overflow-hidden"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent opacity-80 z-10" />
                  
                  <div className="absolute bottom-0 left-0 p-6 z-20 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-cyan font-semibold text-sm mb-2 block">{project.category}</span>
                    <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
};

export default Projects;
