import React, { useState } from "react";
import { Link } from "react-router-dom";
import Style from "../App.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faHeadset, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast, Bounce } from "react-toastify";
import axios from "axios";

function PatientPage() {

  const [PCName, setPCName] = useState("");
  const [PCEmail, setPCEmail] = useState("");
  const [PCMobileNumber, setPCMobileNumber] = useState("");
  const [PCMessage, setPCMessage]= useState("");

  const patientContactUsDetails = async () =>{
    if(PCName && PCEmail && PCMobileNumber && PCMessage){
      try {
        await axios.post("http://localhost:5000/patientContactUsDetails", {PCName,PCEmail,PCMobileNumber,PCMessage})
        .then((res)=>{
          if(res.status === 200){
            toast.success("Thank You!, we will contact you shortly", {
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
        }).catch((error)=>{
          if(error.response && error.response.status === 500){
            toast.error("Failed to sent message!, Try again later", {
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
        toast.error("An Internal error occurred", {
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
    }else{
      toast.warn("All fields are required", {
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
        {/* --------- Navbar -------------- */}
        <div className={Style.navBarPatient}>
          <div className={Style.navBarLogoHeading}>
            <h1>Medilink</h1>
          </div>

          <div className={Style.navBarElements}>
            <Link className={Style.navBarElement1} to="/patientPage">Home</Link>
            <a className={Style.navBarElement1} href="#services">Services</a>
            <a className={Style.navBarElement1} href="#contactUs">Contact Us</a>
          </div>

          <div className={Style.navBarElements1}>
            <Link className={Style.navBarElementAIHelp} to="/">logout</Link>
          </div>
        </div>

        {/* -------------- section 1 ------------------ */}
        <div className={Style.section1MainDiv}>
          <div className={Style.section1Div1}>
            <p className={Style.section1Div1Para1}>
              HealthCare Management Platform
            </p>
            <h1 className={Style.section1Div1Heading1}>
              Revolutionize healthcare with{" "}
              <span className={Style.linkHeading}>Medilink</span>
            </h1>
            <p className={Style.section1Div1Para2}>
              Medilink transforms healthcare by centralizing patient records
              into a secure, accessible platform, enhancing both patient and
              doctor experiences. It offers a user-friendly interface with
              predictive analytics and AI-driven health assistance to manage
              health proactively and improve treatment accuracy. This
              comprehensive approach streamlines healthcare management and
              supports better outcomes for all users.
            </p>
            <button className={Style.getStartedButton}>Get Started</button>
          </div>
          <div className={Style.section1Div2}>
            <img
              src="/Assets/doctorImage`.jpg"
              alt=""
              className={Style.section1Div2Image}
            />
          </div>
        </div>

        {/* --------------- section 2 --------- */}

        <div className={Style.section2MainDiv}>
          <div className={Style.section2MainDiv1}>
            <h1 className={Style.section2MainDiv1Heading}>Our Vision</h1>
            <p className={Style.section2MainDiv1Para}>
              Our vision is to revolutionize healthcare management, empowering
              patients to take control of their health while supporting doctors
              in delivering better care.
            </p>
          </div>
          <div className={Style.section2MainDiv2}>
            <h1 className={Style.section2MainDiv1Heading}>Our Mission</h1>
            <p className={Style.section2MainDiv1Para}>
              Our mission is to create a seamless and secure platform that
              centralizes medical records, harnesses advanced technologies like
              AI and predictive analytics.
            </p>
          </div>
        </div>

        {/* -------------------- section 3 ------------------ */}

        <div className={Style.section3MainDiv} id="services">
          <p className={Style.section1Div1Para1}>Our Services</p>
          <h1 className={Style.section1Div1Heading2}>
            Innovative healthcare management solutions for better outcomes
          </h1>
          <div className={Style.servicesTypesDiv}>
            <div className={Style.serviceType}>
              <h1 className={Style.serviceTypeHeading}>Health Record</h1>
              <p className={Style.serviceTypePara}>
                Centralized patient records that streamline healthcare
                management.
              </p>
              <button className={Style.exploreBtnService}>Explore</button>
            </div>


            <div className={Style.serviceType}>
              <h1 className={Style.serviceTypeHeading}>Predictive Analytics</h1>
              <p className={Style.serviceTypePara}>
                Improved healthcare outcomes through predictive analytics
                Technique.
              </p>
              <button className={Style.exploreBtnService}>Explore</button>
            </div>

            <div className={Style.serviceType}>
              <h1 className={Style.serviceTypeHeading}>AI Health Assistance</h1>
              <p className={Style.serviceTypePara}>
                Personalized support and guidance for patients through AI-driven
                health assistance.
              </p>
              <button className={Style.exploreBtnService}>Explore</button>
            </div>
          </div>
        </div>

        {/* --------------------- section 4 ---------------- */}

        <div className={Style.section4MainDiv}>
          <div className={Style.section4MainDivInnerDiv}>
            <p className={Style.section4MainDivInnerDivPara1}>Let's get started</p>
            <h1 className={Style.section4MainDivInnerDivHeading1}>Take control of your health with Medilink</h1>
            <p className={Style.section4MainDivInnerDivPara2}>Sign up with Medilink today and get your first consultation free, while taking control of your health with our innovative healthcare management solutions.</p>
            <button className={Style.freeConsultationBtn}>Free Consultation</button>
          </div>
        </div>

        {/* --------------------- section 5 ---------------- */}

        <div className={Style.section3MainDiv} id="contactUs">
          <p className={Style.section1Div1Para1}>Contact Us</p>
          <h1 className={Style.section5Div5Heading2}>
          Get in Touch with Medilink, We're Here to Help You!
          </h1>
          <div className={Style.servicesTypesDiv}>
            <div className={Style.contactUsDiv1}>
              <p className={Style.contactUsPara}>At Medilink, your health is our priority. Whether you have questions, need help, or want to learn more, we’re here for you. Contact us anytime!</p>

              <div className={Style.contactUsDiv11}>
                <div className={Style.logoContactUsImage}>
                {/* <FontAwesomeIcon icon={faCoffee} className={Style.fontColorContactUS}/> */}
                <FontAwesomeIcon icon={faLocationDot} className={Style.fontColorContactUS}/>
                </div>
                <div className={Style.contactUsDetails}>
                  <h1>Address</h1>
                  <p>123 Maplewood Avenue, Springfield, IL 62704, Pune, Maharashtra , India</p>

                </div>
              </div>

              <div className={Style.contactUsDiv11}>
                <div className={Style.logoContactUsImage}>
                {/* <FontAwesomeIcon icon={faCoffee} className={Style.fontColorContactUS}/> */}
                <FontAwesomeIcon icon={faHeadset} className={Style.fontColorContactUS}/>
                </div>
                <div className={Style.contactUsDetails}>
                  <h1>Phone Number</h1>
                  <p>+91 98765 43210</p>

                </div>
              </div>

              <div className={Style.contactUsDiv11}>
                <div className={Style.logoContactUsImage}>
                {/* <FontAwesomeIcon icon={faCoffee} className={Style.fontColorContactUS}/> */}
                <FontAwesomeIcon icon={faEnvelope} className={Style.fontColorContactUS}/>
                </div>
                <div className={Style.contactUsDetails}>
                  <h1>Email Address</h1>
                  <p>medilinkhealthcare@gmail.com</p>

                </div>
              </div>
              
            </div>


            <div className={Style.contactUsDiv2}>
              <input type="text" placeholder="Name" className={Style.contactUsNameInput} value={PCName} onChange={(e)=>setPCName(e.target.value)}/>
              <input type="email" placeholder="Email" className={Style.contactUSemailInput} value={PCEmail} onChange={(e)=>setPCEmail(e.target.value)}/>
              <input type="text" placeholder="Mobile No." className={Style.contactUSemailInput} value={PCMobileNumber} onChange={(e)=>setPCMobileNumber(e.target.value)}/>
              <textarea type="text" placeholder="Message" className={Style.contactUSTextAreaInput} value={PCMessage} onChange={(e)=>setPCMessage(e.target.value)}/>
              <button className={Style.contactUsSubmitBtn} onClick={patientContactUsDetails}>Submit</button>

              
            </div>

           
          </div>
        </div>

        <ToastContainer/>

      </div>
    </>
  );
}

export default PatientPage;
