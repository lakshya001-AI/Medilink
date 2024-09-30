import Style from "../App.module.css"
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function DoctorProfile() {
  return <>
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

        <div className={Style.doctorProfileMainDiv}>
          <div className={Style.doctorProfileDetailDiv}>
            <div className={Style.doctorProfileDetailDiv1}>
              <div className={Style.doctorProfileDetailDiv1Info}>
                <p className={Style.doctorProfileDetailDiv1InfoPara}>DR. Kunal Malviya</p>
                <p className={Style.doctorProfileDetailDiv1InfoPara1}>Surgoan | MBBS</p>
              </div>

              <div className={Style.doctorProfileDetailDiv1InfoBtn}>
                <button>Edit Detail</button>
              </div>
            </div>

           
          </div>
        </div>

      </div>
  </>
}

export default DoctorProfile;