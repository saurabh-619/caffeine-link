import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({
  logout,
  auth: { isAuthenticated, loading, user },
  history,
}) => {
  const currentTab = (history, path) => {
    if (history.location.pathname === path)
      return {
        color: "rgb(225, 48, 108)",
      };
    else return { color: "#fff" };
  };
  const authLinks = (
    <ul>
      <li>
        <Link style={currentTab(history, "/profiles")} to="/profiles">
          Developers
        </Link>
      </li>
      <li>
        <Link style={currentTab(history, "/posts")} to="/posts">
          Posts
        </Link>
      </li>
      <li>
        <Link style={currentTab(history, "/about")} to="/about">
          About
        </Link>
      </li>
      <li>
        <Link style={currentTab(history, "/dashboard")} to="/dashboard">
          <i className="fas fa-user"></i>
          <span className="hide-sm"> Dashboard</span>
        </Link>
      </li>
      <li>
        <Link onClick={logout} to="/">
          <i className="fas fa-sign-out-alt" />
          {"  "} <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link style={currentTab(history, "/profiles")} to="/profiles">
          Developers
        </Link>
      </li>
      <li>
        <Link style={currentTab(history, "/about")} to="/about">
          About
        </Link>
      </li>
      <li>
        <Link style={currentTab(history, "/register")} to="/register">
          Register
        </Link>
      </li>
      <li>
        <Link style={currentTab(history, "/login")} to="/login">
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-coffee"></i> CaffeineLink
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps, { logout })(withRouter(Navbar));
