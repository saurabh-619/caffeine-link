import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";

const PostItem = ({
  post: { _id, text, name, avatar, user, likes, comments, date },
  auth,
  addLike,
  removeLike,
  deletePost,
  showActions = true,
}) => {
  const isLiked = () => {
    if (auth.user && likes) {
      const likeArray = likes.filter(
        (like) => like.user === auth.user.user._id
      );
      if (likeArray.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  };

  const hasProfile =
    `/api/profile/profilePhoto/${user}` !== undefined
      ? `/api/profile/profilePhoto/${user}`
      : avatar;
  return showActions ? (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`} className="postImage">
          <img
            className="round-img"
            src={hasProfile}
            // src={avatar}
            alt="No Profile"
          />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1" style={{ color: "#eee" }}>
          {text.substring(0, 15)} ...
        </p>
        <p className="post-date">
          Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
        </p>

        {showActions ? (
          <Fragment>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => {
                addLike(_id);
              }}
            >
              <i
                className="fas fa-thumbs-up"
                style={{ color: isLiked() ? "rgb(225, 48, 108)" : "white" }}
              ></i>
              {likes.length > 0 && (
                <span className="comment-count"> {likes.length}</span>
              )}
            </button>
            <button
              type="button"
              className="btn btn-light"
              style={{ color: "white" }}
              onClick={() => {
                removeLike(_id);
              }}
            >
              <i className="fas fa-thumbs-down"></i>
            </button>
            {
              <div style={{ marginBottom: ".5rem" }}>
                <Link to={`/all-likes/${_id}`}>
                  <small> Liked by .....</small>
                </Link>
              </div>
            }
            <Link
              to={`/post/${_id}`}
              className="btn btn-primary"
              style={{ marginBottom: "1rem" }}
            >
              Discussion{" "}
              {comments.length > 0 && (
                <span className="comment-count"> {comments.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user.user._id && (
              <button
                type="button"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                }}
                onClick={() => {
                  deletePost(_id);
                }}
              >
                <i
                  className="fas fa-trash deleteIcon"
                  style={{
                    color: "#d11a2a",
                    fontSize: "1.5rem",
                    cursor: "pointer",
                  }}
                ></i>
              </button>
            )}
          </Fragment>
        ) : (
          ""
        )}
      </div>
    </div>
  ) : (
    <div className="singlepost bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`} className="postImage">
          <img
            className="round-img"
            src={hasProfile}
            // src={avatar}
            alt="No Profile"
          />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <div className="postText">
          <p className="my-1 ">{text} </p>
        </div>
        <p className="post-date">
          Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
        </p>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
