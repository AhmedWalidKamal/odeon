import axios from "axios";
import jwt_decode from "jwt-decode";

import { FETCH_PROFILE } from "./types";

export const fetchProfile = (userId) => dispatch => {
  axios
    .get(`/api/users/profile/${userId}`)
    .then(res => {
      console.log(res);
      dispatch({
        type: FETCH_PROFILE,
        payload: res
      });
    })
    .catch(err => console.log(err.response.data.error));
}
