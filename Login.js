import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Style.css';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email is invalid';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    }
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      axios.post('http://localhost:8081/login', values)
        .then(res => {
          if (res.status === 200) {
            navigate('/success');
          }
        })
        .catch(err => {
          if (err.response && err.response.data.error) {
            setLoginError(err.response.data.error);
          } else {
            setLoginError('Invalid email or password');
          }
        });
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <form onSubmit={handleSubmit}>
          {loginError && <div className="alert alert-danger">{loginError}</div>}
          <div className='mt-3'>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              className={`form-control rounded-0 ${errors.email ? 'is-invalid' : ''}`}
              onChange={handleInput}
              value={values.email}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className='mt-3'>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className={`form-control rounded-0 ${errors.password ? 'is-invalid' : ''}`}
              onChange={handleInput}
              value={values.password}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          <button type="submit" className='w-100 btn btn-danger mt-3'>
            Login
          </button>
          <NavLink to="/signup" className='btn btn-default-border w-100 bg-light mt-3 text-center'>
            Create Account
          </NavLink>
        </form>
      </div>
    </div>
  );
}

export default Login;
