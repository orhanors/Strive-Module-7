import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducers";
import { logger, middWithParam } from "./middleware/practice";
import api from "./middleware/api";
export default function () {
	return configureStore({
		reducer,
		middleware: [...getDefaultMiddleware(), logger, api],
	});
}

// NOTES
/**
 *  --> "getDefaultMiddleware" applies default middlewares like thunk
 *  --> Redux-Toolkit contains dev-tools and thunk as default
 */
