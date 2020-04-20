import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "./types";

// GET all posts
const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.error;
    if (errors && Array.isArray(errors)) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(errors, "danger"));
    }

    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// GET  post
const getPost = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${postId}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.error;
    if (errors && Array.isArray(errors)) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(errors, "danger"));
    }

    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add like
const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data.likes },
    });
  } catch (err) {
    const errors = err.response.data.error;
    if (errors && Array.isArray(errors)) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(errors, "danger"));
    }

    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Remove like
const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data.likes },
    });
  } catch (err) {
    const errors = err.response.data.error;
    if (errors && Array.isArray(errors)) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(errors, "danger"));
    }

    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Delete Post
const deletePost = (postId) => async (dispatch) => {
  if (window.confirm("Are you sure? This can't be undone! ")) {
    try {
      await axios.delete(`/api/posts/${postId}`);
      dispatch({
        type: DELETE_POST,
        payload: postId,
      });
      dispatch(setAlert("Post has been deleted", "success"));
    } catch (err) {
      const errors = err.response.data.error;
      if (errors && Array.isArray(errors)) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      } else {
        dispatch(setAlert(errors, "danger"));
      }

      dispatch({
        type: POST_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  }
};

// Add Post
const addPost = (formdata) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/api/posts", formdata, config);
    dispatch({
      type: ADD_POST,
      payload: res.data.post,
    });
    dispatch(setAlert("Post Created", "success"));
  } catch (err) {
    const errors = err.response.data.error;
    if (errors && Array.isArray(errors)) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(errors, "danger"));
    }

    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add Comment
const addComment = (formdata, postId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formdata,
      config
    );
    dispatch({
      type: ADD_COMMENT,
      payload: res.data.comments,
    });
    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    const errors = err.response.data.error;
    if (errors && Array.isArray(errors)) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(errors, "danger"));
    }

    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add Comment
const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });
    dispatch(setAlert("Comment Deleted", "success"));
  } catch (err) {
    const errors = err.response.data.error;
    if (errors && Array.isArray(errors)) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(errors, "danger"));
    }

    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export {
  getPosts,
  addLike,
  removeLike,
  deletePost,
  addPost,
  getPost,
  addComment,
  deleteComment,
};
