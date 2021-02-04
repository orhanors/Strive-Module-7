import * as actions from "./actionTypes";

export const getSavedJobs = (userId) => ({
	type: actions.GET_SAVED_JOBS,
	payload: userId,
});

export const saveNewJob = ({ userId, job }) => ({
	type: actions.SAVE_NEW_JOB,
	payload: { userId, job },
});

export const getSavedJobsError = (error) => ({
	type: actions.GET_SAVED_JOBS_FAILURE,
	payload: error,
});

export const removeJob = (jobId) => ({
	type: actions.REMOVE_JOB,
	payload: jobId,
});
