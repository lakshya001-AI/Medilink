import React, { useState } from "react";
import Style from "../App.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

function LoginPage() {
  const [view, setView] = useState("patient");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [patientID, setPatientID] = useState("");
  const [patientPassword, setPatientPassword] = useState("");
  const [doctorID, setDoctorID] = useState("");
  const [doctorPassword, setDoctorPassword] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // This popup and it's details are only for the patient
  const [showPopup, setShowPopup] = useState(false);
  const [FPatientID, setFPatientID] = useState("");
  const [pNewPassword, setpNewPassword] = useState("");
  const [pConfirmPassword, setpConfirmPassword] = useState("");
  const [pAadhaarNo, setPAadhaarNo] = useState("");
  const [recoverPatientId, setRecoverPatientID] = useState("");

  async function changePatientPassword(){
    if(FPatientID && pNewPassword && pConfirmPassword){

      if(pNewPassword !== pConfirmPassword){

        toast.warn("Confirm password does not match the password. Please re-enter.", {
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

        try {

          await axios.post("http://localhost:5000/changePatientPassword", {FPatientID, pNewPassword, pConfirmPassword})
          .then((res)=>{
            toast.success("Password updated successfully!", {
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
            }).catch((error)=>{
            if(error.response && error.response.status === 400){

              toast.error("Account not Found or Patient Id is incorrect!", {
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

              toast.error("Internal Error!, try again later", {
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
          });
          
        } catch (error) {
  
          toast.error("External Error!, try again later", {
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
    }else{

      toast.warn("All fields are required to change the Password", {
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

  async function getPatientID(){
    if(!pAadhaarNo){


      toast.warn("Please enter the Aadhaar Number to get the ID", {
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

    }else if(pAadhaarNo.length !== 12){

      toast.warn("Aadhaar Number must be of 12 digits", {
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

      await axios.post("http://localhost:5000/getPatientID", {pAadhaarNo})
      .then((res)=>{
        setRecoverPatientID(res.data.pID);
      })
      .catch((error)=>{

        if(error.response && error.response.status === 400){

          toast.error("Account not found or Aadhaar Number is incorrect", {
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

          toast.error("External Error!, try again later", {
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
        
        
      });
    }

  }

  // This popup and it's details are only for the doctors
  const [showDoctorPopup, setShowDoctorPopup] = useState(false);
  const [FDoctorID, setFDoctorID] = useState("");
  const [dNewPassword, setdNewPassword] = useState("");
  const [dConfirmPassword, setdConfirmPassword] = useState("");
  const [dAadhaarNo, setDAadhaarNo] = useState("");
  const [recoverDoctorId, setRecoverDoctorID] = useState("");

  async function changeDoctorPassword(){
    if(FDoctorID && dNewPassword && dConfirmPassword){

      if(dNewPassword !== dConfirmPassword){

        toast.warn("Confirm password does not match the password. Please re-enter.", {
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

        try {

          await axios.post("http://localhost:5000/changeDoctorPassword", {FDoctorID, dNewPassword, dConfirmPassword})
          .then((res)=>{
            toast.success("Password updated successfully!", {
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
            }).catch((error)=>{
            if(error.response && error.response.status === 400){

              toast.error("Account not Found or Doctor Id is incorrect!", {
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

              toast.error("Internal Error!, try again later", {
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
          });
          
        } catch (error) {
  
          toast.error("External Error!, try again later", {
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
    }else{

      toast.warn("All fields are required to change the Password", {
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


  async function getDoctorID(){
    if(!dAadhaarNo){


      toast.warn("Please enter the Aadhaar Number to get the ID", {
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

      toast.warn("Aadhaar Number must be of 12 digits", {
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

      await axios.post("http://localhost:5000/getDoctorID", {dAadhaarNo})
      .then((res)=>{
        setRecoverDoctorID(res.data.dID);
      })
      .catch((error)=>{

        if(error.response && error.response.status === 400){

          toast.error("Account not found or Aadhaar Number is incorrect", {
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

          toast.error("External Error!, try again later", {
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
        
        
      });
    }

  }




  const handleLinkClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedOption("");
  };

  const handleDoctorLinkClick = () => {
    setShowDoctorPopup(true);
  };

  const handleDoctorClosePopup = () => {
    setShowDoctorPopup(false);
    setSelectedOption("");
  };

  function selectPatientDiv() {
    setView("patient");
  }

  function selectDoctorsDiv() {
    setView("doctors");
  }

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  async function PatientLogin() {
    if (patientID && patientPassword) {
      try {
        await axios
          .post("http://localhost:5000/patientLogin", {
            patientID,
            patientPassword,
          })
          .then((res) => {
            toast.success("Login successful! Welcome to Medilink", {
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

            setTimeout(() => {
              navigate("/patientPage");
            }, 5000);
          })
          .catch((error) => {
            if (error.response && error.response.status === 401) {
              toast.error("Invalid Password!, Please try again.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                className: Style.customToast,
                transition: Bounce,
              });
            } else if (error.response && error.response.status === 400) {
              toast.error("Account not found!, Please create your account", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                className: Style.customToast,
                transition: Bounce,
              });
            } else {
              toast.error("Internal Error!, Failed to login", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                className: Style.customToast,
                transition: Bounce,
              });
            }
          });
      } catch (error) {
        toast.error("External Error!, Failed to login", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          className: Style.customToast,
          transition: Bounce,
        });
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
  }

  async function DoctorLogin() {
    if (doctorID && doctorPassword) {
      try {
        await axios
          .post("http://localhost:5000/doctorLogin", {
            doctorID,
            doctorPassword,
          })
          .then((res) => {
            toast.success("Login successful! Welcome to Medilink", {
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

            setTimeout(() => {
              navigate("/doctorPage");
            }, 5000);
          })
          .catch((error) => {
            if (error.response && error.response.status === 401) {
              toast.error("Password is Incorrect! Please Check your Password", {
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
            } else if (error.response && error.response.status === 400) {
              toast.error("Account not found! Please create your account", {
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
              toast.error("Internal Error! Please try again", {
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
          });
      } catch (error) {
        toast.error("External Error! Please try again", {
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
  }

  return (
    <>
      <div className={Style.mainDiv}>
        <div className={Style.loginDiv}>
          <div className={Style.overlay}>
            <div className={Style.loginInfoDiv}>
              <div className={Style.loginInfoDiv1}>
                <img src="Assets/medilinklogo.png" alt="" />
              </div>
              <div className={Style.loginInfoDiv2}>
                <p className={Style.loginPara1}>Welcome to Medilink</p>
                <p className={Style.loginPara2}>Sign into Your account</p>
                <div className={Style.loginLinkDiv}>
                  <a
                    href="#patientDiv"
                    onClick={selectPatientDiv}
                    className={view === "patient" ? Style.selectedLink : ""}
                  >
                    Patient
                  </a>
                  <a
                    href="#doctorDiv"
                    onClick={selectDoctorsDiv}
                    className={view === "doctors" ? Style.selectedLink : ""}
                  >
                    Doctor
                  </a>
                </div>
                {view === "patient" && (
                  <div className={Style.patientDiv} id="patientDiv">
                    <div className={Style.idDiv}>
                      <FontAwesomeIcon
                        icon={faUser}
                        className={Style.userIcon}
                        size="lg"
                      />
                      <input
                        type="text"
                        placeholder="Patient ID"
                        value={patientID}
                        onChange={(e) => setPatientID(e.target.value)}
                      />
                    </div>
                    <div className={Style.passwordDiv}>
                      <FontAwesomeIcon
                        icon={faLock}
                        className={Style.userIcon}
                        size="lg"
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={patientPassword}
                        onChange={(e) => setPatientPassword(e.target.value)}
                      />
                    </div>
                    <div className={Style.showPassAndForgotDiv}>
                      <button
                        className={Style.showPassBtn}
                        onClick={toggleShowPassword}
                      >
                        {showPassword ? "Hide Password" : "Show Password"}
                      </button>
                    </div>
                    <button className={Style.signInBtn} onClick={PatientLogin}>
                      Sign In
                    </button>
                    <div className={Style.createAccountLinkDiv}>
                      <p>Don't have an account?</p>
                      <Link
                        className={Style.createAccountLink}
                        to="/createAccount"
                      >
                        Create Account
                      </Link>
                    </div>
                    <Link
                      className={Style.forgotPasswordLink}
                      onClick={handleLinkClick}
                    >
                      Forgot Patient ID or Password? 
                    </Link>
                  </div>
                )}
                {view === "doctors" && (
                  <div className={Style.doctorDiv} id="doctorDiv">
                    <div className={Style.idDiv}>
                      <FontAwesomeIcon
                        icon={faUser}
                        className={Style.userIcon}
                        size="lg"
                      />
                      <input
                        type="text"
                        placeholder="Doctor ID"
                        value={doctorID}
                        onChange={(e) => setDoctorID(e.target.value)}
                      />
                    </div>
                    <div className={Style.passwordDiv}>
                      <FontAwesomeIcon
                        icon={faLock}
                        className={Style.userIcon}
                        size="lg"
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={doctorPassword}
                        onChange={(e) => setDoctorPassword(e.target.value)}
                      />
                    </div>
                    <div className={Style.showPassAndForgotDiv}>
                      <button
                        className={Style.showPassBtn}
                        onClick={toggleShowPassword}
                      >
                        {showPassword ? "Hide Password" : "Show Password"}
                      </button>
                    </div>
                    <button className={Style.signInBtn} onClick={DoctorLogin}>
                      Sign In
                    </button>
                    <div className={Style.createAccountLinkDiv}>
                      <p>Don't have an account?</p>
                      <Link
                        className={Style.createAccountLink}
                        to="/createAccount"
                      >
                        Create Account
                      </Link>
                    </div>
                    <Link
                      className={Style.forgotPasswordLink}
                      onClick={handleDoctorLinkClick}
                    >
                      Forgot Doctor ID or Password?
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {showPopup && (
          <div className={Style.popupOverlay}>
            <div className={Style.popup}>
              {!selectedOption && (
                <div className={Style.selectOptionForChangeDiv}>
                  <h2>Select an option</h2>
                  <button
                    onClick={() => setSelectedOption("password")}
                    className={Style.optionButton}
                  >
                    Forgot Password
                  </button>
                  <button
                    onClick={() => setSelectedOption("id")}
                    className={Style.optionButton}
                  >
                    Forgot Patient ID
                  </button>
                  <button
                    onClick={handleClosePopup}
                    className={Style.closeButton}
                  >
                    Cancel
                  </button>
                </div>
              )}

              {selectedOption === "password" && (
                <div>
                  <h3>Change Password</h3>
                  <input
                    type="text"
                    placeholder="Enter Patient ID"
                    value={FPatientID}
                    onChange={(e) => setFPatientID(e.target.value)}
                    className={Style.inputField}
                  />

                  <div className={Style.passwordInputWrapper}>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={pNewPassword}
                      onChange={(e) => setpNewPassword(e.target.value)}
                      className={Style.inputField}
                    />
                    <span
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className={Style.eyeIcon}
                    >
                      {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  <div className={Style.passwordInputWrapper}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Enter confirm password"
                      value={pConfirmPassword}
                      onChange={(e) => setpConfirmPassword(e.target.value)}
                      className={Style.inputField}
                    />
                    <span
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className={Style.eyeIcon}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  <button
                    className={Style.saveButton}
                    onClick={changePatientPassword}
                  >
                    save
                  </button>
                  <button
                    onClick={handleClosePopup}
                    className={Style.closeButton}
                  >
                    Cancel
                  </button>
                </div>
              )}

              {selectedOption === "id" && (
                <div>
                  <h3>Change ID</h3>
                  <input
                    type="text"
                    placeholder="Enter 12 digit Aadhaar Number"
                    className={Style.inputField}
                    value={pAadhaarNo}
                    onChange={(e)=>setPAadhaarNo(e.target.value)}
                  />
                  <div className={Style.recoveryPatientIDDiv}>{recoverPatientId.length === 0 ? (<p></p>) : (<p>{`Your Patient ID: ${recoverPatientId}`}</p>)}</div>
                  <button className={Style.saveButton} onClick={getPatientID}>Get ID</button>
                  <button
                    onClick={handleClosePopup}
                    className={Style.closeButton}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {showDoctorPopup && (
          <div className={Style.popupOverlay}>
            <div className={Style.popup}>
              {!selectedOption && (
                <div className={Style.selectOptionForChangeDiv}>
                  <h2>Select an option</h2>
                  <button
                    onClick={() => setSelectedOption("password")}
                    className={Style.optionButton}
                  >
                    Forgot Password
                  </button>
                  <button
                    onClick={() => setSelectedOption("id")}
                    className={Style.optionButton}
                  >
                    Forgot Doctor ID
                  </button>
                  <button
                    onClick={handleDoctorClosePopup}
                    className={Style.closeButton}
                  >
                    Cancel
                  </button>
                </div>
              )}

              {selectedOption === "password" && (
                <div>
                  <h3>Change Password</h3>
                  <input
                    type="text"
                    placeholder="Enter Doctor ID"
                    value={FDoctorID}
                    onChange={(e) => setFDoctorID(e.target.value)}
                    className={Style.inputField}
                  />

                  <div className={Style.passwordInputWrapper}>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={dNewPassword}
                      onChange={(e) => setdNewPassword(e.target.value)}
                      className={Style.inputField}
                    />
                    <span
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className={Style.eyeIcon}
                    >
                      {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  <div className={Style.passwordInputWrapper}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Enter confirm password"
                      value={dConfirmPassword}
                      onChange={(e) => setdConfirmPassword(e.target.value)}
                      className={Style.inputField}
                    />
                    <span
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className={Style.eyeIcon}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  <button
                    className={Style.saveButton}
                    onClick={changeDoctorPassword}
                  >
                    save
                  </button>
                  <button
                    onClick={handleDoctorClosePopup}
                    className={Style.closeButton}
                  >
                    Cancel
                  </button>
                </div>
              )}

              {selectedOption === "id" && (
                <div>
                  <h3>Change ID</h3>
                  <input
                    type="text"
                    placeholder="Enter 12 digit Aadhaar Number"
                    className={Style.inputField}
                    value={dAadhaarNo}
                    onChange={(e)=>setDAadhaarNo(e.target.value)}
                  />
                  <div className={Style.recoveryPatientIDDiv}>{recoverDoctorId.length === 0 ? (<p></p>) : (<p>{`Your Doctor ID: ${recoverDoctorId}`}</p>)}</div>
                  <button className={Style.saveButton} onClick={getDoctorID}>Get ID</button>
                  <button
                    onClick={handleDoctorClosePopup}
                    className={Style.closeButton}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        <ToastContainer />
      </div>
    </>
  );
}

export default LoginPage;
