const express = require('express');
const router = express.Router();
const {
  getStaff,
  addStaff,
  updateStaffStatus,
  deleteStaff,
} = require('../controllers/staffController');

router.route('/').get(getStaff).post(addStaff);
router.route('/:id/status').put(updateStaffStatus);
router.route('/:id').delete(deleteStaff);

module.exports = router;
