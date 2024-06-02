// Success.js
import React from 'react';
import Appq from './Appq';

function Success() {
  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem('token');
    // Redirect the user to the login page
    window.location.href = '/'; // You can also use history.push('/login') if you're using useHistory hook
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">Login Successful</h1>
          <p className="card-text">Welcome to the success page!</p>
          <Appq />
          <button onClick={handleLogout} className="btn btn-danger mt-3">Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Success;
