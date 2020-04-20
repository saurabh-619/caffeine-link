import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExperience = ({
  experience: { current, title, company, to, from, location, description },
}) => {
  return (
    <div>
      <h3 className="text-dark" style={{ color: "rgb(76, 207, 118)" }}>
        {company}
      </h3>
      <p>
        <Moment format="DD/MM/YYYY">{from}</Moment> -
        {!to ? " Now" : <Moment format="DD/MM/YYYY">{` ${to}`}</Moment>}
      </p>
      <p>
        <strong>Position: </strong>
        {title}
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

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
