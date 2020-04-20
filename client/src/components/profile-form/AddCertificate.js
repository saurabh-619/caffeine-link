import React, { useState } from "react";
import PropTypes from "prop-types";
import { addCertificate } from "../../actions/profile";
import { connect } from "react-redux";

const AddCertificate = ({ addCertificate }) => {
  const [values, setValues] = useState({
    photo: "",
    description: "",
    formData: new FormData(),
  });
  const { photo, description, formData } = values;
  const handleChange = (e) => {
    const value =
      e.target.name === "photo" ? e.target.files[0] : e.target.value;
    setValues({
      ...values,
      [e.target.name]: value,
    });
    formData.set("photo", photo);
    formData.set("description", description);
  };
  const handleClick = (e) => {
    e.preventDefault();
    console.log(formData);
    addCertificate(formData);
    setValues({
      photo: "",
      description: "",
      formData: new FormData(),
    });
  };
  return (
    <div>
      <h1 className="large text-primary">Add a certificate</h1>
      <div className="form">
        <div className="form-group">
          <input
            onChange={handleChange}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
            className="certificate-input"
          />
          <small>* only .jpg/.jpeg/.png files</small>
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="* How was your experience..."
            value={description}
            onChange={handleChange}
            required
            className="certificate-desc"
          ></textarea>
        </div>
        <small style={{ display: "block" }}>
          * we store your photo in Array Buffer (ensured privacy ){" "}
        </small>
        <button
          type="submit"
          onClick={handleClick}
          className="btn btn-outline-success mb-3"
        >
          Add Certificate
        </button>
      </div>
    </div>
  );
};

AddCertificate.propTypes = {
  addCertificate: PropTypes.func.isRequired,
};

export default connect(null, { addCertificate })(AddCertificate);
