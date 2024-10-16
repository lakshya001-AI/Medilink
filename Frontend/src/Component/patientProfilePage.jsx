import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Style from "../App.module.css";
import { ToastContainer, toast, Bounce } from "react-toastify";

function PatientProfilePage() {
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

        <div className={Style.doctorProfileMainDiv}>
          <div className={Style.doctorProfileDetailDiv}>
            <div className={Style.doctorProfileDetailDiv1}></div>
            <div className={Style.doctorProfileDetailDiv2}></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientProfilePage;
