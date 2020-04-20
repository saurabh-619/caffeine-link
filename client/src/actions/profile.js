import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  REMOVED_CERTIFICATE,
} from "./types";

// Get LoggedIn Users Profile
const loadProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: GET_PROFILE,
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
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Get all profiles
const getAllProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get("/api/profile/");
    dispatch({
      type: GET_PROFILES,
      payload: res.data.profiles,
    });
  } catch (err) {
    const errors = err.response.data.error;
    if (errors && Array.isArray(errors)) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(errors, "danger"));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Get a profile by ID
const getProfileById = (userId) => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data.profile,
    });
  } catch (err) {
    const errors = err.response.data.error;
    if (errors && Array.isArray(errors)) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(errors, "danger"));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Get a Github repos
const getGithubrepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);
    dispatch({
      type: GET_REPOS,
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
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Update a Profile photo
const updateProfilePhoto = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const res = await axios.put(
      `/api/profile/profilePhoto/upload`,
      formData,
      config
    );
    dispatch({
      type: UPDATE_PROFILE,
    });
    dispatch(setAlert("Profile Photo Updated", "success"));
    console.log(res.data);
  } catch (err) {
    const errors = err.response.data.error;
    if (errors && Array.isArray(errors)) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(errors, "danger"));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add a certificate
const addCertificate = (formData) => async (dispatch) => {
  try {
    console.log(formData);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const res = await axios.put(
      `/api/profile/certificate/upload`,
      formData,
      config
    );
    dispatch({
      type: UPDATE_PROFILE,
    });
    dispatch(setAlert("Certificate added", "success"));
    console.log(res.data);
  } catch (err) {
    const errors = err.response.data.error;
    if (errors && Array.isArray(errors)) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(errors, "danger"));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Delete a certificate
const removeCertificate = (userId, certificateId) => async (dispatch) => {
  try {
    await axios.delete(`/api/profile/certificate/${userId}/${certificateId}`);
    dispatch(loadProfile);
    dispatch({
      type: REMOVED_CERTIFICATE,
    });
    dispatch(setAlert("Certificate deleted", "success"));
  } catch (err) {
    const errors = err.response.data.error;
    if (errors && Array.isArray(errors)) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(errors, "danger"));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// // Get a Profile photo
// const getProfilePhoto = (userId) => async (dispatch) => {
//   try {
//     const res = await axios.get(`/api/profile/profilePhoto/${userId}`);
//     dispatch({
//       type: GET_PROFILE_PHOTO,
//       payload: res.data,
//     });
//   } catch (err) {
//     const errors = err.response.data.error;
//     if (errors && Array.isArray(errors)) {
//       errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
//     } else {
//       dispatch(setAlert(errors, "danger"));
//     }

//     dispatch({
//       type: PROFILE_ERROR,
//       payload: {
//         msg: err.response.statusText,
//         status: err.response.status,
//       },
//     });
//   }
// };

// Create/Update LoggedIn Users Profile
const createProfile = (formData, history, edit = false) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/profile", formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data.profile,
    });
    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.error;
    if (errors && Array.isArray(errors)) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(errors, "danger"));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Add experience
// history is required when we have to redirect in other component
const addExperience = (formData, history) => async (dispatch) => {
  console.log(formData);
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/api/profile/experience", formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.profile,
    });
    dispatch(setAlert("Experience Added", "success"));
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.error;
    if (errors && Array.isArray(errors)) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(errors, "danger"));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Add Education
// history is required when we have to redirect in other component
const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/api/profile/education", formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.profile,
    });
    dispatch(setAlert("Education Added", "success"));
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.error;
    if (errors && Array.isArray(errors)) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(errors, "danger"));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Delete experience
const deleteExperience = (expId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${expId}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.profile,
    });
    dispatch(setAlert("Experience removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Delete education
const deleteEducation = (expId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${expId}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.profile,
    });
    dispatch(setAlert("Education removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Delete account and hence Profile
const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This can't be undone! ")) {
    try {
      await axios.delete(`/api/profile/`);
      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });
      dispatch(
        setAlert("You're account has been deleted Permanantly ", "success")
      );
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  }
};

export {
  loadProfile,
  createProfile,
  addExperience,
  addEducation,
  deleteExperience,
  deleteEducation,
  deleteAccount,
  getAllProfiles,
  getProfileById,
  getGithubrepos,
  updateProfilePhoto,
  // getProfilePhoto,
  addCertificate,
  removeCertificate,
};
