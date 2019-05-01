import { FETCH_MOVIE } from "../actions/types";

const initialState = {
  movie: {}
};
console.log(initialState);

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIE:
      return {
        ...state,
        movie: action.payload
      };
    default:
      return state;
  }
}
