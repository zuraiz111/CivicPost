const express = require('express');
const router = express.Router();
const {
  getReports,
  createReport,
  updateReportStatus,
  assignReport,
  deleteReport,
} = require('../controllers/reportController');

router.route('/').get(getReports).post(createReport);
router.route('/:id/status').put(updateReportStatus);
router.route('/:id/assign').put(assignReport);
router.route('/:id').delete(deleteReport);

module.exports = router;
