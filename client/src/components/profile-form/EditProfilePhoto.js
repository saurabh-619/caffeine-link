import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateProfilePhoto } from "../../actions/profile";

const EditProfilePhoto = ({ updateProfilePhoto }) => {
  const [values, setValues] = useState({
    photo: "",
    formData: new FormData(),
  });
  const { formData } = values;
  const handleChange = (e) => {
    formData.set("profilePhoto", e.target.files[0]);
    console.log(formData);
  };
  const handleClick = (e) => {
    e.preventDefault();
    updateProfilePhoto(formData);
  };
  return (
    <div>
      <h1 className="large text-primary">Change your Profile picture</h1>
      <div className="form">
        <div className="form-group">
          <input
            onChange={handleChange}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </div>
        <small style={{ display: "block", marginBottom: "1rem" }}>
          * we store your photo in Array Buffer (ensured privacy ){" "}
        </small>
        <button
          type="submit"
          onClick={handleClick}
          className="btn btn-outline-success mb-3"
        >
          Update Profile Photo
        </button>
      </div>
    </div>
  );
};

EditProfilePhoto.propTypes = { updateProfilePhoto: PropTypes.func.isRequired };

export default connect(null, { updateProfilePhoto })(EditProfilePhoto);
