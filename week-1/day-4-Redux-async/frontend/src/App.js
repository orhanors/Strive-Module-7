import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails/index";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { getJobs } from "./api/search";
import configureStore from "./store/configureStore";
import { loadJobs, saveJob, setSavedJobs } from "./store/jobs";
import NavBar from "./components/NavBar";
import Signin from "./pages/Authorization/Signin";
import Signup from "./pages/Authorization/Signup";
import SavedJobs from "./pages/SavedJobs/index";
import { isAuthenticated } from "./helpers/auth";
import { useDispatch } from "react-redux";
import { login } from "./store/auth";
import { getLocalStorage } from "./helpers/localStorage";
// const store = configureStore();

// store.dispatch(loadJobs());
function App(props) {
	const dispatch = useDispatch();

	useEffect(() => {
		const user = getLocalStorage("user");
		if (isAuthenticated()) {
			dispatch(login(user));
			dispatch(setSavedJobs(user.savedJobs));
		}
	}, []);
	return (
		<div>
			<Router>
				<NavBar />
				<Route path='/' exact render={(props) => <Home {...props} />} />
				<Route
					path='/jobs/:jobId'
					render={(props) => <JobDetails {...props} />}
				/>
				<Route path='/auth/login' exact component={Signin} />
				<Route path='/jobs' exact component={SavedJobs} />
				<Route path='/auth/signup' exact component={Signup} />
			</Router>
		</div>
	);
}

export default App;
