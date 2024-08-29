import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Style from "../App.module.css";

function PatientRecordPage() {
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
            <Link className={Style.navBarElement1} to="/patientPage">
              Services
            </Link>
            <Link className={Style.navBarElement1} to="/patientPage">
              Contact Us
            </Link>
          </div>

          <div className={Style.navBarElements1}>
            <Link className={Style.navBarElementAIHelp} to="/">
              logout
            </Link>
          </div>
        </div>

        {/* ----------- section 1 ---------------- */}

        <div className={Style.section1MedicalRecordPatient}>

          <div className={Style.section1MRP1}>

          </div>

          <div className={Style.section1MRP2}>

          </div>

        </div>
      </div>
    </>
  );
}

export default PatientRecordPage;
