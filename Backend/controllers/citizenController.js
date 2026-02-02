const Citizen = require('../models/Citizen');

// @desc    Get all citizens
// @route   GET /api/citizens
// @access  Private/Admin
const getCitizens = async (req, res) => {
  try {
    const citizens = await Citizen.find({}).sort({ createdAt: -1 });
    res.json(citizens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete citizen
// @route   DELETE /api/citizens/:id
// @access  Private/Admin
const deleteCitizen = async (req, res) => {
  try {
    const citizen = await Citizen.findById(req.params.id);

    if (citizen) {
      await citizen.deleteOne();
      res.json({ message: 'Citizen removed' });
    } else {
      res.status(404).json({ message: 'Citizen not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCitizens,
  deleteCitizen,
};
