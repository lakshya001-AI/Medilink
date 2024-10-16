const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  patientId: { type: String, required: true },
  patientProblem: { type: String, required: true },
  appointmentDate: { type: String, required: true }, // You might want to use Date type
});

const doctorSchema = mongoose.Schema({
  doctorMobNumber: { type: String, required: true },
  doctorDOB: { type: String, required: true },
  doctorPassword: { type: String, required: true },
  doctorState: { type: String, required: true },
  doctorCity: { type: String, required: true },
  hospitalOrClinic: { type: String, required: true },
  HCAddress: { type: String, required: true },
  doctorSpecialization: { type: String, required: true },
  doctorMedicalDegree: { type: String, required: true },
  doctorID: { type: String, required: true },
  doctorName: { type: String, required: true },
  doctorEmail: { type: String, required: true },
  doctorAadhaarNumber: { type: String, required: true },
  doctorFileName: { type: String, required: true },
  appointments: [appointmentSchema], // Adding appointments array
});

const doctorModel = mongoose.model("doctorModel", doctorSchema);
module.exports = doctorModel;
