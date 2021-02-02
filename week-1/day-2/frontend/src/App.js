import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails/index";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { getJobs } from "./api/search";

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
				<Route
					path='/jobs/:jobId'
					render={(props) => <JobDetails {...props} jobs={jobList} />}
				/>
			</Router>
		</div>
	);
}

export default App;
