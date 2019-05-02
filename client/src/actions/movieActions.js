import axios from "axios";

import { FETCH_MOVIE, FETCH_COLLECTION, FETCH_SHELF, CHANGE_COLLECTION_NAME, ADD_TO_SHELF } from "./types";

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
      console.log("HE")
      console.log(res);
      dispatch({
        type: FETCH_SHELF,
        payload: {[shelfId]: res.data}
      });
    })
    .catch(err => console.log(err.response.data.error));
}

export const changeCollectionName = collectionName => dispatch => {
  console.log(`Chaning collection name to ${collectionName}`);

  dispatch({
    type: CHANGE_COLLECTION_NAME,
    payload: collectionName
  });
};

export const addToShelf = (movieId, shelfId) => dispatch => {
  axios
    .put("api/movies/add-to-shelf", { movieId, shelfId })
    .then(res => {
      console.log("Movie added to shelf");
    })
    .catch(err => console.log(err.response.data.error));
}
