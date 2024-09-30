import React, { useState } from "react";
import { Link } from "react-router-dom";
import Style from "../App.module.css";
import axios from "axios";

function DoctorPage() {
  const [patientIdDS, setPatientIdDS] = useState("");
  const [patientRecords, setPatientRecords] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null); // For selected record
  const [showModal, setShowModal] = useState(false); // For modal visibility
  const [showImageModal, setShowImageModal] = useState(false); // For image modal visibility
  const [selectedImage, setSelectedImage] = useState(""); // For selected image
  const [error, setError] = useState("");

  async function getPatientRecordDetails() {
    if (patientIdDS) {
      try {
        const response = await axios.post("http://localhost:5000/getPatientMedicalRecord", { patientID: patientIdDS });
        if (response.status === 200) {
          setPatientRecords(response.data.patientRecords);
          setError(""); // clear previous error if any
        }
      } catch (err) {
        setError("Patient ID not found or an error occurred.");
        setPatientRecords(null); // clear records on error
      }
    } else {
      setError("Please enter a valid Patient ID.");
    }
  }

  // Function to handle viewing the record in the modal
  const handleViewRecord = (record) => {
    setSelectedRecord(record); // Set the record to be viewed
    setShowModal(true); // Show the modal
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedRecord(null);
  };

  // Function to handle viewing the image in the image modal
  const handleViewImage = (imageUrl) => {
    setSelectedImage(imageUrl); // Set the image URL
    setShowImageModal(true); // Show the image modal
  };

  // Function to close the image modal
  const closeImageModal = () => {
    setShowImageModal(false);
    setSelectedImage("");
  };

  return (
    <>
      <div className={Style.mainDivPatient}>
        <div className={Style.navBarPatient}>
          <div className={Style.navBarLogoHeading}>
            <h1>Medilink</h1>
          </div>

          <div className={Style.navBarElements1}>
            <Link className={Style.navBarElementAIHelp} to="/DoctorProfilePage">
              Profile
            </Link>
            <Link className={Style.navBarElementAIHelp} to="/">
              Logout
            </Link>
          </div>
        </div>

        <div className={Style.accessPatientRecordMainDiv}>
          <div className={Style.accessPatientRecordDiv1}>
            <div className={Style.accessRecordHeading}>
              <h1>
                Hello, Doctor. Kindly enter the Patient ID to securely access
                the patient's medical records.
              </h1>
            </div>
            <div className={Style.accessRecordForm}>
              <input
                type="text"
                placeholder="Enter Patient ID"
                className={Style.inputField}
                value={patientIdDS}
                onChange={(e) => setPatientIdDS(e.target.value)}
              />
              <button className={Style.accessButton} onClick={getPatientRecordDetails}>
                Access Record
              </button>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          </div>
        </div>

        {/* Display the patient records if available */}
        {patientRecords && (
          <div className={Style.PatientRecordsDiv}>
            {patientRecords.map((record, index) => (
              <div key={index} className={Style.PatientRecordsDivInnerDiv}>
                <div className={Style.patientRecordDivDoctorSide}>
                  <div className={Style.patientRecordImageDIvDS}>
                    <img
                      src={record.testResultFile || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVKYCBD7RqtNRCEODGO2f3xXiK4p7lwszPcw&s"}
                      alt="Record Image"
                      onClick={() => handleViewImage(record.testResultFile || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVKYCBD7RqtNRCEODGO2f3xXiK4p7lwszPcw&s")} // Click to view image
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <div className={Style.patientRecordInfoDivDS}>
                    <p>Hospital Name: {record.hospitalName}</p>
                    <p>Doctor Name: {record.mDoctorName}</p>
                    <p>Test Name: {record.testName || "No Test Performed"}</p>
                    <p>Reason: {record.reasonPara}</p>
                    <button className={Style.viewRecordsBtnDS} onClick={() => handleViewRecord(record)}>
                      View Record
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for viewing patient record */}
        {showModal && selectedRecord && (
          <div className={Style.modal}>
            <div className={Style.modalContent}>
              {/* <h2 className={Style.modalContentPara1}>Patient Medical Record Details</h2> */}
              <p ><strong className={Style.modalContentPara1}>Hospital Name:</strong> {selectedRecord.hospitalName}</p>
              <p><strong className={Style.modalContentPara1}>Doctor Name:</strong> {selectedRecord.mDoctorName}</p>
              <p><strong className={Style.modalContentPara1}>Test Name:</strong> {selectedRecord.testName || "No Test Performed"}</p>
              <p><strong className={Style.modalContentPara1}>Test Result:</strong> {selectedRecord.testResultFile || "No Test Results"}</p>
              <p><strong className={Style.modalContentPara1}>Reason:</strong> {selectedRecord.reasonPara}</p>
              <p><strong className={Style.modalContentPara1}>Date:</strong> {new Date(selectedRecord.createdAt).toLocaleDateString()}</p>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        )}

        {/* Image Modal for viewing the test result image */}
        {showImageModal && selectedImage && (
          <div className={Style.modal}>
            <div className={Style.modalContent1}>
              <img
                src={selectedImage}
                alt="Test Result"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
              <button onClick={closeImageModal}>Close</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default DoctorPage;

