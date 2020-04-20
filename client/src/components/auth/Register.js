import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "./../../actions/alert";
import PropTypes from "prop-types";
import { register } from "./../../actions/auth";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Password dont match", "danger");
    } else {
      register({ name, email, password });
    }
    setFormData({ name: "", email: "", password: "", password2: "" });
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard"></Redirect>;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" action="create-profile.html">
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a real
            email
          </small>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={handleChange}
            minLength="6"
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary"
          value="Register"
          onClick={handleClick}
        />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propType = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};
export default connect(mapStateToProps, { setAlert, register })(Register);
