import React, { useState } from 'react';
import './Main.css'; // Import the correct CSS file for styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const Main = () => {
  const [showLoginOptions, setShowLoginOptions] = useState(false); // State to control visibility of login options
  const navigate = useNavigate(); // Initialize useNavigate for programmatic navigation

  const handleLoginClick = () => {
    setShowLoginOptions(!showLoginOptions); // Toggle visibility of login options
  };

  const handleClientForm = () => {
    navigate('/client-login'); // Navigate to client login form
  };
  const handleClientForm2 = () => {
    navigate('/worker-login'); // Navigate to client login form
  };
  const handleClientForm1 = () => {
    navigate('/csp'); // Navigate to worker login form

  };
  const handleClientForm3 = () => {
    navigate('/chat'); 

  };

  return (
    <div>
      <div className="header1">
        <h1><b>Freelancer Booking</b></h1>
      </div>

      <div className="button-container">
        <button onClick={() => window.location.hash = '#home'}>Home</button>
        <button onClick={handleClientForm3}>Bot</button>
        <button onClick={handleClientForm1}>Customer Support</button>
        <button onClick={handleLoginClick}>Login</button>
      </div>

      {showLoginOptions && ( // Conditional rendering of login options
        <div className="login-popup">
          <button onClick={handleClientForm}>User Login</button>
          <button onClick={handleClientForm2}>Worker Login</button>
        </div>
      )}

      <div className="content">
        <br></br>
        <h1>JOIN</h1>
        <h1>WITH US</h1> 
        <h1>TO</h1>
        <h1>CONNECT WITH </h1>
        <h1>THE EXPERTS</h1>
        <h1>OF</h1>
        <h1>EACH FIELD</h1>
        <p>The Right Decission is not far from your rech</p>
      </div>
    </div>
  );
}


export default Main;
