import React, { useState } from "react";
import { Link } from "react-router-dom";
import Style from "../App.module.css";

function BookAppointmentPage() {
  // State to store selected doctor category
  const [selectedCategory, setSelectedCategory] = useState("Surgeons");

  // Sample data for doctors based on categories
  const doctorsData = {
    Gynecologist: [
      {
        name: "Dr. Priya Sharma",
        specialization: "Gynecologist/Obstetrician",
        experience: "24 years",
        clinicAddress: "Unity Hospital, Aundh, Pune",
        consultationFee: "₹700",
      },
      {
        name: "Dr. Neha Desai",
        specialization: "Gynecologist/Obstetrician",
        experience: "18 years",
        clinicAddress: "Wellness Clinic, Kothrud, Pune",
        consultationFee: "₹650",
      },
    ],
    Surgeons: [
      {
        name: "Dr. Rajesh Iyer",
        specialization: "General Surgeon",
        experience: "12 years",
        clinicAddress: "Care Hospital, Shivajinagar, Pune",
        consultationFee: "₹900",
      },
      {
        name: "Dr. Kavita Menon",
        specialization: "General Surgeon",
        experience: "7 years",
        clinicAddress: "Global Hospital, Baner, Pune",
        consultationFee: "₹800",
      },
    ],
    GeneralMD: [
      {
        name: "Dr. Sanjay Gupta",
        specialization: "General Physician",
        experience: "9 years",
        clinicAddress: "City Clinic, Deccan, Pune",
        consultationFee: "₹500",
      },
      {
        name: "Dr. Anjali Patil",
        specialization: "General Physician",
        experience: "6 years",
        clinicAddress: "Health Plus, Wakad, Pune",
        consultationFee: "₹550",
      },
    ],
    Orthopedic: [
      {
        name: "Dr. Vijay Kumar",
        specialization: "Orthopedic Surgeon",
        experience: "11 years",
        clinicAddress: "Bone Care Hospital, Hadapsar, Pune",
        consultationFee: "₹1000",
      },
      {
        name: "Dr. Rakesh Mehta",
        specialization: "Orthopedic Surgeon",
        experience: "8 years",
        clinicAddress: "Orthocare Clinic, Kalyani Nagar, Pune",
        consultationFee: "₹950",
      },
    ],
    Neurologist: [
      {
        name: "Dr. Arjun Sinha",
        specialization: "Neurologist",
        experience: "15 years",
        clinicAddress: "Neuro Wellness, Viman Nagar, Pune",
        consultationFee: "₹1200",
      },
      {
        name: "Dr. Pooja Bhatt",
        specialization: "Neurologist",
        experience: "10 years",
        clinicAddress: "Brain Care Hospital, Hinjewadi, Pune",
        consultationFee: "₹1100",
      },
    ],
  };

  // Function to handle button clicks
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
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
              logout
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

                    <button className={Style.bookClinicVisitBtn}>
                      Book Clinic Visit
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default BookAppointmentPage;
