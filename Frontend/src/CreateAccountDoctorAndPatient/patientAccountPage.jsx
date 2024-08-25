import React, { useState } from "react";
import Style from "../App.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function PatientAccountPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const emailFormat = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  const mobileNumberFormat = /^\d{10}$/;
  const navigate = useNavigate();

  // Patient Information
  const [pName, setPName] = useState("");
  const [pEmail, setPEmail] = useState("");
  const [pdOB, setPdOB] = useState("");
  const [pMobNo, setPMobNo] = useState("");
  const [pState, setPState] = useState("");
  const [pCity, setPCity] = useState("");
  const [pAadhaarNo, setPAadhaarNo] = useState("");
  const [pPassword, setpPassword] = useState("");
  const [pConfirmPassword, setpConfirmPassword] = useState("");
  const [patientID, setPatientID] = useState("");

  // Create Patient Account Function

  let CreatePatientAccount = async () => {
    // Here we have to check the email and phone number entered by the user , whether or not they are in correct format
    if (
      pName &&
      pEmail &&
      pdOB &&
      pMobNo &&
      pState &&
      pCity &&
      pAadhaarNo &&
      pPassword &&
      pConfirmPassword
    ) {
      if (!emailFormat.test(pEmail)) {
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
      } else if (!mobileNumberFormat.test(pMobNo)) {
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
      } else if (pAadhaarNo.length !== 12) {
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
      } else if (pPassword !== pConfirmPassword) {
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
        const pID = `${"P" + pName.slice(0, 2).toUpperCase() + pAadhaarNo}`;
        try {
          await axios
            .post("http://localhost:5000/PatientCreateAccount", {
              pName,
              pEmail,
              pdOB,
              pMobNo,
              pState,
              pCity,
              pAadhaarNo,
              pConfirmPassword,
              patientID: pID,
            })
            .then((res) => {
              toast.success(
                "Account Created Successfully! Please login using PatientId and Password",
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
              setPatientID(pID);
            })
            .catch((error) => {
              toast.error(
                `An Error Occurred! Please try again. Error: ${error.response.data.message}`,
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
              console.log(`Internal Error: ${error}`);
            });
        } catch (error) {
          toast.error(`An external error occurred! Error: ${error.message}`, {
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
          console.log(`External error: ${error}`);
        }
      }
    } else {
      toast.warn("All fields are required!", {
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
          {patientID.length === 0 ? (
            <div className={Style.patientAccountPageInnerDiv}>
              <div className={Style.patientAccountPageInnerDiv1}>
                {/* Overlay Content */}
                <div className={Style.patientAccountOverlay}>
                  <h1>Your Health Starts Here</h1>
                  <p>
                    Creating an account with Medilink allows you to manage your
                    health information, connect with your doctors, and receive
                    personalized care.
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
                    placeholder="Jane Doe"
                    value={pName}
                    onChange={(e) => setPName(e.target.value)}
                  />
                </div>

                <div className={Style.patientNameDiv}>
                  <p>Email</p>
                  <input
                    type="email"
                    placeholder="janedoe@gmail.com"
                    value={pEmail}
                    onChange={(e) => setPEmail(e.target.value)}
                  />
                </div>

                <div className={Style.patientNameDiv}>
                  <p>Mobile No.</p>
                  <input
                    type="text"
                    placeholder="+1 234 567 890"
                    value={pMobNo}
                    onChange={(e) => setPMobNo(e.target.value)}
                  />
                </div>

                <div className={Style.patientNameDiv}>
                  <p>Aadhaar No.</p>
                  <input
                    type="text"
                    placeholder="12-digit Aadhaar number"
                    value={pAadhaarNo}
                    onChange={(e) => setPAadhaarNo(e.target.value)}
                  />
                </div>

                <div className={Style.patientNameDiv}>
                  <p>DOB</p>
                  <input
                    type="date"
                    value={pdOB}
                    onChange={(e) => setPdOB(e.target.value)}
                  />
                </div>

                <div className={Style.patientNameDiv}>
                  <p>State</p>
                  <input
                    type="text"
                    placeholder="Maharashtra"
                    value={pState}
                    onChange={(e) => setPState(e.target.value)}
                  />
                </div>

                <div className={Style.patientNameDiv}>
                  <p>City</p>
                  <input
                    type="text"
                    placeholder="Pune"
                    value={pCity}
                    onChange={(e) => setPCity(e.target.value)}
                  />
                </div>

                <div className={Style.patientNameDiv}>
                  <p>Password</p>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="************"
                    value={pPassword}
                    onChange={(e) => setpPassword(e.target.value)}
                  />
                  <div className={Style.showPasswordDiv}>
                    <button onClick={showPasswordFunction}>
                      {showPassword ? "Hide Password" : "Show Password"}
                    </button>
                  </div>
                </div>

                <div className={Style.patientNameDivConfirmPassword}>
                  <p>Confirm Password</p>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="************"
                    value={pConfirmPassword}
                    onChange={(e) => setpConfirmPassword(e.target.value)}
                  />
                  <div className={Style.showPasswordDiv}>
                    <button onClick={showConfirmPasswordFunction}>
                      {showConfirmPassword ? "Hide Password" : "Show Password"}
                    </button>
                  </div>
                </div>

                <div className={Style.patientCreateAccountBTNDiv}>
                  <button
                    className={Style.createPatientAccountBtn}
                    onClick={CreatePatientAccount}
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
              >{`Patient ID : ${patientID}`}</p>
              <p className={Style.patientIDWarnPara}>
                Please remember your Patient ID. If you forget, it can be
                regenerated using the formula:
              </p>
              <p className={Style.patientIDFormulaPara}>
                <b>
                  P + Your name's first two letters in uppercase + Your 12-digit
                  Aadhaar number
                </b>
              </p>
              <Link to="/" className={Style.goToLoginLinkPatientAccount}>Go to login</Link>
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default PatientAccountPage;
