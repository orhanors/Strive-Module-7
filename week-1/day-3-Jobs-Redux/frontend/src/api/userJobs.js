import { getLocalStorage } from "../helpers/localStorage";
import { getSavedJobsError, getSavedJobs } from "../stateManagement/actions";
import axios from "axios";
import SavedJobs from "../pages/SavedJobs/index";
const { REACT_APP_BE_URL } = process.env;

export const getAllSavedJobs = () => {
	const userId = getLocalStorage("user")?._id;
	return (dispatch) => {
		fetch(REACT_APP_BE_URL + `/users/${userId}/jobs`)
			.then((res) => res.json())
			.then((res) => {
				if (res.errors) {
					throw res.errors;
				}
				console.log("data isssss: ", res.data[0].savedJobs);
				dispatch(getSavedJobs(res.data[0].savedJobs));
				return res.data[0].savedJobs;
			})
			.catch((error) => {
				dispatch(getSavedJobsError(error));
			});
	};
};

export const saveJob = async (data) => {
	const config = {
		headers: { "Content-type": "application/json" },
	};
	const userId = getLocalStorage("user")?._id;
	try {
		const response = await axios.post(
			REACT_APP_BE_URL + `/users/${userId}/jobs`,
			data,
			config
		);
		return response.data;
	} catch (error) {
		console.log("save job error: ", error);
		return error;
	}
};
