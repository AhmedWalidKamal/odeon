import { SET_CURRENT_USER } from "../actions/types";
const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {}
};
console.log(initialState);

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      console.log(action);
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
