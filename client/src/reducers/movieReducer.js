import {
  FETCH_MOVIE,
  FETCH_COLLECTION,
  CHANGE_COLLECTION_NAME
} from "../actions/types";

const initialState = {
  movie: {},
  movies: [],
  collection_name: "popular"
};
console.log(initialState);

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIE:
      return {
        ...state,
        movie: action.payload
      };
    case FETCH_COLLECTION:
      return {
        ...state,
        movies: action.payload
      };
    case CHANGE_COLLECTION_NAME:
      console.log("MATCHED");

      return {
        ...state,
        collection_name: action.payload
      };
    default:
      return state;
  }
}
