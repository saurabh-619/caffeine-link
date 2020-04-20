import axios from "axios";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOG_OUT,
  CLEAR_PROFILE,
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "./../utils/setAuthToken";

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
    console.log("User setted");
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/users", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    // Set token to ls
    localStorage.setItem("token", res.data);
    // Set token to Auth header
    setAuthToken(res.data);
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.error;
    console.log(err.response.data);

    if (errors && Array.isArray(errors)) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(errors, "danger"));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    // Set token to ls
    localStorage.setItem("token", res.data);
    // Set token to Auth header
    setAuthToken(res.data);
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.error;

    if (errors && Array.isArray(errors)) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(errors, "danger"));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// LOG Out User
export const logout = () => async (dispatch) => {
  // Remove auth header for future requests
  setAuthToken(false);
  dispatch({
    type: CLEAR_PROFILE,
  });
  dispatch({
    type: LOG_OUT,
  });
};
