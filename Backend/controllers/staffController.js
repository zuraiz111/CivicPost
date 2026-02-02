const Staff = require('../models/Staff');

// @desc    Get all staff
// @route   GET /api/staff
// @access  Private/Admin
const getStaff = async (req, res) => {
  try {
    const staff = await Staff.find({}).sort({ createdAt: -1 });
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add new staff member
// @route   POST /api/staff
// @access  Private/Admin
const addStaff = async (req, res) => {
  try {
    const { name, role, department, phone } = req.body;
    
    const count = await Staff.countDocuments();
    const staffId = `STF-${(count + 1).toString().padStart(3, '0')}`;

    const staffMember = new Staff({
      staffId,
      name,
      role,
      department,
      phone,
    });

    const createdStaff = await staffMember.save();
    res.status(201).json(createdStaff);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update staff status
// @route   PUT /api/staff/:id/status
// @access  Private/Admin
const updateStaffStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const staffMember = await Staff.findById(req.params.id);

    if (staffMember) {
      staffMember.status = status || staffMember.status;
      const updatedStaff = await staffMember.save();
      res.json(updatedStaff);
    } else {
      res.status(404).json({ message: 'Staff member not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete staff member
// @route   DELETE /api/staff/:id
// @access  Private/Admin
const deleteStaff = async (req, res) => {
  try {
    const staffMember = await Staff.findById(req.params.id);

    if (staffMember) {
      await staffMember.deleteOne();
      res.json({ message: 'Staff member removed' });
    } else {
      res.status(404).json({ message: 'Staff member not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStaff,
  addStaff,
  updateStaffStatus,
  deleteStaff,
};
