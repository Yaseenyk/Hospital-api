const mongoose = require("mongoose");
const Doctor = require("./Doctors");
const reprtSchema = new mongoose.Schema({
  createdBy: { type: mongoose.Schema.ObjectId, ref: "Doctor" },
  status: {
    type: String,
    enum: ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'],
    default: 'Positive-Admit', // Default status if not provided
  },
  date:Date,
  patient:{
    type:mongoose.Schema.ObjectId,
    ref:'Patients'
  }
});

const Reports = mongoose.model('Reports',reprtSchema);

module.exports = Reports;