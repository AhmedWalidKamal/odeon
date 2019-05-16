import { FETCH_PROFILE } from "../actions/types";

const initialState = {
  profile: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_PROFILE:
      return {
        ...state,
        profile: action.payload
      };
    default:
      return state;
  }
}
