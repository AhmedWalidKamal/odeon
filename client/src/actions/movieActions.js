import axios from "axios";

import { FETCH_MOVIE, FETCH_COLLECTION, FETCH_SHELF } from "./types";

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

export const fetchMoviesCollection = collectionName => dispatch => {
  axios
    .get(`/api/movies/collection/${collectionName}`)
    .then(res => {
      dispatch({
        type: FETCH_COLLECTION,
        payload: res.data.results
      });
    })
    .catch(err => console.log(err.response.data.error));
};

export const fetchShelfMovies = shelfId => dispatch => {
  axios
    .get(`/api/movies/collection/${shelfId}`)
    .then(res => {
      dispatch({
        type: FETCH_SHELF,
        payload: {[shelfId]: res.data.results}
      });
    })
    .catch(err => console.log(err.response.data.error));
}
