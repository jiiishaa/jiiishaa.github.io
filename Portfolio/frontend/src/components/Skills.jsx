import React from 'react';
import { motion } from 'framer-motion';

const skillsData = [
  { name: 'Python', level: 90 },
  { name: 'JavaScript', level: 85 },
  { name: 'Java', level: 80 },
  { name: 'HTML5 & CSS3', level: 90 },
  { name: 'React.js & Node.js', level: 75 },
  { name: 'MongoDB', level: 80 },
  { name: 'Power BI & Excel', level: 75 },
  { name: 'Git & GitHub', level: 85 },
];

const SkillCard = ({ skill, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="glass-card p-6 group hover:-translate-y-1 transition-transform duration-300"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white group-hover:text-cyan transition-colors">{skill.name}</h3>
        <span className="text-cyan font-semibold">{skill.level}%</span>
      </div>
      
      <div className="w-full bg-navy/50 rounded-full h-3 overflow-hidden border border-white/5">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-cyan to-blue-500 h-full rounded-full shadow-[0_0_10px_rgba(0,229,255,0.5)]"
        />
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-4"
          >
            Technical <span className="text-cyan text-glow">Skills</span>
          </motion.h2>
          <div className="w-24 h-1 bg-cyan mx-auto rounded-full shadow-[0_0_10px_rgba(0,229,255,0.5)]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skillsData.map((skill, index) => (
            <SkillCard key={index} skill={skill} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
