import React, { useState } from "react";
import Style from "../App.module.css";
import { Link , useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faCopy } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function CreateAccountPage() {
  const [state, setState] = useState("");
  const [show, setShow] = useState(false);
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
  const [patientID, setPatientID] = useState("");

  // Doctor Information
  const [dName, setDName] = useState("");
  const [dEmail, setDEmail] = useState("");
  const [dMobNo, setDMobNo] = useState();
  const [dAadhaarNo, setdAadhaarNo] = useState();
  const [dDOB, setdDOB] = useState();
  const [dState, setdState] = useState("");
  const [dCity, setdCity] = useState("");
  const [dPassword, setdPassword] = useState("");
  const [hospitalOrClinic, sethospitalOrClinic] = useState("");
  const [hcAddress, sethcAddress] = useState("");
  const [dSpecialization, setDSpecialization] = useState("");
  const [dmedicalDegree, setdmedicalDegree] = useState("");
  const [doctorID, setDoctorID] = useState("");
  const [doctorProofFile, setDoctorProofFile] = useState(null);

  // Copy ID
  const [copySuccess, setCopySuccess] = useState("");

  const handleCopy = () => {
    navigator.clipboard
      .writeText(patientID)
      .then(() => {
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess(""), 2000); // Reset copy success message after 2 seconds
      })
      .catch((err) => {
        console.log("Failed to copy: ", err);
      });
  };

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
      pPassword
    ) {

      if(!emailFormat.test(pEmail)){
        toast.warn("Please enter a valid Email Address", {
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
      }else if(!mobileNumberFormat.test(pMobNo)){
        toast.warn("Please enter a valid Mobile Number", {
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

      }else if (pAadhaarNo.length !== 12) {
        toast.warn("Aadhaar number must be of 12 Digits", {
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
      } else {
        const pID = `${"P" + pName.slice(0, 2).toUpperCase() + pAadhaarNo}`;
        setPatientID(pID);
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
              pPassword,
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
      hospitalOrClinic &&
      hcAddress &&
      dSpecialization &&
      dmedicalDegree &&
      doctorProofFile
    ) {
      if(!emailFormat.test(dEmail)){

        toast.warn("Please enter a valid Email Address", {
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


      }else if(!mobileNumberFormat.test(dMobNo)){

        toast.warn("Please enter a valid Phone Number", {
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

      }else if(dAadhaarNo.length !== 12){
        toast.warn("Aadhaar number must be of 12 Digits", {
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

      }else{
        const formData = new FormData();
      formData.append("doctorName", dName);
      formData.append("doctorEmail", dEmail);
      formData.append("doctorMobNumber", dMobNo);
      formData.append("doctorAadhaarNumber", dAadhaarNo);
      formData.append("doctorDOB", dDOB);
      formData.append("doctorState", dState);
      formData.append("doctorCity", dCity);
      formData.append("doctorPassword", dPassword);
      formData.append("hospitalOrClinic", hospitalOrClinic);
      formData.append("HCAddress", hcAddress);
      formData.append("doctorSpecialization", dSpecialization);
      formData.append("doctorMedicalDegree", dmedicalDegree);
      formData.append("doctorID", dID);
      formData.append("doctorFileName", doctorProofFile);

      try {
        const response = await axios.post("http://localhost:5000/createDoctorAccount", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.status === 200) {
            setDoctorID(dID);
            toast.success("Account Created Successfully! Please login using doctorId and Password", {
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

  function patientCreateAccount() {
    navigate("/patientAccountPage");
  }

  function doctorCreateAccount() {
    navigate("/doctorAccountPage");
  }

  function showPassword() {
    setShow(!show);
  }

  return (
    <>
      <div className={Style.mainDiv}>
        <div className={Style.loginDiv}>
          <div className={Style.overlay}>
            <div className={Style.loginInfoDiv}>
              <div className={Style.createAccountMainDiv}>
                <p className={Style.createAccountPara1}>Create Your Account</p>
                {state === "" && (
                  <div>
                    <p className={Style.createAccountPara2}>
                      Are you a Patient or a Doctor?
                    </p>
                    <div className={Style.categorySelectionBtn}>
                      <button onClick={patientCreateAccount}>
                        I am a Patient
                      </button>
                      <button onClick={doctorCreateAccount}>
                        I am a Doctor
                      </button>
                    </div>
                    <div className={Style.backToLoginDiv}>
                      <p>Already have an account?</p>
                      <Link className={Style.createAccountLink} to="/">
                        Sign In
                      </Link>
                    </div>
                  </div>
                )}

                {state === "patientCreateAccount" && (
                  <div className={Style.patientAccountCreationDiv}>
                    {patientID.length === 0 ? (
                      <div>
                        <p className={Style.PACPara}>
                          Please enter your details
                        </p>
                        <div className={Style.patientAccountCreationDivInfo}>
                          <div className={Style.pacd2}>
                            <div className={Style.nameInputDivP}>
                              <div className={Style.inputLabelP}>
                                <p>Name</p>
                              </div>
                              <input
                                type="text"
                                className={Style.dobInputPatientACC}
                                placeholder="xyz"
                                value={pName}
                                onChange={(e) => setPName(e.target.value)}
                              />
                            </div>
                            <div className={Style.nameInputDivP}>
                              <div className={Style.inputLabelP}>
                                <p>Email</p>
                              </div>
                              <input
                                type="email"
                                className={Style.dobInputPatientACC}
                                placeholder="xyz@gmail.com"
                                value={pEmail}
                                onChange={(e) => setPEmail(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className={Style.pacd2}>
                            <div className={Style.nameInputDivP}>
                              <div className={Style.inputLabelP}>
                                <p>Mobile No.</p>
                              </div>
                              <input
                                type="tel"
                                className={Style.dobInputPatientACC}
                                placeholder="0909090909"
                                value={pMobNo}
                                onChange={(e) => setPMobNo(e.target.value)}
                              />
                            </div>
                            <div className={Style.nameInputDivP}>
                              <div className={Style.inputLabelP}>
                                <p>Aadhaar No.</p>
                              </div>
                              <input
                                type="text"
                                className={Style.dobInputPatientACC}
                                placeholder="xxxx xxxx xxxx"
                                value={pAadhaarNo}
                                onChange={(e) => setPAadhaarNo(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className={Style.pacd2}>
                            <div className={Style.nameInputDivP}>
                              <div className={Style.inputLabelP}>
                                <p>DOB</p>
                              </div>
                              <input
                                type="date"
                                className={Style.dobInputPatientACC}
                                value={pdOB}
                                onChange={(e) => setPdOB(e.target.value)}
                              />
                            </div>
                            <div className={Style.nameInputDivP}>
                              <div className={Style.inputLabelP}>
                                <p>State</p>
                              </div>
                              <input
                                type="text"
                                className={Style.dobInputPatientACC}
                                placeholder="Maharashtra"
                                value={pState}
                                onChange={(e) => setPState(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className={Style.pacd2}>
                            <div className={Style.nameInputDivPCity}>
                              <div className={Style.inputLabelP}>
                                <p>City</p>
                              </div>
                              <input
                                type="text"
                                className={Style.dobInputPatientACC}
                                placeholder="Pune"
                                value={pCity}
                                onChange={(e) => setPCity(e.target.value)}
                              />
                            </div>
                            <div className={Style.nameInputDivP}>
                              <div className={Style.passwordShowACC1}>
                                <div className={Style.inputLabelPasswordP}>
                                  <p>Password</p>
                                </div>
                                <input
                                  type={show ? "text" : "password"}
                                  className={Style.passwordInputPatientACC1}
                                  placeholder="Password"
                                  value={pPassword}
                                  onChange={(e) => setpPassword(e.target.value)}
                                />
                                <button onClick={showPassword}>
                                  {show ? "Hide Password" : "Show Password"}
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className={Style.createAccBtnDivP}>
                            <button
                              className={Style.createAccBtn}
                              onClick={CreatePatientAccount}
                            >
                              Create Account
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className={Style.patientIDDiv}>
                        <h3 className={Style.patientIDHeading}>Patient ID</h3>
                        <div className={Style.patientIDAndCopy}>
                          <p>{patientID}</p>
                          <FontAwesomeIcon
                            icon={faCopy}
                            className={Style.copyFont}
                            size="lg"
                            onClick={handleCopy}
                          />
                        </div>
                        {copySuccess && <span>{copySuccess}</span>}
                        <p className={Style.patientIDWarnPara}>
                          Please remember your Patient ID. If you forget, it can
                          be regenerated using the formula:
                        </p>
                        <p className={Style.patientIDFormulaPara}>
                          <b>
                            P + Your name's first two letters in uppercase +
                            Your 12-digit Aadhar number
                          </b>
                        </p>
                        <div className={Style.backToLoginDiv}>
                          <Link className={Style.backToLoginLink} to="/">
                            Back to login
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {state === "doctorCreateAccount" && (
                  <div className={Style.doctorAccountCreationDiv}>
                    {doctorID.length === 0 ? (
                      <div>
                        <p className={Style.PACPara}>
                          Please enter your details
                        </p>
                        <div className={Style.patientAccountCreationDivInfo}>
                          <div className={Style.pacd2}>
                            <div className={Style.nameInputDivP}>
                              <div className={Style.inputLabelP}>
                                <p>Name</p>
                              </div>
                              <input
                                type="text"
                                className={Style.dobInputPatientACC}
                                placeholder="xyz"
                                value={dName}
                                onChange={(e) => setDName(e.target.value)}
                              />
                            </div>
                            <div className={Style.nameInputDivP}>
                              <div className={Style.inputLabelP}>
                                <p>Email</p>
                              </div>
                              <input
                                type="email"
                                className={Style.dobInputPatientACC}
                                placeholder="xyz@gmail.com"
                                value={dEmail}
                                onChange={(e) => setDEmail(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className={Style.pacd2}>
                            <div className={Style.nameInputDivP}>
                              <div className={Style.inputLabelP}>
                                <p>Mobile No.</p>
                              </div>
                              <input
                                type="tel"
                                className={Style.dobInputPatientACC}
                                placeholder="0909090909"
                                value={dMobNo}
                                onChange={(e) => setDMobNo(e.target.value)}
                              />
                            </div>
                            <div className={Style.nameInputDivP}>
                              <div className={Style.inputLabelP}>
                                <p>Aadhaar No.</p>
                              </div>
                              <input
                                type="text"
                                className={Style.dobInputPatientACC}
                                placeholder="xxxx xxxx xxxx"
                                value={dAadhaarNo}
                                onChange={(e) => setdAadhaarNo(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className={Style.pacd2}>
                            <div className={Style.nameInputDivP}>
                              <div className={Style.inputLabelP}>
                                <p>DOB</p>
                              </div>
                              <input
                                type="date"
                                className={Style.dobInputPatientACC}
                                value={dDOB}
                                onChange={(e) => setdDOB(e.target.value)}
                              />
                            </div>
                            <div className={Style.nameInputDivP}>
                              <div className={Style.inputLabelP}>
                                <p>State</p>
                              </div>
                              <input
                                type="text"
                                className={Style.dobInputPatientACC}
                                placeholder="Maharashtra"
                                value={dState}
                                onChange={(e) => setdState(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className={Style.pacd2}>
                            <div className={Style.nameInputDivPCity}>
                              <div className={Style.inputLabelP}>
                                <p>City</p>
                              </div>
                              <input
                                type="text"
                                className={Style.dobInputPatientACC}
                                placeholder="Pune"
                                value={dCity}
                                onChange={(e) => setdCity(e.target.value)}
                              />
                            </div>
                            <div className={Style.nameInputDivP}>
                              <div className={Style.passwordShowACC1}>
                                <div className={Style.inputLabelPasswordP}>
                                  <p>Password</p>
                                </div>
                                <input
                                  type={show ? "text" : "password"}
                                  className={Style.passwordInputPatientACC1}
                                  placeholder="Password"
                                  value={dPassword}
                                  onChange={(e) => setdPassword(e.target.value)}
                                />
                                <button onClick={showPassword}>
                                  {show ? "Hide Password" : "Show Password"}
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className={Style.pacd2}>
                            <div className={Style.nameInputDivP}>
                              <div className={Style.inputLabelP}>
                                <p>Specialization</p>
                              </div>
                              <input
                                type="text"
                                className={Style.dobInputPatientACC}
                                placeholder="Surgeon/ortho/Gynac/Neuro"
                                value={dSpecialization}
                                onChange={(e) =>
                                  setDSpecialization(e.target.value)
                                }
                              />
                            </div>
                            <div className={Style.nameInputDivP}>
                              <div className={Style.inputLabelP}>
                                <p>Medical Degree</p>
                              </div>
                              <input
                                type="text"
                                className={Style.dobInputPatientACC}
                                placeholder="MBBS/BHMS/MD/BDS"
                                value={dmedicalDegree}
                                onChange={(e) =>
                                  setdmedicalDegree(e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className={Style.pacd2}>
                            <div className={Style.hospitalAndAddressDiv}>
                              <div className={Style.nameInputDivPHospital}>
                                <div className={Style.inputLabelP}>
                                  <p>Hospital or Clinic</p>
                                </div>
                                <input
                                  type="text"
                                  className={Style.dobInputPatientACC}
                                  placeholder="Hospital/Clinic"
                                  value={hospitalOrClinic}
                                  onChange={(e) =>
                                    sethospitalOrClinic(e.target.value)
                                  }
                                />
                              </div>
                              <div className={Style.nameInputDivPHospital1}>
                                <div className={Style.inputLabelP1}>
                                  <p>Hospital/Clinic Address</p>
                                </div>
                                <input
                                  type="text"
                                  className={Style.dobInputPatientACC}
                                  placeholder="Address"
                                  value={hcAddress}
                                  onChange={(e) => sethcAddress(e.target.value)}
                                />
                              </div>
                            </div>

                            <div className={Style.DoctorProofNewDiv}>
                              <p>Proof of DoctorShip</p>
                              <input
                                type="file"
                                onChange={(e) => {
                                  setDoctorProofFile(e.target.files[0]);
                                }}
                              />
                            </div>
                          </div>
                          <div className={Style.createAccBtnDivP}>
                            <button
                              className={Style.createAccBtn}
                              onClick={CreateDoctorAccount}
                            >
                              Create Account
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className={Style.patientIDDiv}>
                        <h3 className={Style.patientIDHeading}>Doctor ID</h3>
                        <div className={Style.patientIDAndCopy}>
                          <p>{doctorID}</p>
                          <FontAwesomeIcon
                            icon={faCopy}
                            className={Style.copyFont}
                            size="lg"
                            onClick={handleCopy}
                          />
                        </div>
                        {copySuccess && <span>{copySuccess}</span>}
                        <p className={Style.patientIDWarnPara}>
                          Please remember your Doctor ID. If you forget, it can
                          be regenerated using the formula:
                        </p>
                        <p className={Style.patientIDFormulaPara}>
                          <b>
                            D + Your name's first two letters in uppercase +
                            Your 12-digit Aadhar number
                          </b>
                        </p>
                        <div className={Style.backToLoginDiv}>
                          <Link className={Style.backToLoginLink} to="/">
                            Back to login
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default CreateAccountPage;
