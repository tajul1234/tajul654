import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        // Make sure the URL matches your backend server
        const res = await axios.post('http://localhost:8081/signup', formData);
        if (res.status === 200) {
          navigate('/'); // Redirect to login page upon successful signup
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          alert(error.response.data.error);
        } else {
          alert('An error occurred during signup. Please try again later.');
        }
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-4 rounded w-25">
        <form onSubmit={handleSubmit}>
          <div className="mb-3 position-relative">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className={`form-control rounded-0 ${formErrors.name ? 'is-invalid' : formData.name ? 'is-valid' : ''}`}
              value={formData.name}
              onChange={handleChange}
            />
            {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
          </div>
          <div className="mb-3 position-relative">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-control rounded-0 ${formErrors.email ? 'is-invalid' : formData.email ? 'is-valid' : ''}`}
              value={formData.email}
              onChange={handleChange}
            />
            {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
          </div>
          <div className="mb-3 position-relative">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className={`form-control rounded-0 ${formErrors.password ? 'is-invalid' : formData.password ? 'is-valid' : ''}`}
              value={formData.password}
              onChange={handleChange}
            />
            {formErrors.password && <div className="invalid-feedback">{formErrors.password}</div>}
          </div>
          <button type="submit" className="w-100 btn btn-danger mb-3">Signup</button>
          <NavLink to="/" className="w-100 btn btn-light">Login</NavLink>
        </form>
      </div>
    </div>
  );
}

export default Signup;
