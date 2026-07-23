const mongoose = require('mongoose');

const experienceSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date }, // null if current
    current: { type: Boolean, default: false },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Experience', experienceSchema);
