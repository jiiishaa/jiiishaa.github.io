import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';

const educationData = [
  {
    id: 1,
    degree: 'B.Tech Computer Science and Engineering',
    institution: 'Achariya College of Engineering Technology, Puducherry',
    period: '2023 - 2027',
    description: 'CGPA: 8.85',
  },
  {
    id: 2,
    degree: 'Higher Secondary Certificate (HSC)',
    institution: "St. Joseph's Mat. Hr. Sec. School, Koothapakkam",
    period: '2022 - 2023',
    description: 'Percentage: 82.5%',
  },
  {
    id: 3,
    degree: 'Secondary School Leaving Certificate (SSLC)',
    institution: "St. Joseph's Mat. Hr. Sec. School, Koothapakkam",
    period: '2020 - 2021',
    description: 'Pass',
  }
];

const Education = () => {
  return (
    <section id="education" className="py-24 relative bg-navy-light/20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-4"
          >
            My <span className="text-cyan text-glow">Education</span>
          </motion.h2>
          <div className="w-24 h-1 bg-cyan mx-auto rounded-full shadow-[0_0_10px_rgba(0,229,255,0.5)]" />
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="glass-card p-8 flex flex-col md:flex-row gap-6 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-cyan/50 group-hover:bg-cyan transition-colors" />
              
              <div className="md:w-1/4 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-6">
                <div className="flex items-center space-x-2 text-cyan font-bold mb-2">
                  <GraduationCap size={24} />
                </div>
                <div className="flex items-center space-x-2 text-gray-300 text-sm">
                  <Calendar size={14} className="text-cyan" />
                  <span>{edu.period}</span>
                </div>
              </div>
              
              <div className="md:w-3/4">
                <h3 className="text-2xl font-bold text-white mb-2">{edu.degree}</h3>
                <h4 className="text-lg text-cyan font-semibold mb-4">{edu.institution}</h4>
                <p className="text-gray-400 leading-relaxed">{edu.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
