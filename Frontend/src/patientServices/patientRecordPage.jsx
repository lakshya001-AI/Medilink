import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Style from "../App.module.css";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function PatientRecordPage() {
  const [records, setRecords] = useState([]);

  // patient record data
  const [hospitalName, setHospitalName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [testName, setTestName] = useState("");
  const [testResult, setTestResult] = useState(null);
  const [prescriptionFile, setPrescriptionFile] = useState(null);
  const [reasonPara, setReasonPara] = useState("");



  // State to manage toggle (Yes/No)
  const [showAdditionalDiv, setShowAdditionalDiv] = useState(true);

  // Handler for the toggle
  const handleToggle = (event) => {
    const value = event.target.value;
    setShowAdditionalDiv(value === "yes");
  };

  const savePatientRecord = () =>{
    if(hospitalName && doctorName && prescriptionFile && reasonPara){
      
      
    }else{
      toast.warn("Please enter all necessary details to proceed.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        className: Style.customToast,
      });
    }
  }

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
            <div className={Style.section1MRP2Heading}>
              <h1>Patient Medical Records Form</h1>
              <h3>Securely Store Your Health Information</h3>
            </div>
            <div className={Style.section1MRP2div1}>
              <div className={Style.section1MRP2div11}>
                <p>Hospital Name*</p>
                <input type="text" value={hospitalName} onChange={(e)=>setHospitalName(e.target.value)}/>
              </div>

              <div className={Style.section1MRP2div12}>
                <p>Doctor Name*</p>
                <input type="text" value={doctorName} onChange={(e)=>setDoctorName(e.target.value)}/>
              </div>
            </div>

            <div className={Style.section1MRP2div2}>
              <div className={Style.section1MRP2div11}>
                <p>Upload Prescription*</p>
                <input type="file"
                onChange={(e)=>{
                  setPrescriptionFile(e.target.files[0]);
                }}
                />
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
                    <input type="text" value={testName} onChange={(e)=>setTestName(e.target.value)}/>
                  </div>

                  <div className={Style.section1MRP2div31}>
                    <p>{`Upload Test Result(if Any)`}</p>
                    <input type="file"
                    onChange={(e)=>{
                      setTestResult(e.target.files[0]);
                    }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className={Style.section1MRP2div3}>
              <div className={Style.section1MRP2divReason}>
                <p>Reason for Consulting the Doctor*</p>
                <textarea value={reasonPara} onChange={(e)=>setReasonPara(e.target.value)}></textarea>
              </div>
            </div>

            <div className={Style.submitRecordDiv}>
              <button className={Style.submitRecordBtn} onClick={savePatientRecord}>Submit</button>
            </div>
          </div>
        </div>
        <ToastContainer/>
      </div>
    </>
  );
}

export default PatientRecordPage;
