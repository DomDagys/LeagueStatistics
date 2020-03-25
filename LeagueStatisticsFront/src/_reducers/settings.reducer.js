import { userConstants } from "../_constants";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user } : {};
export function settings(state = initialState, action) {
  switch (action.type) {
    case userConstants.GETBYID_SUCESS:
      return Object.assign({}, ...state.user, action.user);
    default:
      return state;
  }
}
