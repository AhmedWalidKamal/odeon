import {
  FETCH_MOVIE,
  FETCH_COLLECTION,
  CHANGE_COLLECTION_NAME,
  FETCH_SHELF
} from "../actions/types";

const initialState = {
  movie: {},
  movies: [],
  shelves: {},
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
    case FETCH_SHELF:
      return {
        ...state,
        shelves: { ...state.shelves, ...action.payload}
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
