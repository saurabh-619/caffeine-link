import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPost } from "../../actions/post";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const Post = ({ getPost, match: { params }, post: { post, loading } }) => {
  useEffect(() => {
    getPost(params.postId);
  });
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link
        to="/posts"
        className="btn btn-dark "
        style={{ color: "#fff", textDecoration: "none" }}
      >
        Back to Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      {post.comments.length !== 0 && (
        <h1 style={{ color: "rgb(76, 207, 118)" }}>All Comments</h1>
      )}
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem
            key={comment._id}
            author={post.user}
            comment={comment}
            postId={post._id}
          />
        ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    post: state.post,
  };
};
export default connect(mapStateToProps, { getPost })(Post);
