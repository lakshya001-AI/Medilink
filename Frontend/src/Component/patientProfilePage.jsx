import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Style from "../App.module.css";
import { ToastContainer, toast, Bounce } from "react-toastify";

function PatientProfilePage() {
  const [patientDetails, setPatientDetails] = useState({});
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [rejectedRequests, setRejectedRequests] = useState([]);

  const patientID = localStorage.getItem("patientID");

  useEffect(() => {
    const getPatientDetails = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/getPatientDetail",
          { patientID }
        );
        if (response.data) {
          setPatientDetails(response.data.patient);
          setAcceptedRequests(response.data.patient.patientAcceptRequests);
          setRejectedRequests(response.data.patient.patientRejectRequests);
        }
      } catch (error) {
        toast.error("Failed to load patient data");
      }
    };

    getPatientDetails();
  }, [patientID]);

  return (
    <>
      <div className={Style.mainDivPatient}>
        <div className={Style.navBarPatient}>
          <div className={Style.navBarLogoHeading}>
            <h1>Medilink</h1>
          </div>

          <div className={Style.navBarElements}>
            <Link className={Style.navBarElement1} to="/patientPage">
              Home
            </Link>
            <a className={Style.navBarElement1} href="#services">
              Services
            </a>
            <a className={Style.navBarElement1} href="#contactUs">
              Contact Us
            </a>
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

        <div className={Style.profileMainDiv}>
          <div className={Style.profileDetailDiv}>
            {/* Patient Details Section */}
            <div className={Style.profileDetailDiv1}>
              <div className={Style.patientInfo}>
                <h2 className={Style.patientNameHeading}>{patientDetails.PName}</h2>
                <p>Email: {patientDetails.PEmail}</p>
                <p>Mobile: {patientDetails.PMobileNO}</p>
              </div>
              <button className={Style.editProfileButtonPatient}>Edit</button>
            </div>

            {/* Accepted and Rejected Requests Section */}
            <div className={Style.profileDetailDiv2}>
              <div className={Style.acceptedRequestDiv}>
                <h3 className={Style.requestHeadings}>Accepted Requests</h3>
                {acceptedRequests.length > 0 ? (
                  acceptedRequests.map((request, index) => (
                    <div key={index} className={Style.requestCard}>
                      <p>Patient ID: {request.patientId}</p>
                      <p>Mobile No: {request.patientMobNo}</p>
                      <p>Doctor: {request.doctorName}</p>
                      <p>Appointment Date: {request.appointmentDate}</p>
                    </div>
                  ))
                ) : (
                  <p>No accepted requests</p>
                )}
              </div>

              <div className={Style.rejectedRequestDiv}>
                <h3 className={Style.requestHeadings}>Rejected Requests</h3>
                {rejectedRequests.length > 0 ? (
                  rejectedRequests.map((request, index) => (
                    <div key={index} className={Style.requestCard}>
                      <p>Patient ID: {request.patientId}</p>
                      <p>Mobile No: {request.patientMobNo}</p>
                      <p>Doctor: {request.doctorName}</p>
                      <p>Appointment Date: {request.appointmentDate}</p>
                    </div>
                  ))
                ) : (
                  <p>No rejected requests</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default PatientProfilePage;
