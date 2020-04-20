import React from "react";

const ProfileCert = ({ userId, certificate }) => {
  return (
    <div className="cert">
      <img
        src={`/api/profile/certificate/${userId}/${certificate._id}`}
        className="cert-img"
        alt={`Certificate `}
      />
      <div className="cert-desc">
        <h2 style={{ color: "rgb(76, 207, 118)", textAlign: "center" }}>
          Description
        </h2>
        <p className="cert-desc">{certificate.description}</p>
      </div>
    </div>
  );
};

ProfileCert.propTypes = {};

export default ProfileCert;
