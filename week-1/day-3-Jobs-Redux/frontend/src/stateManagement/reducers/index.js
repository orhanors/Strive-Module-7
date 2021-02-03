import { initialState } from "../store";
import * as actions from "../actions/actionTypes";

export default function mainReducer(state = initialState, action) {
	switch (action.type) {
		case actions.SAVE_NEW_JOB:
			return {
				...state,
				savedJobs: [...state.savedJobs, { ...action.payload }],
			};
		case actions.GET_SAVED_JOBS:
			return {
				...state,
				savedJobs: [...action.payload],
			};
		case actions.GET_SAVED_JOBS_FAILURE:
			return { ...state, jobErrors: action.payload };
		default:
			return state;
	}
}
