import React from "react";
import { Link } from "react-router-dom";

const DashboardAction = () => {
  return (
    <div>
      <div className="dash-buttons">
        <Link to="/edit-profile" className="btn btn-light">
          <i className="fas fa-user-circle text-primary"></i> Edit Profile
        </Link>
        <Link to="/add-experience" className="btn btn-light">
          <i className="fab fa-black-tie text-primary"></i> Add Experience
        </Link>
        <Link to="/add-education" className="btn btn-light">
          <i className="fas fa-graduation-cap text-primary"></i> Add Education
        </Link>
        <Link to="/update/photo" className="btn btn-light">
          <i className="fas fa-id-badge text-primary"></i> Update Profile Photo
        </Link>
        <Link to="/add/certificate" className="btn btn-light">
          <i className="fas fa-award text-primary"></i> Add Certificates
        </Link>
      </div>
    </div>
  );
};

export default DashboardAction;
