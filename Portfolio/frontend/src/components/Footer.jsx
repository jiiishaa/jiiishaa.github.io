import React from 'react';
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="py-8 bg-navy border-t border-white/5 relative z-10">
      <div className="container mx-auto px-6 text-center">
        <p className="text-gray-400 flex items-center justify-center space-x-2">
          <span>Built with</span>
          <FaHeart className="text-cyan animate-pulse" size={14} />
          <span>by Jisha Jayaprakash © {new Date().getFullYear()}</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
