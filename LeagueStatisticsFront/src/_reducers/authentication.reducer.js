import { userConstants } from "../_constants";

//let user = JSON.parse(localStorage.getItem("user"));
const initialState = { loggedIn: false, user: {} };

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {
        loggedIn: false, user: {}
      };
    case userConstants.UPDATE_SUCCESS:
      let usera = {
        ...state.user,
        summonerName: action.user.summonerName,
        region: action.user.region
      };
      //let result = Object.assign({}, state, user);
      return {
        user: usera
      };
    default:
      return state;
  }
}
