import { setUser } from "../actions";
import { SET_USER } from "../actions/actionTypes";
import { auth } from "../firebase";
const initialState = {
  user: {},
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      state.user = action.user;
      return state.user;
    default:
      return state;
  }
};

export default userReducer;
