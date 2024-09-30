import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Style from "../App.module.css";
import { ToastContainer, toast, Bounce } from "react-toastify";

function BookAppointmentPage() {
  // State to store selected doctor category
  const [selectedCategory, setSelectedCategory] = useState("Surgeons");
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for popup visibility
  const [patientName, setPatientName] = useState("");
  const [patientProblem, setPatientProblem] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [doctorID, setDoctorID] = useState(""); // Store the selected doctor ID

  // Sample data for doctors based on categories
  const doctorsData = {
    Gynecologist: [],
    Surgeons: [
      {
        name: "Dr. Kunal Malviya",
        specialization: "General Surgeon",
        experience: "12 years",
        clinicAddress: "Care Hospital, Shivajinagar, Pune",
        consultationFee: "₹900",
        doctorID: "1234" // Add a doctorID for the appointment
      },
    ],
    GeneralMD: [],
    Orthopedic: [],
    Neurologist: [],
  };

  // Function to handle button clicks
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // Function to open the booking popup
  const handleBookClinicVisit = (doctorID) => {
    setDoctorID(doctorID); // Set the doctor ID for the appointment
    setIsPopupOpen(true);
  };

  // Function to save the appointment details
  const saveAppointment = async () => {
    try {
      await axios.post("http://localhost:5000/saveAppointmentDetails", {
        patientName,
        patientProblem,
        appointmentDate,
        doctorID,
      });
      // Close the popup and reset the fields
      setIsPopupOpen(false);
      setPatientName("");
      setPatientProblem("");
      setAppointmentDate("");
      toast.success("Appointment booked successfully!", {
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
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Please try again.");
    }
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
            <Link className={Style.navBarElement1} to="/patientPage#services">
              Services
            </Link>
            <Link className={Style.navBarElement1} to="/patientPage">
              Contact Us
            </Link>
          </div>

          <div className={Style.navBarElements1}>
            <Link className={Style.navBarElementAIHelp} to="/">
              Logout
            </Link>
          </div>
        </div>

        {/* --- Main div of the appointment --- */}
        <div className={Style.bookAppointmentMainDiv}>
          <div className={Style.bookAppointmentOptionDiv}>
            <button onClick={() => handleCategoryClick("Surgeons")}>
              Surgeons
            </button>
            <button onClick={() => handleCategoryClick("Gynecologist")}>
              Gynecologist
            </button>
            <button onClick={() => handleCategoryClick("GeneralMD")}>
              General MD
            </button>
            <button onClick={() => handleCategoryClick("Orthopedic")}>
              Orthopedic
            </button>
            <button onClick={() => handleCategoryClick("Neurologist")}>
              Neurologist
            </button>
          </div>

          {/* Div to display doctors based on selected category */}
          <div className={Style.bookAppointmentDoctorOptionsDiv}>
            {selectedCategory && (
              <>
                {doctorsData[selectedCategory].map((doctor, index) => (
                  <div key={index} className={Style.doctorOppintnmentDiv}>
                    <p className={Style.doctorNamePara}>{doctor.name}</p>
                    <p className={Style.specializationPara}>
                      {doctor.specialization}
                    </p>
                    <p
                      className={Style.yearsOfExperiencePara}
                    >{`🟣 ${doctor.experience} experience overall`}</p>
                    <p
                      className={Style.doctorClinicAddressPara}
                    >{`✔️ ${doctor.clinicAddress}`}</p>
                    <p
                      className={Style.consultationFessPara}
                    >{`💷 ${doctor.consultationFee} Consultation fee at clinic`}</p>

                    <button 
                      className={Style.bookClinicVisitBtn} 
                      onClick={() => handleBookClinicVisit("DKU234523452345")} // Pass the doctor ID
                    >
                      Book Clinic Visit
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Popup for booking appointment */}
          {isPopupOpen && (
            <div className={Style.popup}>
              <div className={Style.popupContent}>
                <h2>Book Appointment</h2>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Your Problem"
                  value={patientProblem}
                  onChange={(e) => setPatientProblem(e.target.value)}
                />
                <input
                  type="date"
                  placeholder="Date of Appointment"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                />
                <button onClick={saveAppointment}>Book Appointment</button>
                <button onClick={() => setIsPopupOpen(false)}>Cancel</button>
              </div>
            </div>
          )}
        </div>
        <ToastContainer/>
      </div>
    </>
  );
}

export default BookAppointmentPage;

