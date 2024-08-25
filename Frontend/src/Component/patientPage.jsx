import React from "react";
import { Link } from "react-router-dom";
import Style from "../App.module.css";

function PatientPage() {
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
            <Link className={Style.navBarElement1}>Contact Us</Link>
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

        <div className={Style.section5MainDiv}>

          <h1 className={Style.section5MainDivHeading}>Innovative healthcare solutions for a better tomorrow</h1>
          <input type="email" className={Style.emailInputSection5MainDiv} placeholder="Email"/>
          <button className={Style.subscribeBtnSection5}>Subscribe</button>

        </div>

      </div>
    </>
  );
}

export default PatientPage;
