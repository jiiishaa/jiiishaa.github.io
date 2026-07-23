const mongoose = require('mongoose');

const skillSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    icon: { type: String }, // e.g., 'FaReact' or image URL
    level: { type: Number, required: true }, // percentage 0-100
    category: { type: String, required: true }, // e.g., 'Frontend', 'Backend', 'Tools'
  },
  { timestamps: true }
);

module.exports = mongoose.model('Skill', skillSchema);
