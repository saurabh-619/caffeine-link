import React, { useState } from "react";
import PropTypes from "prop-types";
import { addExperience } from "../../actions/profile";
import { connect } from "react-redux";
import { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    from: new Date(),
    to: "",
    current: false,
    description: "",
  });
  const [disableToDate, toggleToDate] = useState(false);
  const { title, company, location, from, to, current, description } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    addExperience(formData, history);
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <div className="form">
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            value={title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            value={company}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={handleChange} />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              value={current}
              onChange={() => {
                setFormData((prev) => ({ ...prev, current: !current }));
                toggleToDate(!disableToDate);
              }}
            />{" "}
            Current Job
          </p>
        </div>

        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            disabled={disableToDate ? "disabled" : ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <textarea
            cols="30"
            rows="5"
            placeholder="Job Description"
            name="description"
            value={description}
            onChange={handleChange}
          ></textarea>
        </div>
        <input
          type="submit"
          className="btn btn-primary my-1"
          onClick={handleClick}
        />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </div>
    </Fragment>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(withRouter(AddExperience));
