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
const PatientContactUsModel = require("./Database/patientContactUsDetails");
const patientRecordModel = require("./Database/patientRecordModel");
const path = require("path");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const { getAIResponse } = require("./openaiService");
ConnectMongoose();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

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

app.post("/patientContactUsDetails", async (req, res) => {
  try {
    const { PCName, PCEmail, PCMobileNumber, PCMessage } = req.body;
    await PatientContactUsModel.create({
      pcName: PCName,
      pcEmail: PCEmail,
      pcMobileNumber: PCMobileNumber,
      pcMessage: PCMessage,
    });
    res.status(200).send({ message: "Message sent Successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "An error occurred, while sending the Message" });
  }
});

// --------------------- patient record ---------------------------- //

const storageRecord = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "testResultFile") {
      cb(null, "patientTestFile/");
    } else if (file.fieldname === "prescriptionFile") {
      cb(null, "patientPrescriptionFile/");
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    const data = file.originalname.split(".");
    const fileExt = data.pop();
    const fname = data.pop();
    cb(null, fname + "-" + uniqueSuffix + "." + fileExt);
  },
});

// Initialize multer upload middleware for handling multiple files
const uploadRecord = multer({
  storage: storageRecord,
  limits: { fieldSize: 1024 * 1024 * 5 },
}).fields([
  { name: "testResultFile", maxCount: 1 },
  { name: "prescriptionFile", maxCount: 1 },
]);

app.post("/savePatientRecord", uploadRecord, async (req, res) => {
  try {
    const { patientID, hospitalName, doctorName, testName, reasonPara } =
      req.body;
    const mDoctorName = `Dr.${doctorName}`;

    // Create a new record
    const newRecord = {
      hospitalName,
      mDoctorName,
      testName,
      testResultFile: req.files.testResultFile
        ? req.files.testResultFile[0].filename
        : null, // path to the uploaded test result file
      prescriptionFile: req.files.prescriptionFile[0].filename, // path to the uploaded prescription file
      reasonPara,
    };

    // Find the patient by ID and update or create if not found
    let patient = await patientRecordModel.findOne({ patientID });

    if (!patient) {
      // If patient doesn't exist, create a new one
      patient = new patientRecordModel({
        patientID,
        patientRecords: [newRecord],
      });
    } else {
      // If patient exists, update the record array
      patient.patientRecords.push(newRecord);
    }

    // Save the patient record
    await patient.save();

    res.status(200).send({ message: "Records uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "An error occurred" });
  }
});

// ---------------------- get the patient medical record ---------------- //
app.use(
  "/patientPrescriptionFile",
  express.static(path.join(__dirname, "patientPrescriptionFile"))
);
app.use(
  "/patientTestFile",
  express.static(path.join(__dirname, "patientTestFile"))
);

app.post("/getPatientMedicalRecord", async (req, res) => {
  try {
    const { patientID } = req.body;

    // first get the patient associated with the patient id
    const patient = await patientRecordModel.findOne({ patientID });

    if (patient) {
      res.status(200).json({ patientRecords: patient.patientRecords });
    } else {
      res
        .status(401)
        .send({ message: "Error with patient ID, no such patient exits" });
    }
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).send({ message: "An error occurred", error });
  }
});

// -------------------------- Route to Predict Disease Based on Symptoms ------------------ //

// Route to predict disease based on symptoms
app.post("/predict", (req, res) => {
  const { symptoms } = req.body;

  if (!symptoms) {
    return res.status(400).json({ message: "No symptoms provided" });
  }

  // Command to run the Python script with symptoms as argument
  // const command = `python E:/Medilink_Project/Backend/python/disease_predictor.py "${symptoms}"`;
  const command1 = `python e:/Medlilink_project/Backend/python/disease_predictor.py "${symptoms}"`;

  exec(command1, (error, stdout, stderr) => {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Error executing Python script", error: stderr });
    }

    // Send the prediction back as response
    res.json({ disease: stdout.trim() });
  });
});

// ---------------------------- Ai Health assistant Route ---------------------------- //
app.post("/api/health-assistant", async (req, res) => {
  const { userMessage } = req.body;

  try {
    const assistantResponse = await getAIResponse(userMessage);
    res.json({ assistantResponse });
  } catch (error) {
    res.status(500).json({ message: "Error processing request" });
  }
});

app.post("/getDoctorDetail", async (req, res) => {
  const { doctorId } = req.body;

  try {
    // Assuming there's a Doctor model
    const doctor = await doctorModel.findOne({ doctorID: doctorId });
    if (doctor) {
      res.status(200).json(doctor);
    } else {
      res.status(404).send({ message: "Doctor not found" });
    }
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).send({ message: "An error occurred", error });
  }
});

// Backend route to update doctor details
app.put("/updateDoctorDetail", async (req, res) => {
  const { doctorId, name, specialization, experience } = req.body;

  try {
    const updatedDoctor = await DoctorModel.findOneAndUpdate(
      { doctorId },
      { name, specialization, experience },
      { new: true } // Return the updated document
    );

    if (updatedDoctor) {
      res.status(200).json(updatedDoctor);
    } else {
      res.status(404).send({ message: "Doctor not found" });
    }
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).send({ message: "An error occurred", error });
  }
});

app.post("/saveAppointmentDetails", async (req, res) => {
  const { patientName, patientProblem, patientId, appointmentDate, doctorID } = req.body;

  try {
    // Find the doctor by ID
    const doctor = await doctorModel.findOne({ doctorID });

    if (!doctor) {
      return res.status(404).send({ message: "Doctor not found" });
    }

    // Create an appointment object
    const appointmentData = {
      patientName,
      patientProblem,
      appointmentDate,
      patientId
    };

    console.log(appointmentData);
    

    // Push the new appointment into the doctor's appointments array
    doctor.appointments.push(appointmentData);

    // Save the updated doctor document
    await doctor.save();

    res.status(200).json({ message: "Appointment booked successfully!" });
  } catch (error) {
    console.error(`Error saving appointment: ${error}`);
    res.status(500).send({ message: "Failed to book appointment.", error });
  }
});

// Disease Prediction route random forest from google Colab

app.post("/diseasePrediction/predict:patientId", async (req, res) => {
  const { symptoms } = req.body;

  if (!symptoms) {
    return res.status(400).json({ message: "No symptoms provided" });
  }

  try {
    // Send the symptoms to the Flask API hosted via ngrok
    const flaskAPIUrl = "https://b6ed-34-172-101-130.ngrok-free.app/predict"; // Replace with your ngrok URL

    const response = await axios.post(flaskAPIUrl, { symptoms });

    // Return the prediction result from the Flask API to the frontend
    res.json({ disease: response.data.disease });
  } catch (error) {
    console.error("Error connecting to Flask API:", error);
    res
      .status(500)
      .json({ message: "Error predicting disease", error: error.message });
  }
});

// --------------------------- Port is running -------------------------- //

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
