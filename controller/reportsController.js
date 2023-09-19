const Report = require('../models/Reports');

// Get all reports by status
const getAllReportsByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    const reports = await Report.find({ status }).sort({ date: 'asc' });

    res.json({ reports });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reports by status' });
  }
};

module.exports = {
  getAllReportsByStatus,
};