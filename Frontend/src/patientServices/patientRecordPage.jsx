import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Style from "../App.module.css";

function PatientRecordPage() {
  const [records, setRecords] = useState([]);

  // State to manage toggle (Yes/No)
  const [showAdditionalDiv, setShowAdditionalDiv] = useState(true);

  // Handler for the toggle
  const handleToggle = (event) => {
    const value = event.target.value;
    setShowAdditionalDiv(value === "yes");
  };

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
            {records.length === 0 ? (
              <div className={Style.noRecords}>
                {/* Render this when records length is 0 */}
                <p>No records found.</p>
              </div>
            ) : (
              <div className={Style.recordsList}>
                {/* Render this when records length is not 0 */}
                {records.map((record, index) => (
                  <p key={index}>{record.name}</p>
                ))}
              </div>
            )}
          </div>

          <div className={Style.section1MRP2}>
            <div className={Style.section1MRP2div1}>
              <div className={Style.section1MRP2div11}>
                <p>Hospital Name</p>
                <input type="text" name="" id="" />
              </div>

              <div className={Style.section1MRP2div12}>
                <p>Doctor Name</p>
                <input type="text" name="" id="" />
              </div>
            </div>

            <div className={Style.section1MRP2div2}>
              <div className={Style.section1MRP2div11}>
                <p>Upload Prescription</p>
                <input type="file" name="" id="" />
              </div>

              <div className={Style.section1MRP2div12}>
                <p>Any Medical Test Performed? </p>

                <div className={Style.toogleBtnDiv}>
                  <label className={Style.toogleLabel}>
                    Yes
                    <input
                      type="radio"
                      name="toggle"
                      value="yes"
                      onChange={handleToggle}
                    />
                  </label>
                  <label className={Style.toogleLabel}>
                    No
                    <input
                      type="radio"
                      name="toggle"
                      value="no"
                      onChange={handleToggle}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Conditionally render this div based on the toggle */}
            {showAdditionalDiv && (
              <div>
                <div className={Style.section1MRP2div3}>
                  <div className={Style.section1MRP2div31}>
                    <p>Test Name</p>
                    <input type="text" name="" id="" />
                  </div>

                  <div className={Style.section1MRP2div31}>
                    <p>{`Upload Test Result(if Any)`}</p>
                    <input type="file" name="" id="" />
                  </div>
                </div>
              </div>
            )}

            <div className={Style.section1MRP2div3}>
              <div className={Style.section1MRP2divReason}>
                <p>Reason for Consulting the Doctor</p>
                <textarea name="" id=""></textarea>
              </div>
            </div>

            <div className={Style.submitRecordDiv}>
              <button className={Style.submitRecordBtn}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientRecordPage;
