import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const Counter = ({ target, duration = 2, suffix = '+' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTime;
      let animationFrame;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (duration * 1000);

        if (progress < 1) {
          setCount(Math.floor(target * progress));
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(target);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-extrabold text-white text-glow">
      {count}{suffix}
    </span>
  );
};

const Stats = () => {
  const statsData = [
    { target: 10, label: 'Years of experience' },
    { target: 30, label: 'Projects completed' },
    { target: 5, label: 'Technologies mastered' },
    { target: 100, label: 'Satisfied Client' },
  ];

  return (
    <section className="py-20 relative z-10 border-y border-white/10 bg-navy-light/30 backdrop-blur-sm">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10 text-center">
          {statsData.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center p-4"
            >
              <Counter target={stat.target} />
              <span className="text-gray-400 mt-2 text-sm md:text-base max-w-[120px]">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
