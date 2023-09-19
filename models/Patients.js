const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    createdBy:String,
    status: {
        type: String,
        enum: ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'],
        default: 'Positive-Admit',
      },
    phoneNumber:Number,
    date:Date,
    
});


const Patients = mongoose.model("Patients",patientSchema);

module.exports = Patients;