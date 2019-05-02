import axios from "axios";

import {
  FETCH_MOVIE,
  FETCH_COLLECTION,
  CHANGE_COLLECTION_NAME,
  MOVIE_RATING
} from "./types";

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
  console.log("Fetching home movies from database...");
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

export const changeCollectionName = collectionName => dispatch => {
  console.log(`Chaning collection name to ${collectionName}`);

  dispatch({
    type: CHANGE_COLLECTION_NAME,
    payload: collectionName
  });
};

export const rateMovie = (movieId, rating) => dispatch => {
  axios
    .put(`/api/movies/rate/${movieId}`, { rating })
    .then(res => {
      console.log(res);

      dispatch({
        type: MOVIE_RATING,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
