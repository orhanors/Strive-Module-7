import axios from "axios";
import * as actions from "../api";

//description=${description}&location=${location}

const api = ({ dispatch }) => (next) => async (action) => {
	if (action.type !== actions.apiCall.type) {
		//if action is not for api call,go to the next step
		return next(action);
	}

	const { url, method, data, onSuccess, onStart, onError } = action.payload;

	//"onStart" represents loading and makes it true,
	//"onSuccess" action makes it false
	if (onStart) dispatch({ type: onStart });
	next(action); //we can also delete this. It's for seeing the 'api' action details
	try {
		console.log("url is: ", url);
		const response = await axios({
			url,
			method,
			data,
		});

		//General
		dispatch(actions.apiCallSuccess(response.data));
		//Spesific
		if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
	} catch (error) {
		console.log("axios response is: ", error);
		//General error action
		dispatch(actions.apiCallFailed(error.message));

		//Spesific error action
		if (onError) dispatch({ type: onError, payload: error.message });
	}
};

export default api;
