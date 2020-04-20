import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="mydiv">
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Caffeine Link</h1>
            <p className="lead">
              Create a developer profile/portfolio, share posts and get help
              from other developers
            </p>
            <div className="buttons">
              <Link to="/register" style={{ color: "#fff" }}>
                <button className="btn-hover color-2">Sign Up</button>
              </Link>

              <Link to="/login" style={{ color: "#fff" }}>
                <button className="btn-hover color-7">Login</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};
export default connect(mapStateToProps, {})(Landing);
