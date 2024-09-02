import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Style from "../App.module.css";
import axios from "axios";
import { SimpleSelect } from "react-selectize";
import "react-selectize/themes/index.css";
import Select from 'react-select';

function DiesesPredictionPage() {
  const [symptoms, setSymptoms] = useState("");
  const [prediction, setPrediction] = useState("");

  const options = [
    { value: 'symptom1', label: 'Symptom 1' },
    { value: 'symptom2', label: 'Symptom 2' },
    { value: 'symptom3', label: 'Symptom 3' }
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
      width:"285px",
      padding: '10px', // Adds padding to the input area
      border: '2px solid #987ae3', // Custom border
      boxShadow: 'none', // Remove the default shadow on focus
      '&:hover': {
        border: '2px solid #987ae3', // Border on hover
      },
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: '6px', // Adds padding to the dropdown indicator
    }),
    menu: (provided) => ({
      ...provided,
      width:"285px",
      marginTop: '10px', // Adjusts the menu position
      borderRadius: '0', // Custom border-radius
    }),
    option: (provided, state) => ({
      ...provided,
      padding: '12px', // Adds padding to the options
      backgroundColor: state.isSelected ? '#987ae3' : state.isFocused ? 'white' : 'white', // Custom background on selection and focus
      color: state.isSelected ? 'white' : 'black', // Text color for selected option
      '&:hover': {
        backgroundColor: '#d2c2fa', // Background color on hover
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
                <div className={Style.symptomsNumberParaDiv}>
                  <p>1</p>
                </div>
                <div className={Style.symptomsParaAndInput}>
                  <Select options={options} onChange={(selectedOption) => console.log(selectedOption.value)} styles={customStyles} placeholder="Select First Symptom"/>

                </div>

              </div>

              <div className={Style.selectOptionDivNumDrop1}>
                <div className={Style.symptomsNumberParaDiv}>
                  <p>2</p>
                </div>
                <div className={Style.symptomsParaAndInput}>
                  <Select options={options} onChange={(selectedOption) => console.log(selectedOption.value)} styles={customStyles} placeholder="Select Second Symptom"/>

                </div>

              </div>

              <div className={Style.selectOptionDivNumDrop1}>
                <div className={Style.symptomsNumberParaDiv}>
                  <p>3</p>
                </div>
                <div className={Style.symptomsParaAndInput}>
                  <Select options={options} onChange={(selectedOption) => console.log(selectedOption.value)} styles={customStyles} placeholder="Select Third Symptom"/>

                </div>

              </div>

            </div>

            
          </div>
        </div>
      </div>
    </>
  );
}

export default DiesesPredictionPage;
