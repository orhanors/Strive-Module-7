import { combineReducers } from "redux";

import userReducer from "./auth";
import jobsReducer from "./jobs";
import searchReducer from "./search";

export default combineReducers({
	user: userReducer,
	jobs: jobsReducer,
	search: searchReducer,
});
