import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import api from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      await api.post('/messages', formData);
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      console.error(error);
      setStatus('Failed to send message. Please try again.');
      setTimeout(() => setStatus(''), 3000);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-4"
          >
            Get In <span className="text-cyan text-glow">Touch</span>
          </motion.h2>
          <div className="w-24 h-1 bg-cyan mx-auto rounded-full shadow-[0_0_10px_rgba(0,229,255,0.5)]" />
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Contact Info & Map */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full lg:w-5/12 flex flex-col space-y-8"
          >
            <div className="glass-card p-8 flex-1">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-cyan/10 flex items-center justify-center text-cyan shrink-0">
                    <FaMapMarkerAlt size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Location</h4>
                    <p className="text-gray-400">Puducherry, India</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-cyan/10 flex items-center justify-center text-cyan shrink-0">
                    <FaEnvelope size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Email</h4>
                    <p className="text-gray-400 break-all">jishajayaprakash336@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-cyan/10 flex items-center justify-center text-cyan shrink-0">
                    <FaPhoneAlt size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Phone</h4>
                    <p className="text-gray-400">+91 8778391773</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <h4 className="text-white font-semibold mb-4">Follow Me</h4>
                <div className="flex space-x-4">
                  {[
                    { icon: <FaGithub size={20} />, href: 'https://github.com/jiiishaa' },
                    { icon: <FaLinkedin size={20} />, href: 'https://linkedin.com/in/jisha-j-343213291' },
                  ].map((social, idx) => (
                    <a 
                      key={idx} 
                      href={social.href} 
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-cyan hover:text-cyan hover:shadow-[0_0_15px_rgba(0,229,255,0.5)] transition-all duration-300 text-gray-300"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Mock Google Map */}
            <div className="glass-card h-64 overflow-hidden relative group">
              <div className="absolute inset-0 bg-navy/40 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop" 
                alt="Map location" 
                className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                 <FaMapMarkerAlt size={40} className="text-cyan animate-bounce drop-shadow-[0_0_10px_rgba(0,229,255,0.8)]" />
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full lg:w-7/12"
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Send Me a Message</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-400 mb-2 text-sm font-semibold">Your Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-navy/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan focus:shadow-[0_0_10px_rgba(0,229,255,0.2)] transition-all cursor-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2 text-sm font-semibold">Your Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-navy/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan focus:shadow-[0_0_10px_rgba(0,229,255,0.2)] transition-all cursor-none"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-400 mb-2 text-sm font-semibold">Subject</label>
                  <input 
                    type="text" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-navy/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan focus:shadow-[0_0_10px_rgba(0,229,255,0.2)] transition-all cursor-none"
                  />
                </div>

                <div className="mb-8">
                  <label className="block text-gray-400 mb-2 text-sm font-semibold">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-navy/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan focus:shadow-[0_0_10px_rgba(0,229,255,0.2)] transition-all resize-none cursor-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button type="submit" className="btn-primary flex items-center space-x-2">
                  <span>Send Message</span>
                  <FaPaperPlane size={14} />
                </button>
                {status && (
                  <span className={`text-sm font-semibold ${status.includes('success') ? 'text-green-400' : 'text-cyan'}`}>
                    {status}
                  </span>
                )}
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
