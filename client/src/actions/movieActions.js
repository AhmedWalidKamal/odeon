import axios from "axios";

import {
  FETCH_MOVIE,
  FETCH_COLLECTION,
  FETCH_SHELF,
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
    .get(`/api/movies/shelf/${shelfId}`)
    .then(res => {
      dispatch({
        type: FETCH_SHELF,
        payload: { [shelfId]: res.data }
      });
    })
    .catch(err => console.log(err.response.data.error));
};

export const changeCollectionName = collectionName => dispatch => {
  dispatch({
    type: CHANGE_COLLECTION_NAME,
    payload: collectionName
  });
};

export const rateMovie = (movieId, rating) => dispatch => {
  axios
    .put(`/api/movies/rate/${movieId}`, { rating })
    .then(res => {
      dispatch({
        type: MOVIE_RATING,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const addMovieToShelf = (movieId, shelfId) => dispatch => {
  axios
    .put("/api/movies/add-to-shelf", { movieId, shelfId })
    .catch(err => console.log(err.response.data.error));
};

export const removeMovieFromShelf = (movieId, shelfId) => dispatch => {
  axios
    .delete("/api/movies/remove-from-shelf", {data: { movieId, shelfId } })
    .catch(err => console.log(err.response.data.error));
};
