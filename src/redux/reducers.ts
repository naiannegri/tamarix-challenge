import { combineReducers } from "redux";

import Register from "./auth/register/reducer";
import Pages from "./pages/reducer"
import Data from "./data/reducer"

export default combineReducers({
 
  Register,
  Pages,
  Data
 
});
