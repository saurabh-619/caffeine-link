import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import Spinner from "./../layout/Spinner";
import { getAllProfiles } from "../../actions/profile";
import { connect } from "react-redux";
import ProfileItem from "./ProfileItem";

const Profiles = ({ loading, profiles, getAllProfiles }) => {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);

  return (
    <Fragment>
      {loading || profiles.length === 0 ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect with
            Developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles registered...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  loading: PropTypes.bool,
  profiles: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    profiles: state.profile.profiles,
  };
};
export default connect(mapStateToProps, { getAllProfiles })(Profiles);
