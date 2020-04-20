import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { loadProfile, deleteAccount } from "./../../actions/profile";
import { connect } from "react-redux";
import Spinner from "./../layout/Spinner";
import { Link } from "react-router-dom";
import DashboardAction from "./DashboardAction";
import Education from "./Education";
import Experience from "./Experience";
import Certificates from "./Certificates";

const Dashboard = ({
  loadProfile,
  deleteAccount,
  profile: { profile, loading },
  auth: { user },
}) => {
  const [reload, setReload] = useState(false);

  useEffect(() => {
    loadProfile();
  }, [loadProfile, reload]);

  return loading && profile === null && user === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary" style={{ marginBottom: "1rem" }}>
        Dashboard
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.user.name}
      </p>

      {profile !== null ? (
        <Fragment>
          <DashboardAction />
          {profile && profile.experience && profile.experience.length > 0 ? (
            <Experience experience={profile && profile.experience} />
          ) : (
            ""
          )}
          {profile && profile.education && profile.education.length > 0 ? (
            <Education education={profile && profile.education} />
          ) : (
            ""
          )}
          {profile &&
          profile.certificates &&
          profile.certificates.length > 0 ? (
            <Certificates
              certificates={profile.certificates}
              userId={user.user._id}
              reload={reload}
              setReload={setReload}
            />
          ) : (
            ""
          )}

          <div className="my-2 ml-0">
            <button
              className="btn-hover color-11"
              style={{ width: "250px" }}
              onClick={() => {
                deleteAccount();
              }}
            >
              <i className="fas fa-trash" style={{ marginRight: "1rem" }}></i>
              {"  "}
              Delete my Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You haven't setup a Profile</p>
          <Link to="/create-profile" className="btn btn-primary  my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  loadProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  // loadUser: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    auth: state.auth,
  };
};
export default connect(mapStateToProps, {
  loadProfile,
  deleteAccount,
})(Dashboard);
