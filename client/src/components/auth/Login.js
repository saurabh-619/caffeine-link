import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { login } from "./../../actions/auth";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  // Redirect if looged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard"></Redirect>;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      <form className="form" action="create-profile.html">
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            minLength="6"
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary"
          value="Sign IN"
          onClick={handleClick}
        />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/register">Register</Link>
      </p>
    </Fragment>
  );
};

// add type of all props
Login.propType = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};
export default connect(mapStateToProps, { login })(Login);
