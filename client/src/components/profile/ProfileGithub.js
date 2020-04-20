import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGithubrepos } from "../../actions/profile";
import Spinner from "../layout/Spinner";

const ProfileGithub = ({ username, getGithubrepos, repos }) => {
  useEffect(() => {
    getGithubrepos(username);
  }, [getGithubrepos, username]);

  return (
    <div className="profile-github">
      {repos.length > 0 ? (
        <h2 className="text-primary my-1">Github Repos</h2>
      ) : (
        ""
      )}
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map((repo, index) => (
          <div key={index} className="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
              </h4>
              <div className="git-desc">
                <p>{repo.description}</p>
              </div>
            </div>
            <div>
              <ul className="githubBadges">
                <li>
                  <button className="btn-hover color-1">
                    <i className="fas fa-star"></i> Stars:{" "}
                    {repo.stargazers_count}
                  </button>
                </li>
                <li>
                  <button className="btn-hover color-2">
                    <i className="fas fa-eye"></i> Watchers:{" "}
                    {repo.watchers_count}
                  </button>
                </li>
                <li>
                  <button className="btn-hover color-3">
                    <i className="fas fa-code-branch"></i> Forks:{" "}
                    {repo.forks_count}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

ProfileGithub.propTypes = {
  getGithubrepos: PropTypes.func.isRequired,
  repos: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    repos: state.profile.repos,
  };
};
export default connect(mapStateToProps, { getGithubrepos })(ProfileGithub);
