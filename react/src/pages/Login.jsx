import React, { useState } from 'react';
import './Css/Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  // State to store form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user' // Default role set to 'user'
  });

  // State to store validation errors
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Validate the form data before submitting
  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
      formIsValid = false;
    }

    // Validate password (e.g., min length of 6 characters)
    if (!formData.password || formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
      formIsValid = false;
    }

    setErrors(errors);
    return formIsValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const endpoint = formData.role === 'supplier' ? 'http://localhost:8000/supplier/login' : 'http://localhost:8000/login';

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: formData.email, password: formData.password })
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("token", data.token); // Store token in localStorage
          if (formData.role === 'supplier') {
            navigate('/supplierProfile');
          } else {
            navigate('/userProfile');
          }
        } else {
          console.log('Login failed');
          // Handle failure (e.g., show an error message)
        }
      } catch (error) {
        console.log("Login error", error);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login to Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Enter your password"
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <div className="input-group">
            <label htmlFor="role">Login as:</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
            >
              <option value="user">User</option>
              <option value="supplier">Supplier</option>
            </select>
          </div>
          <div className="forgot-password">
            <Link to="/ForgetPassword" className='login-link'>Forgot Password?</Link>
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
