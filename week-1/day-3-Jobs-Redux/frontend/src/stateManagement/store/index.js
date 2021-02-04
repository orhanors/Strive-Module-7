import { createStore, applyMiddleware } from "redux";
import mainReducer from "../reducers";
import thunk from "redux-thunk";
import logger from "redux-logger";
export const initialState = {
	user: {},
	savedJobs: [],
	jobErrors: "",
};

export default function configureStore() {
	return createStore(
		mainReducer,
		initialState,
		applyMiddleware(thunk, logger)
	);
}
