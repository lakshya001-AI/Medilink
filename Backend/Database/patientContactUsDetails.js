const mongoose = require("mongoose");

const PatientContactUsSchema = mongoose.Schema({
  pcName: String,
  pcEmail: String,
  pcMobileNumber: String,
  pcMessage: String,
});

const PatientContactUsModel = mongoose.model(
  "PatientContactUsDetails",
  PatientContactUsSchema
);

module.exports = PatientContactUsModel;
