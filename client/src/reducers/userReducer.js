const initialState = {
  isAuthenticated: false,
  user: {}
};
console.log(initialState);

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
