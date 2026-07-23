import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

const experienceData = [
  {
    id: 1,
    role: 'Artificial Intelligence Intern',
    company: 'Aaruudhara Innovation Solutions',
    period: 'Recent',
    description: 'Learned the fundamentals of Artificial Intelligence and Machine Learning through practical exercises.',
  },
  {
    id: 2,
    role: 'Web Development Intern',
    company: 'Cloud Logic Accelerate Innovation',
    period: 'Recent',
    description: 'Developed responsive web pages using HTML, CSS, and JavaScript.',
  },
  {
    id: 3,
    role: 'Python Programming Intern',
    company: 'Nexgen Technology',
    period: 'Recent',
    description: 'Practiced problem-solving using core Python concepts, including functions and file handling.',
  }
];

const ExperienceCard = ({ exp, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} mb-16 relative z-10`}
    >
      {/* Content */}
      <div className="w-full md:w-5/12 glass-card p-8 group hover:-translate-y-2 transition-transform duration-300">
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan transition-colors">{exp.role}</h3>
        <div className="flex items-center space-x-2 text-cyan mb-4">
          <Briefcase size={16} />
          <span className="font-semibold">{exp.company}</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          {exp.description}
        </p>
      </div>

      {/* Timeline Node */}
      <div className="hidden md:flex w-2/12 justify-center relative">
        <div className="w-12 h-12 rounded-full bg-navy border-4 border-cyan flex items-center justify-center z-10 shadow-[0_0_15px_rgba(0,229,255,0.5)]">
          <div className="w-3 h-3 bg-cyan rounded-full animate-pulse" />
        </div>
      </div>

      {/* Date */}
      <div className="w-full md:w-5/12 flex items-center justify-start md:justify-center text-gray-300 font-semibold space-x-2">
        <Calendar size={18} className="text-cyan" />
        <span>{exp.period}</span>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="py-24 relative" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-12 relative">
        
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            My <span className="text-cyan text-glow">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-cyan mx-auto rounded-full shadow-[0_0_10px_rgba(0,229,255,0.5)]" />
        </div>

        <div className="relative">
          {/* Central Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-white/10 -translate-x-1/2 z-0 rounded-full overflow-hidden">
             <motion.div 
               className="w-full bg-cyan origin-top shadow-[0_0_10px_rgba(0,229,255,0.8)]"
               style={{ scaleY, height: '100%' }}
             />
          </div>

          {/* Experience Items */}
          <div className="space-y-12 md:space-y-0">
            {experienceData.map((exp, index) => (
              <ExperienceCard key={exp.id} exp={exp} index={index} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;
