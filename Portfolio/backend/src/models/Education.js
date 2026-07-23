const mongoose = require('mongoose');

const educationSchema = mongoose.Schema(
  {
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    location: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    current: { type: Boolean, default: false },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Education', educationSchema);
