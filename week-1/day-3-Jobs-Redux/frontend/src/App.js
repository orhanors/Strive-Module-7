import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails/index";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { getJobs } from "./api/search";
import Signin from "./pages/Authorization/Signin";
import Signup from "./pages/Authorization/Signup";

import configureStore from "./stateManagement/store";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import SavedJobs from "./pages/SavedJobs/index";
import NavBar from "./components/NavBar";

const store = configureStore();
console.log("state: ", store.getState());
function App(props) {
	const [searchPosition, setSearchPosition] = useState("");
	const [searchLocation, setSearchLocation] = useState("");
	const [jobList, setJobList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		defaultJobSearch();
	}, []);

	const defaultJobSearch = async () => {
		const jobs = await getJobs();
		setJobList(jobs);
		setIsLoading(false);
	};

	const handleChange = async (e) => {
		const currentId = e.target.id;

		if (currentId == "search-location") setSearchLocation(e.target.value);
		else setSearchPosition(e.target.value);
	};

	const handleSearch = async () => {
		setIsLoading(true);
		const jobs = await getJobs(searchPosition, searchLocation);
		setJobList(jobs);
		setIsLoading(false);
	};
	return (
		<div>
			<Router>
				<NavBar />
				<Route
					path='/'
					exact
					render={(props) => (
						<Home
							{...props}
							handleChange={handleChange}
							handleSearch={handleSearch}
							isLoading={isLoading}
							searchPosition={searchPosition}
							searchLocation={searchLocation}
							jobList={jobList}
						/>
					)}
				/>
				<Route path='/auth/login' component={Signin} />
				<Route path='/auth/signup' component={Signup} />
				<Route
					path='/jobs/:jobId'
					exact
					render={(props) => <JobDetails {...props} jobs={jobList} />}
				/>
				<ProtectedRoute path='/jobs' exact component={SavedJobs} />
			</Router>
		</div>
	);
}

export default App;
