import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import Style from "../App.module.css";

function DiesesPredictionPage() {
  return <>
   <div className={Style.mainDivPatient}>
        <div className={Style.navBarPatient}>
          <div className={Style.navBarLogoHeading}>
            <h1>Medilink</h1>
          </div>

          <div className={Style.navBarElements}>
            <Link className={Style.navBarElement1} to="/patientPage">
              Home
            </Link>
            <Link className={Style.navBarElement1} href="/patientPage">
              Services
            </Link>
            <a className={Style.navBarElement1} href="/patientPage">
              Contact Us
            </a>
          </div>

          <div className={Style.navBarElements1}>
            <Link className={Style.navBarElementAIHelp} to="/">
              logout
            </Link>
          </div>
        </div>
        <h1>Hello, this is Disease Prediction Page</h1>
      </div>
  </>
}

export default DiesesPredictionPage;