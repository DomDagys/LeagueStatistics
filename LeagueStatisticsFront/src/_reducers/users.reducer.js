import { userConstants } from "../_constants";

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETBYID_SUCESS:
      return {
        items: action.user
      };
    case userConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
}
