import React, { useState } from "react";
import Style from "../App.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function DoctorAccountPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const emailFormat = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  const mobileNumberFormat = /^\d{10}$/;
  const navigate = useNavigate();

  // Doctor Information
  const [dName, setDName] = useState("");
  const [dEmail, setDEmail] = useState("");
  const [dMobNo, setDMobNo] = useState();
  const [dAadhaarNo, setdAadhaarNo] = useState();
  const [dDOB, setdDOB] = useState();
  const [dState, setdState] = useState("");
  const [dCity, setdCity] = useState("");
  const [dPassword, setdPassword] = useState("");
  const [dConfirmPassword, setdConfirmPassword] = useState("");
  const [hospitalOrClinic, sethospitalOrClinic] = useState("");
  const [hcAddress, sethcAddress] = useState("");
  const [dSpecialization, setDSpecialization] = useState("");
  const [dmedicalDegree, setdmedicalDegree] = useState("");
  const [doctorID, setDoctorID] = useState("");
  const [doctorProofFile, setDoctorProofFile] = useState(null);

  // Create Doctor's Account Function
  let CreateDoctorAccount = async () => {
    const dID = `${"D" + dName.slice(0, 2).toUpperCase() + dAadhaarNo}`;
    if (
      dName &&
      dEmail &&
      dMobNo &&
      dAadhaarNo &&
      dDOB &&
      dState &&
      dCity &&
      dPassword &&
      dConfirmPassword &&
      hospitalOrClinic &&
      hcAddress &&
      dSpecialization &&
      dmedicalDegree &&
      doctorProofFile
    ) {
      if (!emailFormat.test(dEmail)) {
        toast.error("Please enter a valid Email Address", {
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
      } else if (!mobileNumberFormat.test(dMobNo)) {
        toast.error("Please enter a valid 10 digit Mobile Number", {
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
      } else if (dAadhaarNo.length !== 12) {
        toast.error("Aadhaar number must be of 12 Digits", {
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
      } else if (dPassword !== dConfirmPassword) {
        toast.error(
          "Confirm password does not match the password. Please re-enter.",
          {
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
          }
        );
      } else {
        const formData = new FormData();
        formData.append("doctorName", dName);
        formData.append("doctorEmail", dEmail);
        formData.append("doctorMobNumber", dMobNo);
        formData.append("doctorAadhaarNumber", dAadhaarNo);
        formData.append("doctorDOB", dDOB);
        formData.append("doctorState", dState);
        formData.append("doctorCity", dCity);
        formData.append("dConfirmPassword", dConfirmPassword);
        formData.append("hospitalOrClinic", hospitalOrClinic);
        formData.append("HCAddress", hcAddress);
        formData.append("doctorSpecialization", dSpecialization);
        formData.append("doctorMedicalDegree", dmedicalDegree);
        formData.append("doctorID", dID);
        formData.append("doctorFileName", doctorProofFile);

        try {
          const response = await axios.post(
            "http://localhost:5000/createDoctorAccount",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response.status === 200) {
            setDoctorID(dID);
            toast.success(
              "Account Created Successfully! Please login using doctorId and Password",
              {
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
              }
            );
          }
        } catch (error) {
          toast.error("An error occurred while creating the doctor account.", {
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
    } else {
      toast.warn("All Fields are required", {
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
  };

  function showPasswordFunction() {
    setShowPassword(!showPassword);
  }

  function showConfirmPasswordFunction() {
    setShowConfirmPassword(!showConfirmPassword);
  }
  return (
    <>
      <div className={Style.mainDiv}>
        <div className={Style.patientAccountPageMainDiv}>
          {doctorID.length === 0 ? (
            <div className={Style.patientAccountPageInnerDiv}>
              <div className={Style.doctorAccountPageInnerDiv1}>
                {/* Overlay Content */}
                <div className={Style.doctorAccountOverlay}>
                  <h1>Join the Medilink Network</h1>
                  <p>
                    Create your account today and connect with your patients
                    like never before. With Medilink, patient records are at
                    your fingertips, allowing for efficient and informed medical
                    care.
                  </p>
                  <h2 className={Style.patientAccountPara}>
                    Already have an Account?
                  </h2>
                  <Link className={Style.backToLoginLinkPatientAccount} to="/">
                    Back to login
                  </Link>
                </div>
              </div>

              <div className={Style.patientAccountPageInnerDiv2}>
                <p className={Style.pleaseEnterYourDetailsPara}>
                  Please enter your details
                </p>

                <div className={Style.patientNameDiv}>
                  <p>Name</p>
                  <input
                    type="text"
                    placeholder=" Dr Jane Doe"
                    value={dName}
                    onChange={(e) => setDName(e.target.value)}
                  />
                </div>

                <div className={Style.patientNameDiv}>
                  <p>Email</p>
                  <input
                    type="email"
                    placeholder="janedoe@gmail.com"
                    value={dEmail}
                    onChange={(e) => setDEmail(e.target.value)}
                  />
                </div>

                <div className={Style.patientNameDiv}>
                  <p>Mobile No.</p>
                  <input
                    type="text"
                    placeholder="+1 234 567 890"
                    value={dMobNo}
                    onChange={(e) => setDMobNo(e.target.value)}
                  />
                </div>

                <div className={Style.patientNameDiv}>
                  <p>Aadhaar No.</p>
                  <input
                    type="text"
                    placeholder="12-digit Aadhaar number"
                    value={dAadhaarNo}
                    onChange={(e) => setdAadhaarNo(e.target.value)}
                  />
                </div>

                <div className={Style.patientNameDiv}>
                  <p>DOB</p>
                  <input
                    type="date"
                    placeholder="12-digit Aadhaar number"
                    value={dDOB}
                    onChange={(e) => setdDOB(e.target.value)}
                  />
                </div>

                <div className={Style.patientNameDiv}>
                  <p>State</p>
                  <input
                    type="text"
                    placeholder="Maharashtra"
                    value={dState}
                    onChange={(e) => setdState(e.target.value)}
                  />
                </div>

                <div className={Style.patientNameDiv}>
                  <p>City</p>
                  <input
                    type="text"
                    placeholder="Pune"
                    value={dCity}
                    onChange={(e) => setdCity(e.target.value)}
                  />
                </div>

                <div className={Style.patientNameDiv}>
                  <p>Specialization</p>
                  <input
                    type="text"
                    placeholder="Surgeon / Gynecologist / Dermatologist"
                    value={dSpecialization}
                    onChange={(e) => setDSpecialization(e.target.value)}
                  />
                </div>

                <div className={Style.patientNameDiv}>
                  <p>Medical Degree</p>
                  <input
                    type="text"
                    placeholder="MBBS / BHMS / MD / BDS"
                    value={dmedicalDegree}
                    onChange={(e) => setdmedicalDegree(e.target.value)}
                  />
                </div>

                <div className={Style.patientNameDiv}>
                  <p>Hospital or Clinic</p>
                  <input
                    type="text"
                    placeholder="Hospital / Clinic"
                    value={hospitalOrClinic}
                    onChange={(e) => sethospitalOrClinic(e.target.value)}
                  />
                </div>

                <div className={Style.patientNameDiv}>
                  <p>Hospital/Clinic Address</p>
                  <input
                    type="text"
                    placeholder="Hospital / Clinic Address"
                    value={hcAddress}
                    onChange={(e) => sethcAddress(e.target.value)}
                  />
                </div>

                <div className={Style.patientNameDiv}>
                  <p>Proof of DoctorShip</p>
                  <input
                    type="file"
                    onChange={(e) => {
                      setDoctorProofFile(e.target.files[0]);
                    }}
                  />
                </div>

                <div className={Style.patientNameDiv}>
                  <p>Password</p>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="************"
                    value={dPassword}
                    onChange={(e) => setdPassword(e.target.value)}
                  />
                  <div className={Style.showPasswordDiv}>
                    <button onClick={showPasswordFunction}>
                      {" "}
                      {showPassword ? "Hide Password" : "Show Password"}
                    </button>
                  </div>
                </div>

                <div className={Style.patientNameDivConfirmPassword}>
                  <p>Confirm Password</p>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="************"
                    value={dConfirmPassword}
                    onChange={(e) => {
                      setdConfirmPassword(e.target.value);
                    }}
                  />
                  <div className={Style.showPasswordDiv}>
                    <button onClick={showConfirmPasswordFunction}>
                      {" "}
                      {showConfirmPassword ? "Hide Password" : "Show Password"}
                    </button>
                  </div>
                </div>

                <div className={Style.patientCreateAccountBTNDiv}>
                  <button
                    className={Style.createPatientAccountBtn}
                    onClick={CreateDoctorAccount}
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className={Style.patientAccountPageInnerDivPatientID}>
              <p
                className={Style.patientIntroPara}
              >{`Your Account has been Created`}</p>
              <p
                className={Style.patientIDPara}
              >{`Doctor ID : ${doctorID}`}</p>
              <p className={Style.patientIDWarnPara}>
                Please remember your Doctor ID. If you forget, it can be
                regenerated using the formula:
              </p>
              <p className={Style.patientIDFormulaPara}>
                <b>
                  D + Your name's first two letters in uppercase + Your 12-digit
                  Aadhaar number
                </b>
              </p>
              <Link to="/" className={Style.goToLoginLinkPatientAccount}>
                Go to login
              </Link>
            </div>
          )}
        </div>
        <ToastContainer/>
      </div>
    </>
  );
}

export default DoctorAccountPage;
