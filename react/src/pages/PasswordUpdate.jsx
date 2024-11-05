import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PasswordUpdate = () => {
  const { token } = useParams(); // Extract token from the URL
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
// State to store success message
const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    // Password validation: minimum 6 characters
    if (!formData.newPassword || formData.newPassword.length < 6) {
      errors.newPassword = 'Password must be at least 6 characters long';
      isValid = false;
    }

    // Confirm password validation: must match newPassword
    if (formData.newPassword !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form before submission
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword: formData.newPassword
        })
      });

      if (response.ok) {
        alert("Password updated successfully");
        navigate('/login'); // Redirect to login page after successful password update
      } else {
        const data = await response.json();
        alert(data.message || "Password reset failed");
      }
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  return (
    <div className="password-update-container">
      <div className="password-update-box">
        <h2>Reset Your Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              required
              placeholder="Enter new password"
            />
            {errors.newPassword && <span className="error">{errors.newPassword}</span>}
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              placeholder="Confirm new password"
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>
          <button type="submit" className="submit-button">Update Password</button>
        </form>
      </div>
    </div>
  );
};

export default PasswordUpdate;
