import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import './FreelancerRegistrationForm.css';
import axios from 'axios';

const API_URL = 'http://localhost:5001/api/auth';

const registerUser = async (userData) => {
  const formData = new FormData();
  Object.keys(userData).forEach(key => {
    if (Array.isArray(userData[key])) {
      formData.append(key, JSON.stringify(userData[key]));
    } else {
      formData.append(key, userData[key]);
    }
  });

  try {
    const response = await axios.post(`${API_URL}/register`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "An error occurred during registration";
  }
};

const FreelancerRegistrationForm = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    location: '',
    skills: [],
    experienceYears: '',
    hourlyRate: '',
    resumeFile: null,
    availableDays: [],
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [fileName, setFileName] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const laborSkills = [
    "Carpentry", "Plumbing", "Electrical Work", "Painting", "Landscaping",
    "Moving and Lifting", "Cleaning", "General Maintenance", "Roofing", "Masonry",
    "Drywall Installation", "Flooring Installation", "Tile Setting", "Fence Installation",
    "Pressure Washing"
  ];

  const daysOfWeek = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prevData => ({ ...prevData, resumeFile: file }));
      setFileName(file.name);
    }
  };

  const handleMultiSelectChange = (name, value) => {
    if (!value) return;
    setFormData(prevData => ({
      ...prevData,
      [name]: prevData[name].includes(value)
        ? prevData[name].filter(item => item !== value)
        : [...prevData[name], value]
    }));
  };

  const handleRemoveItem = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: prevData[name].filter(item => item !== value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { fullName, email, password, phone, location, skills, experienceYears, hourlyRate } = formData;
    if (!fullName || !email || !password || !phone || !location || skills.length === 0 || !experienceYears || !hourlyRate) {
      alert('Please fill in all required fields and select at least one skill');
      return;
    }

    try {
      const response = await registerUser(formData);
      console.log('Registration successful:', response);
      setFormSubmitted(true);
      setErrorMessage(null);
    } catch (error) {
      console.error('Registration failed:', error);
      setErrorMessage(error);
      setFormSubmitted(false);
    }
  };

  const handleClientForm2 = () => {
    navigate('/worker1-login');
  };

  return (
    <div className="registration-container">
      <div className="header">
        <h1>Daily Labor Registration</h1>
        <button onClick={handleClientForm2} className="login-button">
          Already have an account? Login
        </button>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="registration-form">
          <FormField label="Full Name" name="fullName" type="text" value={formData.fullName} onChange={handleInputChange} />
          <FormField label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
          <FormField label="Password" name="password" type="password" value={formData.password} onChange={handleInputChange} />
          <FormField label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} />
          <FormField label="Location" name="location" type="text" value={formData.location} onChange={handleInputChange} />

          {/* Skills Field */}
          <div className="form-group">
            <label>Skills</label>
            <div className="tags-container">
              {formData.skills.map(skill => (
                <span key={skill} className="tag skill-tag">
                  {skill}
                  <button 
                    type="button" 
                    onClick={() => handleRemoveItem('skills', skill)} 
                    className="remove-tag"
                  >
                    <AiOutlineClose size={14} />
                  </button>
                </span>
              ))}
            </div>
            <select
              onChange={(e) => handleMultiSelectChange('skills', e.target.value)}
              className="select-input"
              value=""
            >
              <option value="">Select a skill</option>
              {laborSkills.filter(skill => !formData.skills.includes(skill)).map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>

          {/* Available Days Field */}
          <div className="form-group">
            <label>Available Days</label>
            <div className="tags-container">
              {formData.availableDays.map(day => (
                <span key={day} className="tag day-tag">
                  {day}
                  <button 
                    type="button" 
                    onClick={() => handleRemoveItem('availableDays', day)} 
                    className="remove-tag"
                  >
                    <AiOutlineClose size={14} />
                  </button>
                </span>
              ))}
            </div>
            <select
              onChange={(e) => handleMultiSelectChange('availableDays', e.target.value)}
              className="select-input"
              value=""
            >
              <option value="">Select a day</option>
              {daysOfWeek.filter(day => !formData.availableDays.includes(day)).map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>

          <FormField label="Years of Experience" name="experienceYears" type="number" value={formData.experienceYears} onChange={handleInputChange} min="0" />
          <FormField label="Hourly Rate ($)" name="hourlyRate" type="number" value={formData.hourlyRate} onChange={handleInputChange} min="0" step="0.01" />

          <div className="form-group">
            <label>Resume/Bio File</label>
            <div className="file-upload-container">
              <input type="file" id="resumeFile" onChange={handleFileChange} className="file-input" accept=".pdf,.doc,.docx,.txt" />
              <label htmlFor="resumeFile" className="file-upload-label">
                {fileName || 'Choose a file'}
              </label>
              {fileName && <p className="file-name">{fileName}</p>}
            </div>
          </div>

          <div className="form-group">
            <button type="submit" className="submit-button">Register</button>
            {formSubmitted && <p className="success-message">Form submitted successfully!</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

const FormField = ({ label, name, type, value, onChange, min, step }) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required
      className="form-input"
      min={min}
      step={step}
    />
  </div>
);

export default FreelancerRegistrationForm;
