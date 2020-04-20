import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/post";
import { Link } from "react-router-dom";
import Moment from "react-moment";
const CommentItem = ({
  postId,
  author,
  comment: { _id, text, name, avatar, user, date },
  deleteComment,
  auth,
}) => {
  return author.toString() === user ? (
    <div className="post bg-white p-1 my-1" style={{ background: "#444" }}>
      <div>
        <Link to={`/profile/${user}`}>
          <img
            className="round-img"
            src={`/api/profile/profilePhoto/${user}`}
            alt="avatar"
          />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1" style={{ color: "#ddd" }}>
          {text}
        </p>
        <p className="post-date">
          Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
        </p>
        {!auth.loading && user === auth.user.user._id && (
          <button
            onClick={() => {
              deleteComment(postId, _id);
            }}
            className="btn "
            style={{ background: "transparent" }}
          >
            <i
              className="fas fa-trash deleteIcon"
              style={{
                color: "#d11a2a",
                fontSize: "1.5rem",
              }}
            ></i>
          </button>
        )}
      </div>
    </div>
  ) : (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img
            className="round-img"
            src={`/api/profile/profilePhoto/${user}`}
            alt="avatar"
          />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1" style={{ color: "#ddd" }}>
          {text}
        </p>
        <p className="post-date">
          Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
        </p>
        {!auth.loading && user === auth.user.user._id && (
          <button
            onClick={() => {
              deleteComment(postId, _id);
            }}
            className="btn "
          >
            <i
              className="fas fa-trash deleteIcon"
              style={{
                color: "#d11a2a",
                fontSize: "1.5rem",
              }}
            ></i>
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps, { deleteComment })(CommentItem);
