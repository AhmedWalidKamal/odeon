import { FETCH_MOVIE, FETCH_COLLECTION, FETCH_SHELF } from "../actions/types";

const initialState = {
  movie: {},
  movies: [],
  shelves: {}
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
      const shelves = state.shelves;
      return {
        ...state,
        shelves: { ...shelves, ...action.payload}
      }
    default:
      return state;
  }
}
