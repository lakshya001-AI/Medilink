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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a request to Cohere's chat endpoint with the user's message
      const response = await cohere.chat({
        model: "command", // Specify the model to use (e.g., 'command')
        message: userMessage, // Pass the user's message to the AI model
      });

      // Set the response from the AI into the state
      setAssistantResponse(response.text);
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

        <div>
          <form onSubmit={handleSubmit}>
            <textarea
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Describe your health condition..."
            />
            <button type="submit">Send</button>
          </form>
          <div>
            <h3>AI Health Assistant Response:</h3>
            <p>{assistantResponse}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default HealthAssistantPage;
