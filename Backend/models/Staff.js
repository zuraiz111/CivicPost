const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  staffId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  phone: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
