import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Style from "../App.module.css";
import axios from "axios";

function DiesesPredictionPage() {

  const [symptoms, setSymptoms] = useState("");
  const [prediction, setPrediction] = useState("");

  const predictDisease = async () =>{
    try {

      await axios.post("http://localhost:5000/predict",{symptoms})
      .then((res)=>{
         setPrediction(res.data.disease);
      }).catch((error)=>{
        if(error.response && error.response.status === 400){
          setPrediction("No Symptoms Provided");
        }
        if(error.response && error.response.status === 500){
          setPrediction("Error executing Python script");
        }
      });
      
    } catch (error) {
      console.error('Error predicting disease:', error);
      setPrediction('Error predicting disease. Please try again.');
    }
  }

  return <>
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

        <div className={Style.predictorDiv}>
          <h1>Disease Predictor</h1>
          <input type="text" value={symptoms} onChange={(e)=>setSymptoms(e.target.value)} placeholder='Enter Symptoms' className={Style.predictorInput}/>
          <button className={Style.predictDisease} onClick={predictDisease}>Predict Disease</button>
          {prediction && <p className={Style.predictionPara}>Predicted Disease: {prediction}</p>}
        </div>
  </div>
  </>
}

export default DiesesPredictionPage;