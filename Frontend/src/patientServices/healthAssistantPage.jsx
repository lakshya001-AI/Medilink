import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Style from "../App.module.css";
import axios from "axios";

function HealthAssistantPage() {
  const [userMessage, setUserMessage] = useState("");
  const [assistantResponse, setAssistantResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/health-assistant",
        { userMessage }
      );
      setAssistantResponse(response.data.assistantResponse);
    } catch (error) {
      console.error("Error sending message:", error);
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

        {/* ----------------------- Here we are going to have the ai health assistant feature ------------------------  */}

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
