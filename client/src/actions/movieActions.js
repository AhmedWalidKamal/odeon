import axios from "axios";

import {
  FETCH_MOVIE,
  FETCH_COLLECTION,
  FETCH_SHELF,
  CHANGE_COLLECTION_NAME,
  MOVIE_RATING,
  SEARCH_QUERY
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

export const search = (searchQuery, pages) => dispatch => {
  pages = pages === null ? pages : 1;
  axios
    .get(`/api/movies/search?query=${searchQuery}&page=${pages}`)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: SEARCH_QUERY,
        payload: res.data.results
      });
    })
    .catch(err => console.log(err));
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
  console.log(`Changing collection name to ${collectionName}`);

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

export const addMovieToShelf = (movieId, shelfId) => dispatch => {
  axios
    .put("/api/movies/add-to-shelf", { movieId, shelfId })
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err.response.data.error));
};

export const removeMovieFromShelf = (movieId, shelfId) => dispatch => {
  axios
    .delete("/api/movies/remove-from-shelf", { data: { movieId, shelfId } })
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err.response.data.error));
};
