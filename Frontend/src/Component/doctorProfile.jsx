import Style from "../App.module.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";

function DoctorProfile() {
  const [doctorDetails, setDoctorDetails] = useState(null); // State to store doctor details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isEditing, setIsEditing] = useState(false); // State for edit mode
  const [isAppointmentAccepted, setIsAppointmentAccepted] = useState(false);

  let doctorId = localStorage.getItem("doctorID");
  console.log(doctorId);

  useEffect(() => {
    async function getDoctorDetails() {
      try {
        const response = await axios.post("http://localhost:5000/getDoctorDetail", { doctorId });
        setDoctorDetails(response.data); // Save the doctor details in state
        setLoading(false); // Stop loading
      } catch (err) {
        setError("Error fetching doctor details", err);
        setLoading(false); // Stop loading on error
        console.error(err);
      }
    }

    if (doctorId) {
      getDoctorDetails();
    } else {
      setError("No Doctor ID found");
      setLoading(false);
    }
  }, [doctorId]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await axios.put("http://localhost:5000/updateDoctorDetail", doctorDetails); // Send updated data to the backend
      setIsEditing(false); // Exit edit mode
    } catch (err) {
      console.error(err);
      setError("Error saving doctor details");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorDetails((prevDetails) => ({ ...prevDetails, [name]: value })); // Update the specific field
  };

  if (loading) return <p>Loading...</p>; // Display loading state
  if (error) return <p>{error}</p>; // Display error message

  

  const acceptRequest = async (patientId, patientMobNo, doctorName, appointmentDate) => {
    // Task: Send a message and save the request to the patient data
    try {
      // Send a POST request to save the accepted request in the backend
      const response = await axios.post("http://localhost:5000/saveAcceptRequest", {
        patientId,
        patientMobNo,
        doctorName,
        appointmentDate
      });
  
      if (response.status === 200) {
        // Fast2SMS API setup
        const apiUrl = "https://www.fast2sms.com/dev/bulkV2";
        const apiKey = "NOYQosOf7q45XdUTiipvLqMVCyiq7k1HnW1Rkb3BglP0ePOaJxp16zwOkQKb";
  
        // Craft the message with better formatting
        const message = `Dear patient, your appointment with Dr. ${doctorName} on ${appointmentDate} has been successfully confirmed. \n\nThank you for choosing MediLink.`;
  
        // Clean the phone number and remove non-digit characters
        const cleanedPatientMobNo = patientMobNo.replace(/\D/g, "");
        const numericPatientMobNo = Number(cleanedPatientMobNo);
  
        // Prepare URL parameters for the SMS API
        const params = new URLSearchParams({
          authorization: apiKey,
          message: message,
          language: "english",
          route: "q",
          numbers: numericPatientMobNo,
        });
  
        const url = `${apiUrl}?${params.toString()}`;
  
        // Send the SMS request
        fetch(url, { method: "GET" })
          .then((response) => response.json())
          .then((data) => {
            if (data.return) {
              toast.success("Appointment accepted and notification sent successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                transition: Bounce,
                className: Style.customToast
              });
              setIsAppointmentAccepted(true);
            } else {
              throw new Error("Failed to send the notification.");
            }
          })
          .catch((error) => {
            console.error("SMS error:", error);
            toast.error("Appointment accepted but failed to send notification.", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored",
              transition: Bounce,
              className: Style.customToast
            });
          });
      } else {
        throw new Error("Failed to save the appointment request.");
      }
    } catch (error) {
      console.error("Request error:", error);
      toast.error("An error occurred while processing the appointment. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
        className: Style.customToast
      });
    }
  };

  const rejectedRequest = async (doctorName, dateOfAppointment, patientID) => {
    try {
      // Sending POST request to save the rejected appointment
      let response = await axios.post("http://localhost:5000/saveRejectRequests", {
        doctorName,
        dateOfAppointment,
        patientID,
      });
  
      if (response.status === 200) {
        // Display a success toast notification
        toast.success("Appointment has been rejected successfully. Thank you for your time!", {
          position: "top-right",
          autoClose: 5000,  // Toast will disappear after 5 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Bounce,
          className: Style.customToast
        });
        
        // Optional: You can also trigger UI updates here to reflect the rejected status
        // e.g., updating the appointment status to "rejected" in the UI.
        
      } else {
        // Handle any unexpected response status codes
        throw new Error("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error rejecting appointment:", error);
  
      // Display an error toast notification
      toast.error(`An error occurred: ${error.message}. Please try again later.`, {
        position: "top-right",
        autoClose: 5000,  // Toast will disappear after 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
        className: Style.customToast
      });
  
      // Optional: You can log the error or send it to a server for further debugging
      // e.g., logging service like Sentry or a backend endpoint for error reporting
    }
  };
  


  return (
    <div className={Style.mainDivPatient}>
      <div className={Style.navBarPatient}>
        <div className={Style.navBarLogoHeading}>
          <h1>Medilink</h1>
        </div>
        <div className={Style.navBarElements1}>
          <Link className={Style.navBarElementAIHelp} to="/DoctorProfilePage">
            Profile
          </Link>
          <Link className={Style.navBarElementAIHelp} to="/">
            Logout
          </Link>
        </div>
      </div>

      <div className={Style.doctorProfileMainDiv}>
        <div className={Style.doctorProfileDetailDiv}>
          <div className={Style.doctorProfileDetailDiv1}>
            <div className={Style.doctorProfileDetailDiv1Info}>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="doctorName"
                    value={doctorDetails?.doctorName || ""}
                    onChange={handleChange}
                    placeholder="Doctor Name"
                  />
                  <input
                    type="text"
                    name="doctorSpecialization"
                    value={doctorDetails?.doctorSpecialization || ""}
                    onChange={handleChange}
                    placeholder="Specialization"
                  />
                  <input
                    type="text"
                    name="doctorMedicalDegree"
                    value={doctorDetails?.doctorMedicalDegree || ""}
                    onChange={handleChange}
                    placeholder="Medical Degree"
                  />
                </>
              ) : (
                <>
                  <p className={Style.doctorProfileDetailDiv1InfoPara}>{`Dr. ${doctorDetails?.doctorName}`}</p>
                  <p className={Style.doctorProfileDetailDiv1InfoPara1}>
                    {doctorDetails?.doctorSpecialization} | {doctorDetails?.doctorMedicalDegree}
                  </p>
                </>
              )}
            </div>

            <div className={Style.doctorProfileDetailDiv1InfoBtn}>
              {isEditing ? (
                <button onClick={handleSave}>Save</button>
              ) : (
                <button onClick={handleEditClick}>Edit Detail</button>
              )}
            </div>
          </div>
          <div className={Style.doctorProfileDetailDiv2}>
            <h2 className={Style.appointmentRequestsHeading}>Appointment Requests</h2>
            {doctorDetails?.appointments && doctorDetails.appointments.length > 0 ? (
              doctorDetails.appointments.map((appointment, index) => (
                <div key={index} className={Style.appointmentCard}>
                  <p><strong>Patient Name:</strong> {appointment.patientName}</p>
                  <p><strong>Patient ID:</strong> {appointment.patientId}</p>
                  <p><strong>Patient Mobile No.:</strong> {appointment.patientMobNo}</p>
                  <p><strong>Problem:</strong> {appointment.patientProblem}</p>
                  <p><strong>Date:</strong> {appointment.appointmentDate}</p>
                  <div className={Style.acceptAndRejectBtnDiv}>
                    {
                      isAppointmentAccepted ? (<>
                      <p>Appointment is Accepted</p>
                      </>) : (<>
                        <button onClick={()=>acceptRequest(appointment.patientId,appointment.patientMobNo, doctorDetails.doctorName, appointment.appointmentDate )}>Accept</button>
                        <button onClick={()=>rejectedRequest(doctorDetails.doctorName,appointment.appointmentDate,appointment.patientId)}>Reject</button>
                      </>)
                    }
                  </div>
                </div>
              ))
            ) : (
              <p>No appointments booked.</p>
            )}
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default DoctorProfile;

