const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  trackingId: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: String,
    required: true,
    default: "Guest User",
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'progress', 'resolved', 'critical'],
    default: 'pending',
  },
  urgency: {
    type: String,
    required: true,
    enum: ['Low', 'Normal', 'Urgent', 'Medium', 'Critical'],
    default: 'Normal',
  },
  assignedDept: {
    type: String,
    default: null,
  },
  assignedStaff: {
    type: String,
    default: null,
  },
  adminComment: {
    type: String,
    default: null,
  },
  image: {
    type: String,
    default: null,
  },
}, {
  timestamps: true,
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
