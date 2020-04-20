import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    skills,
    company,
    status,
    location,
  },
}) => {
  return (
    <div className="profile bg-light">
      <img
        className="round-img"
        src={`/api/profile/profilePhoto/${_id}`}
        alt="No profile photo"
      />
      <div>
        <h2>{name}</h2>
        <div>
          <p style={{ color: "#ddd" }}>
            {status}
            {company && <span> at {company}</span>}
          </p>
          <p className="my-1" style={{ color: "#ddd" }}>
            {location && <span>{location}</span>}
          </p>
        </div>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View Profile{" "}
        </Link>
      </div>
      <ul>
        {skills.slice(0, 5).map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check"></i> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
