const express =require('express');
const doctorController = require('./controller/doctorController');
const patientController = require('./controller/patientController');
const reportsController = require('./controller/reportsController');
const authenticate = require('./middleware/jwttoken');
const router = express.Router();

//Creating jwt and doctor Login
router.post('/doctorRegister',doctorController.registerDoctor);
router.post('/doctorLogin',doctorController.login);

//Patient Register and Report
router.post('/patientRegister',authenticate,patientController.regsiter)
router.post('/:id/createReport',authenticate,patientController.createReport);
router.get('/:id/allReports', authenticate, patientController.getAllReportsByPatient);
router.get('/reports/:status',authenticate,reportsController.getAllReportsByStatus);
module.exports = router;