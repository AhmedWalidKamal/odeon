import { SET_CURRENT_USER, MOVIE_RATING } from "../actions/types";
const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case MOVIE_RATING:
      let newUser = state.user;
      newUser.ratings = action.payload;
      return {
        ...state,
        user: newUser
      };
    default:
      return state;
  }
}
