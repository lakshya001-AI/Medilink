import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Style from "../App.module.css";

function HealthAssistantPage() {
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
            <Link className={Style.navBarElementAIHelp} to="/">
              logout
            </Link>
          </div>
        </div>
        <h1>Hello, this is Health Assistant Page</h1>
      </div>
    </>
  );
}

export default HealthAssistantPage;
