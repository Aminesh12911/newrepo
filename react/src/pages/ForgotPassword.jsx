import './Css/ForgotPassword.css';
import React, { useState } from 'react';

const ForgotPassword = () => {

  // State to store form data
  const [formData, setFormData] = useState({
    email: ''
  });

  // State to store the error message
  const [errorMessage, setErrorMessage] = useState('');

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous errors

    try {
      const response = await fetch('http://localhost:8000/forgot-password', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('OTP sent successfully');
        // Optionally display a success message here
      } else {
        const data = await response.json(); // Parse the JSON response
        if (data.message) {
          setErrorMessage(data.message); // Show error message from the backend
        } else {
          setErrorMessage('Failed to send OTP');
        }
      }
    } catch (error) {
      console.log("Error in sending OTP", error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>Forgot Password</h2>
        
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Enter your email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <button type="submit" className="submit-button">Send OTP</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
