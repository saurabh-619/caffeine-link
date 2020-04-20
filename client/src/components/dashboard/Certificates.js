import React from "react";
import PropTypes from "prop-types";
import { removeCertificate } from "../../actions/profile";
import { connect } from "react-redux";

const Certificates = ({
  certificates,
  userId,
  removeCertificate,
  reload,
  setReload,
}) => {
  return (
    <div className="certificates">
      <h2 className="my-2" style={{ color: "rgb(76, 207, 118)" }}>
        Certificates
      </h2>
      {certificates.map((certificate, index) => (
        <div className="certificate" key={index}>
          <img
            src={`/api/profile/certificate/${userId}/${certificate._id}`}
            className="certificate-img"
            alt={`Certificate ${index + 1}`}
          />
          <div className="desc">
            {/* <h3
              className="certificate-desc"
              style={{ textAlign: "center", display: "block" }}
            >
              Description
            </h3> */}
            <p>{certificate.description}</p>
          </div>
          <button
            className="btn btn-danger"
            style={{ backgroundColor: "transparent" }}
            onClick={() => {
              removeCertificate(userId, certificate._id);
              setReload(!reload);
            }}
          >
            <i
              className="fas fa-trash deleteIcon"
              style={{ color: "#d11a2a", fontSize: "1.5rem" }}
            ></i>
          </button>
        </div>
      ))}
    </div>
  );
};

Certificates.propTypes = {
  certificates: PropTypes.array.isRequired,
  removeCertificate: PropTypes.func.isRequired,
};

export default connect(null, { removeCertificate })(Certificates);
