import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Style from "../App.module.css";
import axios from "axios";
import { SimpleSelect } from "react-selectize";
import "react-selectize/themes/index.css";
import Select from "react-select";

function DiesesPredictionPage() {
  const [symptoms, setSymptoms] = useState("");
  const [prediction, setPrediction] = useState("");

  const symptomOptions1 = [
    {
      value: "Itching , Skin Rash, Skin Eruptions",
      label: "Itching , Skin Rash, Skin Eruptions",
    },
    { value: "Cough, Fever, Runny Nose", label: "Cough, Fever, Runny Nose" },
    { value: "Headache, Fever, Cough", label: "Headache, Fever, Cough" },
    {
      value: "Sneezing, Runny Nose, Itching",
      label: "Sneezing, Runny Nose, Itching",
    },
    {
      value: "Chest Pain, Shortness of Breath, Fatigue",
      label: "Chest Pain, Shortness of Breath, Fatigue",
    },
    {
      value: "Joint Pain, Swelling, Redness",
      label: "Joint Pain, Swelling, Redness",
    },
    {
      value: "Sore Throat, Cough, Difficulty Swallowing",
      label: "Sore Throat, Cough, Difficulty Swallowing",
    },
    { value: "Fever, Chills, Sweating", label: "Fever, Chills, Sweating" },
    {
      value: "Nausea, Vomiting, Diarrhea",
      label: "Nausea, Vomiting, Diarrhea",
    },
    {
      value: "Muscle Pain, Fatigue, Fever",
      label: "Muscle Pain, Fatigue, Fever",
    },
    {
      value: "Back Pain, Muscle Weakness, Numbness",
      label: "Back Pain, Muscle Weakness, Numbness",
    },
    {
      value: "Frequent Urination, Painful Urination",
      label: "Frequent Urination, Painful Urination",
    },
    {
      value: "Blurry Vision, Eye Pain, Redness",
      label: "Blurry Vision, Eye Pain, Redness",
    },
    {
      value: "Dizziness, Lightheadedness, Fainting",
      label: "Dizziness, Lightheadedness, Fainting",
    },
    {
      value: "Weight Loss, Increased Thirst, Frequent Urination",
      label: "Weight Loss, Increased Thirst, Frequent Urination",
    },

    {
      value: "Skin Lesions, Fatigue, Night Sweats",
      label: "Skin Lesions, Fatigue, Night Sweats",
    },

    {
      value: "Unexplained Weight Loss, Persistent Cough, Blood in Sputum",
      label: "Unexplained Weight Loss, Persistent Cough, Blood in Sputum",
    },

    {
      value: "Severe Headache, Stiff Neck, Sensitivity to Light",
      label: "Severe Headache, Stiff Neck, Sensitivity to Light",
    },

    {
      value: "Extreme Thirst, Dry Mouth, Fatigue",
      label: "Extreme Thirst, Dry Mouth, Fatigue",
    },

    {
      value: "High Fever, Rash, Joint Pain",
      label: "High Fever, Rash, Joint Pain",
    },

    {
      value: "Coughing Up Blood, Chest Pain, Weight Loss",
      label: "Coughing Up Blood, Chest Pain, Weight Loss",
    },

    {
      value: "Painful Red Lump in Skin, Fever",
      label: "Painful Red Lump in Skin, Fever",
    },

    {
      value: "Sudden Severe Headache, Nausea, Sensitivity to Light",
      label: "Sudden Severe Headache, Nausea, Sensitivity to Light",
    },

    {
      value: "Heart Palpitations, Chest Pain, Shortness of Breath",
      label: "Heart Palpitations, Chest Pain, Shortness of Breath",
    },

    {
      value: "Sudden Severe Headache, Nausea, Sensitivity to Light",
      label: "Sudden Severe Headache, Nausea, Sensitivity to Light",
    },

    {
      value: "Loss of Taste or Smell Sore Throat Headache",
      label: "Loss of Taste or Smell Sore Throat Headache",
    },

    {
      value: "Shortness of Breath, Chest Pain, Difficulty Breathing",
      label: "Shortness of Breath, Chest Pain, Difficulty Breathing",
    },
  ];

  const predictDisease = async () => {
    try {
      await axios
        .post("http://localhost:5000/predict", { symptoms })
        .then((res) => {
          setPrediction(res.data.disease);
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            setPrediction("No Symptoms Provided");
          }
          if (error.response && error.response.status === 500) {
            setPrediction("Error executing Python script");
          }
        });
    } catch (error) {
      console.error("Error predicting disease:", error);
      setPrediction("Error predicting disease. Please try again.");
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "885px",
      padding: "10px", // Adds padding to the input area
      border: "2px solid #987ae3", // Custom border
      boxShadow: "none", // Remove the default shadow on focus
      "&:hover": {
        border: "2px solid #987ae3", // Border on hover
      },
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "6px", // Adds padding to the dropdown indicator
    }),
    menu: (provided) => ({
      ...provided,
      width: "885px",
      marginTop: "10px", // Adjusts the menu position
      borderRadius: "0", // Custom border-radius
    }),
    option: (provided, state) => ({
      ...provided,
      padding: "12px", // Adds padding to the options
      backgroundColor: state.isSelected
        ? "#987ae3"
        : state.isFocused
        ? "white"
        : "white", // Custom background on selection and focus
      color: state.isSelected ? "white" : "black", // Text color for selected option
      "&:hover": {
        backgroundColor: "#d2c2fa", // Background color on hover
      },
    }),
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

        <div className={Style.predictorMainDiv}>
          {/* <h1>Disease Predictor</h1>
          <input type="text" value={symptoms} onChange={(e)=>setSymptoms(e.target.value)} placeholder='Enter Symptoms' className={Style.predictorInput}/>
          <button className={Style.predictDisease} onClick={predictDisease}>Predict Disease</button>
          {prediction && <p className={Style.predictionPara}>Predicted Disease:{prediction}</p>} */}

          <div className={Style.predictorMainDiv1}>
            <h1 className={Style.predictionHeading}>
              Smart Disease Prediction
            </h1>
            <p className={Style.medilinkPara}>
              MediLink introduces a Disease Prediction feature powered by our
              custom-built machine learning model. By analyzing a minimum of
              three symptoms, our model accurately predicts potential diseases,
              helping patients and doctors make informed decisions.
            </p>
            <div className={Style.predictionSteps}>
              <div className={Style.predictionSteps1}>
                <div className={Style.predictionSteps1Number}>
                  <p>1</p>
                </div>
                <p className={Style.predictionSteps1Para}>
                  Select Your Symptoms
                </p>
              </div>

              <div className={Style.predictionSteps1}>
                <div className={Style.predictionSteps1Number}>
                  <p>2</p>
                </div>
                <p className={Style.predictionSteps1Para}>
                  Predict the Disease
                </p>
              </div>

              <div className={Style.predictionSteps1}>
                <div className={Style.predictionSteps1Number}>
                  <p>3</p>
                </div>
                <p className={Style.predictionSteps1Para}>
                  Receive Detailed Results
                </p>
              </div>
            </div>
          </div>
          <div className={Style.predictorMainDiv2}>
            <div className={Style.predictorMainDiv2Heading}>
              <h1>Select Your Symptoms</h1>
            </div>

            <div className={Style.selectSymptomsOptionDiv}>
              <div className={Style.selectOptionDivNumDrop}>
                <div className={Style.symptomsParaAndInput}>
                  <Select
                    options={symptomOptions1}
                    onChange={(selectedOption) =>
                      setSymptoms(selectedOption.value)
                    }
                    styles={customStyles}
                    placeholder="Symptom"
                  />
                </div>
              </div>
            </div>

            <div className={Style.predictDiseaseBtnDiv}>
            <button className={Style.predictDiseaseBtn} onClick={predictDisease}>
              Predict Disease
            </button>
            </div>
           
            {prediction && (
              <div className={Style.predictionResultDiv}>
                <h1 className={Style.predictedDHeading}>{prediction}</h1>
                <p className={Style.bookAppointmentPara}>Based on the prediction, we advise you to consult a doctor for a thorough evaluation and proper diagnosis. Early consultation can ensure the best possible care. Please consider booking an appointment with your healthcare provider as soon as possible.</p>

                <div className={Style.consultDoctorBtnDiv}>
                  <Link className={Style.consultDoctorBtn} to="/BookAppointmentPage">Consult Doctor</Link>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default DiesesPredictionPage;
