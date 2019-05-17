import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../util/setAuthToken";

import { SET_CURRENT_USER, FETCH_STATISTICS } from "./types";

export const register = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => {
      console.log("Registration successful");
      history.push("/");
    })
    .catch(err => console.log(err.response.data.error));
};

export const login = (email, password) => dispatch => {
  axios
    .post("/api/users/login", { email, password })
    .then(res => {
      // Extract token
      const { token } = res.data;

      // Set token to localStorage
      localStorage.setItem("jwtToken", token);

      // Set token to Auth Header
      setAuthToken(token);

      // Decode token to get user data
      const decoded = jwt_decode(token);

      // Set user state in reducer
      dispatch(setCurrentUser(decoded));
      console.log(`${decoded.username} signed in successfully`);
    })
    .catch(err => console.log(err.response.data.error));
};

// Set logged-in user in reducer state
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logout = () => dispatch => {
  // Remove jwt token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

export const fetchStatistics = userId => dispatch => {
  axios
    .get(`/api/users/statistics/${userId}`)
    .then(res => {
      dispatch({
        type: FETCH_STATISTICS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// export const editUser = (
//   username,
//   phone,
//   address,
//   password,
//   confirmPassword
// ) => dispatch => {
//   axios
//     .put(`/api/users/edit`, {
//       username,
//       phone,
//       address,
//       password,
//       confirmPassword
//     })
//     .then(res => {
//       // Extract token
//       const { token } = res.data;

//       // Set token to localStorage
//       localStorage.setItem("jwtToken", token);

//       // Set token to Auth Header
//       setAuthToken(token);

//       // Decode token to get user data
//       const decoded = jwt_decode(token);

//       // Set user state in reducer
//       dispatch(setCurrentUser(decoded));

//       // Display success alert
//       dispatch(alertSuccess("Your profile has been updated successfully!"));
//     })
//     .catch(err => dispatch(alertError(err.response.data.error)));
// };
