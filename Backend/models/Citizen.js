const mongoose = require('mongoose');

const citizenSchema = new mongoose.Schema({
  citizenId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  reportsCount: {
    type: Number,
    default: 0,
  },
  joinDate: {
    type: String,
    required: true,
    default: () => new Date().toISOString().split('T')[0],
  },
}, {
  timestamps: true,
});

const Citizen = mongoose.model('Citizen', citizenSchema);

module.exports = Citizen;
