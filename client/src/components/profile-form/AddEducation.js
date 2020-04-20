import React, { useState } from "react";
import PropTypes from "prop-types";
import { addEducation } from "../../actions/profile";
import { connect } from "react-redux";
import { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

const AddEducation = ({ history, addEducation }) => {
  const [formData, setFormData] = useState({
    degree: "",
    school: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const [disableToDate, toggleToDate] = useState(false);
  const {
    degree,
    school,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = formData;

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
    addEducation(formData, history);
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Add your Education</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any School/College/Bootcamps
        you've attended
      </p>
      <small>* = required field</small>
      <div className="form">
        <div className="form-group">
          <input
            type="text"
            placeholder="* School/College/Bootcamp"
            name="school"
            value={school}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree"
            name="degree"
            value={degree}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Field Of Study"
            name="fieldofstudy"
            value={fieldofstudy}
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
            Current Education
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
            placeholder="Education Description"
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(withRouter(AddEducation));
