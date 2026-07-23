import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from 'react-icons/fa';
import CanvasBackground from './CanvasBackground';
import useTypingEffect from '../hooks/useTypingEffect';

const Hero = () => {
  const text = useTypingEffect(['Computer Science Student', 'Frontend Developer', 'Tech Enthusiast'], 100, 2000);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <CanvasBackground />
      </div>
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 text-center lg:text-left mt-12 lg:mt-0 relative z-10"
          >
            <h2 className="text-cyan font-semibold tracking-wider uppercase mb-4 text-sm md:text-base">
              Welcome to my universe
            </h2>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              Hi, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-blue-500 text-glow">
                Jisha Jayaprakash
              </span>
            </h1>
            <div className="text-xl md:text-3xl font-medium text-gray-300 mb-8 h-10">
              <span className="mr-2">I am a</span>
              <span className="text-cyan font-bold">{text}</span>
              <span className="animate-ping ml-1 text-cyan">|</span>
            </div>
            
            <p className="text-gray-400 text-lg mb-8 max-w-lg leading-relaxed mx-auto lg:mx-0">
              Motivated Computer Science & Engineering student eager to apply technical knowledge and develop professional skills in a dynamic work environment.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
              <a href="#projects" className="btn-primary w-full sm:w-auto">
                Explore Work
              </a>
              <a href="#contact" className="btn-outline flex items-center justify-center w-full sm:w-auto space-x-2">
                <span>Contact Me</span>
              </a>
            </div>

            <div className="flex items-center justify-center lg:justify-start space-x-6">
              <a href="https://github.com/jiiishaa" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan hover:drop-shadow-[0_0_10px_rgba(0,229,255,0.8)] transition-all duration-300 transform hover:scale-110">
                <FaGithub size={28} />
              </a>
              <a href="https://linkedin.com/in/jisha-j-343213291" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan hover:drop-shadow-[0_0_10px_rgba(0,229,255,0.8)] transition-all duration-300 transform hover:scale-110">
                <FaLinkedin size={28} />
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 flex justify-center lg:justify-end relative z-10"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-2 bg-gradient-to-tr from-cyan to-blue-600 animate-pulse-slow shadow-[0_0_40px_rgba(0,229,255,0.4)]">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-navy relative bg-navy flex items-center justify-center">
                {/* User needs to add their own image to the public folder, using a placeholder for now */}
                <img 
                  src="/profile.jpg" 
                  alt="Jisha Jayaprakash" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"; // Professional female placeholder
                  }}
                />
                <div className="absolute inset-0 bg-cyan/10 mix-blend-overlay"></div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10"
      >
        <span className="text-gray-400 text-sm mb-2 uppercase tracking-widest font-semibold">Scroll</span>
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-3 bg-cyan rounded-full shadow-[0_0_5px_rgba(0,229,255,0.8)]"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
