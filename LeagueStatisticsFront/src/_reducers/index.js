import { combineReducers } from "redux";

import { authentication } from "./authentication.reducer";
import { users } from "./users.reducer";
import { alert } from "./alert.reducer";
import { registration } from "./registration.reducer";
import { settings } from "./settings.reducer";
const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  registration,
  settings
});

export default rootReducer;
