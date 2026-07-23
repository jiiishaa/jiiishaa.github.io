const mongoose = require('mongoose');

const projectSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true }, // e.g., 'Web', 'Mobile', 'UI/UX'
    image: { type: String, required: true }, // URL from Cloudinary
    githubUrl: { type: String },
    liveUrl: { type: String },
    technologies: [{ type: String }],
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
