import { FETCH_MOVIE, FETCH_COLLECTION } from "../actions/types";

const initialState = {
  movie: {},
  movies: []
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
    default:
      return state;
  }
}
