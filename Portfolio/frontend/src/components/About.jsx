import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-24 relative bg-navy/50">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-cyan blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-2xl" />
              {/* User needs to add profile.jpg to public folder */}
              <img 
                src="/profile.jpg" 
                alt="About Me" 
                className="relative rounded-2xl border border-white/10 z-10 grayscale hover:grayscale-0 transition-all duration-500 shadow-2xl object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop"; // Professional female placeholder
                }}
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Career <span className="text-cyan text-glow">Objective</span>
            </h2>
            <div className="w-16 h-1 bg-cyan rounded-full shadow-[0_0_10px_rgba(0,229,255,0.5)]" />
            
            <p className="text-gray-300 text-lg leading-relaxed">
              I am a motivated and enthusiastic Computer Science and Engineering student seeking an opportunity to apply my technical knowledge and develop professional skills in a dynamic work environment.
            </p>
            
            <p className="text-gray-400 leading-relaxed">
              I am eager to contribute to organizational growth while continuously learning and gaining practical experience in the IT industry. With a strong foundation in modern web technologies and a passion for Artificial Intelligence, I thrive on turning complex problems into elegant, user-centric solutions.
            </p>
            
            <div className="pt-4 flex gap-4">
              <a href="#contact" className="btn-primary">Let's Talk</a>
              <a href="#projects" className="btn-outline">View Work</a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
