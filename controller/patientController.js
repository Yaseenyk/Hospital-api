const Patient = require("../models/Patients");
const Report = require('../models/Reports')
const jwt = require("jsonwebtoken");
const config = require("../config/config");

exports.regsiter = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const existingPatient = await Patient.findOne({ phoneNumber });

    if (existingPatient) {
      return res.status(200).json(existingPatient)
    }
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, config.secretKey);
    const doctorId = decodedToken._id;
    const patient = new Patient({ phoneNumber, createdBy: doctorId });
    const savedPatient = await patient.save();

    res
      .status(201)
      .json({
        message: "Patient registered successfully",
        patient: savedPatient,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Registration failed" });
  }
};

exports.createReport = async (req, res) => {
    try {
      const { status } = req.body;
      const { id } = req.params;
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, config.secretKey);
      const doctorId = decodedToken._id;
  
      const patient = await Patient.findById(id);
  
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
  
      const report = new Report({ createdBy:doctorId, status, patient: patient._id });
      const savedReport = await report.save();
  
      res.status(201).json({ message: 'Report created successfully', report: savedReport });
    } catch (error) {
      res.status(500).json({ error: 'Report creation failed' });
    }
  };

  exports.getAllReportsByPatient = async (req, res) => {
    try {
      const { id } = req.params;
  
      const reports = await Report.find({ patient: id }).sort({ date: 'asc' });
  
      res.json({ reports });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch reports' });
    }
  };
