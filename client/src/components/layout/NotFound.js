import React from "react";
import notfound from "../../img/404.gif";
import { Link } from "react-router-dom";
const NotFound = (props) => {
  return (
    <div className="notfound">
      <img src={notfound} alt="" />
      <h6 className="large">You've kind of lost the way</h6>
      <div className="notfoundButtons">
        <Link to="/dashboard">
          <button class="btn-hover color-1">Dashboard</button>
        </Link>
        <Link to="/login">
          <button class="btn-hover color-3">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
