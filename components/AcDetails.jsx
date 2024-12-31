import React, { useState, useEffect } from 'react';
import './AcDetails.css';

const AcDetails = () => {
  const [name, setName] = useState('Guest');
  const [email, setEmail] = useState('No email found');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    // Fetch name and email from local storage, with fallback defaults
    const storedName = localStorage.getItem('userName') || 'Guest';
    const storedEmail = localStorage.getItem('email') || 'No email found';
    
    setName(storedName);
    setEmail(storedEmail ||'');
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="ac-details-container">
      <div className="main-content">
        
        <h2 className="sub-title">User Information</h2>
        <div className="info-group">
          <label>Name</label>
          <p>{name}</p>
        </div>
        <div className="info-group">
          <label>Email</label>
          <p>{email}</p>
        </div>
        <div className="input-group">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"  // Ensure amount is numeric
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>
        <button className="print-button" onClick={handlePrint}>
          Print
        </button>
      </div>
    </div>
  );
};

export default AcDetails;
