import axios from "axios";
import jwt_decode from "jwt-decode";

import { FETCH_MOVIE } from "./types";

export const fetchMovie = movieId => dispatch => {
  axios
    .get(`/api/movies/${movieId}`)
    .then(res => {
      dispatch({
        type: FETCH_MOVIE,
        payload: res.data
      });
    })
    .catch(err => console.log(err.response.data.error));
};
