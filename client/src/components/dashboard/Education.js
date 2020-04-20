import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profile";

const Education = ({ education, deleteEducation }) => {
  const educationArray = education.map((edu) => {
    return (
      <thead key={edu._id}>
        <tr>
          <td>{edu.school}</td>
          <td className="hide-sm">{edu.degree}</td>
          <td className="hide-sm">
            <Moment format="DD/MM/YYYY">{edu.from}</Moment>-
            {edu.to === null ? (
              "Now"
            ) : (
              <Moment format="DD/MM/YYYY">{edu.to}</Moment>
            )}
          </td>
          <td>
            <button
              className="btn btn-danger"
              style={{ backgroundColor: "transparent" }}
              onClick={() => {
                deleteEducation(edu._id);
              }}
            >
              <i
                className="fas fa-trash deleteIcon"
                style={{ color: "#d11a2a", fontSize: "1.5rem" }}
              ></i>
            </button>
          </td>
        </tr>
      </thead>
    );
  });
  return (
    <Fragment>
      <h2 className="my-2" style={{ color: "rgb(76, 207, 118)" }}>
        Education Credentials
      </h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        {educationArray}
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
