const mongoose = require("mongoose");

const recordSchema = mongoose.Schema({
    hospitalName: String,
    mDoctorName: String,
    testName: String,
    testResultFile: String,
    prescriptionFile: String,
    reasonPara: String,
    createdAt: { type: Date, default: Date.now }
});

const patientSchema = mongoose.Schema({
    patientID: String,
    patientRecords: [recordSchema]
});

const patientRecordModel = mongoose.model("patientRecordModel", patientSchema);
module.exports = patientRecordModel;

