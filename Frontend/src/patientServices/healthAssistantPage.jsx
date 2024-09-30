import React, { useState } from "react";
import { Link } from "react-router-dom";
import Style from "../App.module.css";
import { CohereClient } from "cohere-ai"; // Import CohereClient

// Initialize CohereClient with your API key
const cohere = new CohereClient({
  token: "BBK74cEhpbUdIj0gyOiSIEeg6F0L9ISHe6Bfo9HF", // Replace with your Cohere API key
});

function HealthAssistantPage() {
  const [userMessage, setUserMessage] = useState("");
  const [assistantResponse, setAssistantResponse] = useState("");
  const [bookAppointmentText, setBookAppointmentText] = useState("");
  const [consultDoctorText, setConsultDoctorText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a request to Cohere's chat endpoint with the user's message
      const response = await cohere.chat({
        model: "command", // Specify the model to use (e.g., 'command')
        message: userMessage, // Pass the user's message to the AI model
      });

      // Simulate typing effect for AI response
      const responseText = response.text;
      let index = 0;
      setAssistantResponse(""); // Clear previous response

      const typingInterval = setInterval(() => {
        if (index < responseText.length) {
          setAssistantResponse((prev) => prev + responseText[index]);
          index++;
        } else {
          clearInterval(typingInterval); // Stop the interval when done
          // Set text for bookAppointmentPara and consultDoctorBtnDiv
          setTimeout(() => {
            setBookAppointmentText(
              "Based on the prediction, we advise you to consult a doctor for a thorough evaluation and proper diagnosis. Early consultation can ensure the best possible care. Please consider booking an appointment with your healthcare provider as soon as possible."
            );
            setConsultDoctorText("Consult Doctor");
          }, 500); // Delay before showing additional text
        }
      }, 50); // Adjust the typing speed here (in milliseconds)
    } catch (error) {
      console.error("Error getting AI response:", error);
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
            <Link className={Style.navBarElement1} to="/patientPage">
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

        {/* ----------------------- Here we are going to have the AI health assistant feature ------------------------  */}

        <div className={Style.predictorMainDiv}>
          <div className={Style.predictorMainDiv1}>
            <h1 className={Style.predictionHeading}>AI Health Assistant</h1>
            <p className={Style.medilinkPara}>
              Explore Medilink's AI Health Assistant, powered by Cohere. Simply
              describe your health condition and symptoms, and receive tailored advice to help manage
              your health. Get personalized guidance with our advanced AI
              today!.
            </p>
            <div className={Style.predictionSteps}>
              <div className={Style.predictionSteps1}>
                <div className={Style.predictionSteps1Number}>
                  <p>1</p>
                </div>
                <p className={Style.predictionSteps1Para}>
                  Describe health condition
                </p>
              </div>

              <div className={Style.predictionSteps1}>
                <div className={Style.predictionSteps1Number}>
                  <p>2</p>
                </div>
                <p className={Style.predictionSteps1Para}>
                 Ask AI Assistant
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

            <div className={Style.selectSymptomsOptionDiv}>
              <div className={Style.selectOptionDivNumDrop}>
                <div className={Style.symptomsParaAndInput}>
                  <form
                    onSubmit={handleSubmit}
                    className={Style.healthConditionForm}
                  >
                    <textarea
                      value={userMessage}
                      onChange={(e) => setUserMessage(e.target.value)}
                      placeholder="Describe your health condition..."
                      className={Style.healthConditionTextArea}
                    />
                    <button
                      type="submit"
                      className={Style.getHealthAssistantBtn}
                    >
                      Ask AI Assistant
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {assistantResponse && (
              <div className={Style.predictionResultDiv}>
                <h1 className={Style.assistantResultHeading}>
                  {assistantResponse}
                </h1>
                {bookAppointmentText && (
                  <p className={Style.bookAppointmentPara}>
                    {bookAppointmentText}
                  </p>
                )}
                <div className={Style.consultDoctorBtnDiv}>
                  {consultDoctorText && (
                    <Link className={Style.consultDoctorBtn} to="/BookAppointmentPage">
                      {consultDoctorText}
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default HealthAssistantPage;
