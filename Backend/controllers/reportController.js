const Report = require('../models/Report');

// @desc    Get all reports
// @route   GET /api/reports
// @access  Public
const getReports = async (req, res) => {
  try {
    const reports = await Report.find({}).sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new report
// @route   POST /api/reports
// @access  Public
const createReport = async (req, res) => {
  try {
    const { category, description, location, urgency, user } = req.body;
    
    const trackingId = `REP-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    const report = new Report({
      trackingId,
      category,
      description,
      location,
      urgency,
      user,
    });

    const createdReport = await report.save();
    res.status(201).json(createdReport);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update report status
// @route   PUT /api/reports/:id/status
// @access  Private/Admin
const updateReportStatus = async (req, res) => {
  try {
    const { status, adminComment } = req.body;
    const report = await Report.findById(req.params.id);

    if (report) {
      report.status = status || report.status;
      report.adminComment = adminComment || report.adminComment;

      const updatedReport = await report.save();
      res.json(updatedReport);
    } else {
      res.status(404).json({ message: 'Report not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Assign report to department/staff
// @route   PUT /api/reports/:id/assign
// @access  Private/Admin
const assignReport = async (req, res) => {
  try {
    const { assignedDept, assignedStaff, adminComment } = req.body;
    const report = await Report.findById(req.params.id);

    if (report) {
      report.status = 'progress';
      report.assignedDept = assignedDept || report.assignedDept;
      report.assignedStaff = assignedStaff || report.assignedStaff;
      report.adminComment = adminComment || report.adminComment;

      const updatedReport = await report.save();
      res.json(updatedReport);
    } else {
      res.status(404).json({ message: 'Report not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete report
// @route   DELETE /api/reports/:id
// @access  Private/Admin
const deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (report) {
      await report.deleteOne();
      res.json({ message: 'Report removed' });
    } else {
      res.status(404).json({ message: 'Report not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getReports,
  createReport,
  updateReportStatus,
  assignReport,
  deleteReport,
};
