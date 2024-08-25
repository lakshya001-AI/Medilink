const express = require("express");
const app = express();
const dotenv = require("dotenv");
const ConnectMongoose = require("./Database/connection");
const PatientModel = require("./Database/patientModel");
const bcrypt = require("bcrypt");
const cors = require("cors");
const doctorModel = require("./Database/doctorModel");
dotenv.config();
const multer = require("multer");
ConnectMongoose();

app.use(cors());
app.use(express.json());

// ----------- Multer Setup for Doctor Proof -------------- //

// -------------- Patient Data Store -------------- //
app.post("/PatientCreateAccount", async (req, res) => {
  try {
    const {
      pName,
      pEmail,
      pdOB,
      pMobNo,
      pState,
      pCity,
      pAadhaarNo,
      pConfirmPassword,
      patientID,
    } = req.body;
    const PatientExits = await PatientModel.findOne({ PAadhaarNO: pAadhaarNo });
    if (!PatientExits) {
      // Change the Password to Hash Password
      const hashPassword = await bcrypt.hash(pConfirmPassword, 10);
      const PatientCreated = await PatientModel.create({
        PName: pName,
        PEmail: pEmail,
        PMobileNO: pMobNo,
        PAadhaarNO: pAadhaarNo,
        PDob: pdOB,
        PState: pState,
        PCity: pCity,
        PPassword: hashPassword,
        PatientID: patientID,
      });
      // console.log(PatientCreated);
      res.status(200).send({ message: "Patient Account Created" });
    } else {
      res.status(400).send({ message: "Patient Already Exits" });
    }
  } catch (error) {
    res.status(500).send({
      message:
        "An Error Occurred status code 500 , while creating the Patient Account",
      error,
    });
    console.log(error);
  }
});

// -------------- Patient login -------------- //

app.post("/patientLogin", async (req, res) => {
  try {
    const { patientID, patientPassword } = req.body;
    const pExits = await PatientModel.findOne({ PatientID: patientID }); // here we are going to find out the patient using the patientID
    if (pExits) {
      const PatientPasswordCheck = await bcrypt.compare(
        patientPassword,
        pExits.PPassword
      );
      if (PatientPasswordCheck) {
        res.status(200).send({ message: "loggedIn Successfully" });
      } else {
        res.status(401).send({ message: "Password Incorrect" });
      }
    } else {
      res.status(400).send({ message: "Account not Found" });
    }
  } catch (error) {
    res.status(500).send({ message: "External Error Occurred" });
  }
});

// -------------- Doctor Account Creation -------------- //

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    // const fileExt = file.originalname.split(".").pop();
    const data = file.originalname.split(".");
    const fileExt = data.pop();
    const fname = data.pop();

    // cb(null,file.fieldname+"-"+uniqueSuffix+"."+fileExt);
    cb(null, fname + "-" + uniqueSuffix + "." + fileExt);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 5,
  },
});

app.post(
  "/createDoctorAccount",
  upload.single("doctorFileName"),
  async (req, res) => {
    try {
      const {
        doctorName,
        doctorEmail,
        doctorMobNumber,
        doctorAadhaarNumber,
        doctorDOB,
        doctorState,
        doctorCity,
        dConfirmPassword,
        hospitalOrClinic,
        HCAddress,
        doctorSpecialization,
        doctorMedicalDegree,
        doctorID,
      } = req.body;

      const filename = req.file.filename;
      const hashDoctorPassword = await bcrypt.hash(dConfirmPassword, 10);

      const doctor = await doctorModel.create({
        doctorName,
        doctorEmail,
        doctorMobNumber,
        doctorAadhaarNumber,
        doctorDOB,
        doctorState,
        doctorCity,
        doctorPassword: hashDoctorPassword,
        hospitalOrClinic,
        HCAddress,
        doctorSpecialization,
        doctorMedicalDegree,
        doctorID,
        doctorFileName: filename,
      });
      res.status(200).send({ message: "Doctor Registered Successfully" });
    } catch (error) {
      res.status(500).send({ message: "An Error Occurred", error });
    }
  }
);

// ------------- Doctors login route --------------- //

app.post("/doctorLogin", async (req, res) => {
  try {
    const { doctorID, doctorPassword } = req.body;
    const doctor = await doctorModel.findOne({ doctorID: doctorID });
    if (doctor) {
      const compareDoctorPassword = await bcrypt.compare(
        doctorPassword,
        doctor.doctorPassword
      );
      if (compareDoctorPassword) {
        res.status(200).send({ message: "doctor login successful" });
      } else {
        res.status(401).send({ message: "Doctor Password is Incorrect" });
      }
    } else {
      res.status(400).send("Account not found! Please create your Account");
    }
  } catch (error) {
    res.status(500).send({ message: "An error occurred" });
  }
});

// ---------------- change patient password -------------------- //

app.post("/changePatientPassword", async (req, res) => {
  try {
    const { FPatientID, pNewPassword, pConfirmPassword } = req.body;
    const patient = await PatientModel.findOne({ PatientID: FPatientID });
    if (patient) {
      const hashChangePassword = await bcrypt.hash(pConfirmPassword, 10);
      await PatientModel.findOneAndUpdate(
        { PatientID: FPatientID },
        { PPassword: hashChangePassword }
      );
      res.status(200).send({ message: "Password updated successfully!" });
    } else {
      res
        .status(400)
        .send({ message: "Account not Found or Patient Id is incorrect!" });
    }
  } catch (error) {
    res.status(500).send({ message: "External Error", error });
  }
});

// ------------------ get the patient ID ---------------------- //

app.post("/getPatientID", async (req, res) => {
  try {
    const { pAadhaarNo } = req.body;
    const patient = await PatientModel.findOne({ PAadhaarNO: pAadhaarNo });
    if (patient) {
      const pID = patient.PatientID;
      res.status(200).send({ message: "Patient ID Found", pID });
    } else {
      res
        .status(400)
        .send({ message: "Account not found or Aadhaar Number is incorrect" });
    }
  } catch (error) {
    res.status(500).send({ message: "External Error!", error });
  }
});

// ---------------- change doctor password -------------------- //

app.post("/changeDoctorPassword", async (req, res) => {
  try {
    const { FDoctorID, dNewPassword, dConfirmPassword } = req.body;
    const doctor = await doctorModel.findOne({ doctorID: FDoctorID });
    if (doctor) {
      const hashChangePassword = await bcrypt.hash(dConfirmPassword, 10);
      await doctorModel.findOneAndUpdate(
        { doctorID: FDoctorID },
        { doctorPassword: hashChangePassword }
      );
      res.status(200).send({ message: "Password updated successfully!" });
    } else {
      res
        .status(400)
        .send({ message: "Account not Found or Patient Id is incorrect!" });
    }
  } catch (error) {
    res.status(500).send({ message: "External Error", error });
  }
});

// ------------------ get the Doctor ID ---------------------- //

app.post("/getDoctorID", async (req, res) => {
  try {
    const { dAadhaarNo } = req.body;
    const doctor = await doctorModel.findOne({
      doctorAadhaarNumber: dAadhaarNo,
    });
    if (doctor) {
      const dID = doctor.doctorID;
      res.status(200).send({ message: "Patient ID Found", dID });
    } else {
      res
        .status(400)
        .send({ message: "Account not found or Aadhaar Number is incorrect" });
    }
  } catch (error) {
    res.status(500).send({ message: "External Error!", error });
  }
});

// ------------------ patient contactUs Details ---------------------- //

app.post("/patientContactUsDetails", (req, res) => {
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
