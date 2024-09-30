// import Style from "../App.module.css";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// function DoctorProfile() {
//   const [doctorDetails, setDoctorDetails] = useState(null); // State to store doctor details
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state
//   const [isEditing, setIsEditing] = useState(false); // State for edit mode

//   let doctorId = localStorage.getItem("doctorID");
//   console.log(doctorId);

//   useEffect(() => {
//     async function getDoctorDetails() {
//       try {
//         const response = await axios.post("http://localhost:5000/getDoctorDetail", { doctorId });
//         setDoctorDetails(response.data); // Save the doctor details in state
//         setLoading(false); // Stop loading
//       } catch (err) {
//         setError("Error fetching doctor details", err);
//         setLoading(false); // Stop loading on error
//         console.error(err);
//       }
//     }

//     if (doctorId) {
//       getDoctorDetails();
//     } else {
//       setError("No Doctor ID found");
//       setLoading(false);
//     }
//   }, [doctorId]);

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleSave = async () => {
//     try {
//       await axios.put("http://localhost:5000/updateDoctorDetail", doctorDetails); // Send updated data to the backend
//       setIsEditing(false); // Exit edit mode
//     } catch (err) {
//       console.error(err);
//       setError("Error saving doctor details");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setDoctorDetails((prevDetails) => ({ ...prevDetails, [name]: value })); // Update the specific field
//   };

//   if (loading) return <p>Loading...</p>; // Display loading state
//   if (error) return <p>{error}</p>; // Display error message

//   return (
//     <div className={Style.mainDivPatient}>
//       <div className={Style.navBarPatient}>
//         <div className={Style.navBarLogoHeading}>
//           <h1>Medilink</h1>
//         </div>
//         <div className={Style.navBarElements1}>
//           <Link className={Style.navBarElementAIHelp} to="/DoctorProfilePage">
//             Profile
//           </Link>
//           <Link className={Style.navBarElementAIHelp} to="/">
//             Logout
//           </Link>
//         </div>
//       </div>

//       <div className={Style.doctorProfileMainDiv}>
//         <div className={Style.doctorProfileDetailDiv}>
//           <div className={Style.doctorProfileDetailDiv1}>
//             <div className={Style.doctorProfileDetailDiv1Info}>
//               {isEditing ? (
//                 <>
//                   <input
//                     type="text"
//                     name="name"
//                     value={doctorDetails?.name || ""}
//                     onChange={handleChange}
//                     placeholder="Doctor Name"
//                   />
//                   <input
//                     type="text"
//                     name="specialization"
//                     value={doctorDetails?.specialization || ""}
//                     onChange={handleChange}
//                     placeholder="Specialization"
//                   />
//                   <input
//                     type="text"
//                     name="experience"
//                     value={doctorDetails?.experience || ""}
//                     onChange={handleChange}
//                     placeholder="Experience"
//                   />
//                 </>
//               ) : (
//                 <>
//                   <p className={Style.doctorProfileDetailDiv1InfoPara}>{`Dr.${doctorDetails?.doctorName}`}</p>
//                   <p className={Style.doctorProfileDetailDiv1InfoPara1}>
//                     {doctorDetails?.doctorSpecialization} | {doctorDetails?.doctorMedicalDegree}
//                   </p>
//                 </>
//               )}
//             </div>

//             <div className={Style.doctorProfileDetailDiv1InfoBtn}>
//               {isEditing ? (
//                 <button onClick={handleSave}>Save</button>
//               ) : (
//                 <button>Edit Detail</button>
//               )}
//             </div>
//           </div>
//           <div className={Style.doctorProfileDetailDiv2}>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DoctorProfile;


import Style from "../App.module.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function DoctorProfile() {
  const [doctorDetails, setDoctorDetails] = useState(null); // State to store doctor details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isEditing, setIsEditing] = useState(false); // State for edit mode

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
                  <p><strong>Problem:</strong> {appointment.patientProblem}</p>
                  <p><strong>Date:</strong> {appointment.appointmentDate}</p>
                </div>
              ))
            ) : (
              <p>No appointments booked.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;

