import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-navy"
    >
      <div className="relative flex items-center justify-center">
        {/* Outer glowing ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 rounded-full border-4 border-transparent border-t-cyan border-r-cyan/30 shadow-[0_0_15px_rgba(0,229,255,0.5)]"
        />
        {/* Inner glowing ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute w-24 h-24 rounded-full border-4 border-transparent border-b-cyan border-l-cyan/30 shadow-[0_0_10px_rgba(0,229,255,0.3)]"
        />
        {/* Center text */}
        <div className="absolute text-cyan font-bold text-xl tracking-widest text-glow">
          LOADING
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
