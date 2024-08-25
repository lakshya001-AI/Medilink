const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
    doctorMobNumber:{type:String, required:true},
    doctorDOB:{type:String, required:true},
    doctorPassword:{type:String, required:true},
    doctorState:{type:String, required:true},
    doctorCity:{type:String, required:true},
    hospitalOrClinic:{type:String, required:true},
    HCAddress:{type:String, required:true},
    doctorSpecialization:{type:String, required:true},
    doctorMedicalDegree:{type:String, required:true},
    doctorID:{type:String, required:true},
    doctorName:{type:String,required:true},
    doctorEmail:{type:String,required:true},
    doctorAadhaarNumber:{type:String, required:true},
    doctorFileName:{type:String,required:true}
});

const doctorModel = mongoose.model("doctorModel",doctorSchema);
module.exports = doctorModel;