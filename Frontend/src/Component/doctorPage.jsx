import React from "react";
import { Link } from "react-router-dom";
import Style from "../App.module.css";

function DoctorPage() {
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
              logout
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
              />
              <button className={Style.accessButton}>Access Record</button>
            </div>
          </div>
        </div>

        <div className={Style.PatientRecordsDiv}>
          <div className={Style.PatientRecordsDivInnerDiv}>
            <div className={Style.patientRecordDivDoctorSide}>
              <div className={Style.patientRecordImageDIvDS}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVKYCBD7RqtNRCEODGO2f3xXiK4p7lwszPcw&s" alt="" />
              </div>
              <div className={Style.patientRecordInfoDivDS}>
                <p>Hospital Name: Bansal Hospital</p>
                <p>Doctor Name: Dr. Ravindra Verma</p>
                <p>Test Name: No Test Performed</p>
                <p>Reason: General Fever, Cough and Headache.</p>
                <button className={Style.viewRecordsBtnDS}>View Record</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorPage;
