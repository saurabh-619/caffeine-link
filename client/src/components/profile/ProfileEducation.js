import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, current, to, from, description },
}) => {
  return (
    <div>
      <h3 className="text-dark" style={{ color: "rgb(76, 207, 118)" }}>
        {school}
      </h3>
      <p>
        <Moment format="DD/MM/YYYY">{from}</Moment> -
        {!to ? " Now" : <Moment format="DD/MM/YYYY">{` ${to}`}</Moment>}
      </p>
      <p>
        <strong>Degree: </strong>
        {degree}
      </p>
      <p>
        <strong>Field Of Study: </strong>
        {fieldofstudy}
      </p>

      {description !== "" ? (
        <p>
          <strong>Description: </strong>
          {description}
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
};

export default ProfileEducation;
