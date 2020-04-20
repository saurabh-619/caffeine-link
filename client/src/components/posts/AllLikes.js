import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPost } from "../../actions/post";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";

const AllLikes = ({ match: { params }, getPost, auth, post }) => {
  useEffect(() => {
    getPost(params.postId);
  }, [getPost, params.postId]);

  return post && post.post && post.post.likes.length === 0 ? (
    <div>
      <button className="btn btn-dark">
        <Link to="/posts" style={{ color: "#fff" }}>
          Back to Posts
        </Link>
      </button>
      <h4 className="my-2">
        No likes to this post. Be the first person to like...
      </h4>
    </div>
  ) : post.post === null ? (
    <Spinner />
  ) : (
    <div>
      <button className="btn btn-dark">
        <Link to="/posts" style={{ color: "#fff" }}>
          Back to Posts
        </Link>
      </button>
      <h3 style={{ color: "rgb(76, 207, 118)" }} className="likesTitle">
        <i className="fas fa-thumbs-up " style={{ marginRight: ".7rem" }}></i>{" "}
        All Likes
      </h3>
      <div className="likes my-3">
        {post &&
          post.post &&
          post.post.likes.map((like, index) => {
            return (
              <div key={index} className="like">
                <img
                  src={`/api/profile/profilePhoto/${like.user}`}
                  alt="No Proile-Photo"
                  style={{
                    borderRadius: "50%",
                  }}
                />{" "}
                <h5 className="lead" style={{ color: "rgb(225, 48, 108)" }}>
                  {like.name}{" "}
                  <h6 style={{ color: "#5851db" }}>
                    liked comment at{" "}
                    {<Moment format="HH:mm">{like.date}</Moment>}{" "}
                    <span style={{ marginLeft: " 0rem" }}></span>
                    {" on "}
                    {<Moment format="DD/MM/YYYY">{like.date}</Moment>}
                  </h6>
                </h5>
              </div>
            );
          })}
      </div>
    </div>
  );
};

AllLikes.propTypes = {
  getPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    post: state.post,
  };
};
export default connect(mapStateToProps, { getPost })(AllLikes);
