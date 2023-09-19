const Doctor = require('../models/Doctors');
const {secretKey} = require('../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
exports.registerDoctor = async(req, res)=>{
    // console.log(req.body);
    try {
        
        const { username, password } = req.body;

        const existingDoctor = await Doctor.findOne({ username });
    
        if (existingDoctor) {
          return res.status(400).json({ error: 'Username already exists' });
        }
    
        const doctor = new Doctor({ username, password });
        const savedDoctor = await doctor.save();
    
        res.status(201).json({ message: 'Doctor registered successfully', doctor: savedDoctor });
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Registration failed' });
      }
}

exports.login = async(req, res)=>{
    console.log(req.body)
    try {
        const { username, password } = req.body;
        // Check if the doctor exists
        const doctor = await Doctor.findOne({ username });
    
        if (!doctor) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
    
        // Check if the provided password matches the stored hashed password
        const passwordMatch = await bcrypt.compare(password, doctor.password);
    
        if (!passwordMatch) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
    
        // Generate a JWT token
        const token = jwt.sign({ _id: doctor._id, username: doctor.username }, secretKey);
    
        res.json({ token });
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Login failed' });
      }
}