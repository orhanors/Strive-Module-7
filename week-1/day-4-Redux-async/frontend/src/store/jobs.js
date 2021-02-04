/**
 * RULES FOR DUCKS PATTERN
 * ------------------------
 * 1- Make Reducer default export
 * 2- Export all Action Creators individuly
 */
//-------------------------------
//SLICE APPROACH

/**
 * We can also use normal mutable operations in "createSlice",
 * Under the hood, it uses "immer" library
 */
import { createSlice, createAction } from "@reduxjs/toolkit";
import { getLocalStorage } from "../helpers/localStorage";
import { apiCall } from "./api";

const slice = createSlice({
	name: "jobs",
	initialState: {
		jobList: [],
		savedJobs: [],
		loading: false,
		lastFetch: null,
		errorMessage: null,
	},
	reducers: {
		jobRequested: (state) => ({
			...state,
			loading: true,
		}),

		jobRequestFailed: (state, action) => ({
			...state,
			loading: false,
			errorMessage: action.payload,
		}),
		getJobs: (state, action) => ({
			...state,
			loading: false,
			jobList: action.payload,
		}),
		setSavedJobs: (state, action) => ({
			...state,
			savedJobs: [...action.payload],
		}),

		saveJob: (state, action) => ({
			...state,
			savedJobs: [...state.savedJobs, { ...action.payload.data }],
		}),
		removeSavedJob: (state, action) => ({
			...state,
			savedJobs: [
				...state.savedJobs.filter(
					(job) => job.id !== action.payload.id
				),
			],
		}),
	},
});
export const {
	saveJob,
	removeSavedJob,
	getJobs,
	jobRequested,
	jobRequestFailed,
	setSavedJobs,
} = slice.actions;

//Action creators

export const loadJobs = (details) =>
	apiCall({
		url: `https://thingproxy.freeboard.io/fetch/https://jobs.github.com/positions.json?description=${details.position}&location=${details.location}`,
		onStart: jobRequested.type,
		onSuccess: getJobs.type,
		onError: jobRequestFailed.type,
	});

const userId = getLocalStorage("user")?._id;

export const addJob = (job) =>
	apiCall({
		url: `http://localhost:3001/api/users/${userId}/jobs`,
		method: "post",
		data: job,
		onStart: jobRequested.type,
		onSuccess: saveJob.type,
		onError: jobRequestFailed.type,
	});

export default slice.reducer;
