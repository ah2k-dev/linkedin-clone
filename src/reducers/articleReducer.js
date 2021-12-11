import { SET_LOADING, GET_POSTS } from "../actions/actionTypes";
const initialState = {
  articles: [],
  loading: false,
};
const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        articles: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.status,
      };
    default:
      return state;
  }
};
export default articleReducer;
