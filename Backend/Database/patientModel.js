const mongoose = require("mongoose");

const PatientSchema = mongoose.Schema({
  // name, email , mobile number, Aadhaar number, DOB, state , City, Password;
  PName: { type: String, required: true },
  PEmail: { type: String, required: true },
  PMobileNO: { type: String, required: true },
  PAadhaarNO: { type: String, required: true },
  PDob: { type: String, required: true },
  PState: { type: String, required: true },
  PCity: { type: String, required: true },
  PPassword: { type: String, required: true },
  PatientID: { type: String, required: true },
  patientAcceptRequests: [],
  patientRejectRequests: []
});

const PatientModel = mongoose.model("PatientModel", PatientSchema);
module.exports = PatientModel;
