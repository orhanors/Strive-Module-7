import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getJobs } from "../../api/search";
import Search from "../../components/Search";
import JobList from "../../components/JobList/index";
import Loader from "../../common/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setLocation, setPosition } from "../../store/search";
import { loadJobs } from "../../store/jobs";
function Home(props) {
	const dispatch = useDispatch();
	const [searchPosition, setSearchPosition] = useState("");
	const [searchLocation, setSearchLocation] = useState("");

	const { position, location } = useSelector((state) => state.search);
	const { jobList, savedJobs, loading, errorMessage } = useSelector(
		(state) => state.jobs
	);
	const handleChange = async (e) => {
		const currentId = e.target.id;

		if (currentId == "search-location") setSearchLocation(e.target.value);
		else setSearchPosition(e.target.value);
	};

	useEffect(() => {
		dispatch(loadJobs({ position: "node", location: "berlin" }));
	}, []);

	// const defaultJobSearch = async () => {
	// 	const jobs = await getJobs();
	// 	setJobList(jobs);
	// 	setIsLoading(false);
	// };

	const handleSearch = async () => {
		dispatch(setLocation(searchLocation));
		dispatch(setPosition(searchPosition));
		dispatch(loadJobs({ position, location }));
	};
	const successBody = () => {
		return (
			<Row>
				<Col md={12}>
					<div>
						<Search
							handleSearch={handleSearch}
							values={{
								position: searchPosition,
								location: searchLocation,
							}}
							handleChange={handleChange}
						/>
					</div>
				</Col>

				<Col md={12}>
					<div>
						<JobList jobs={jobList} />
					</div>
				</Col>
			</Row>
		);
	};

	const failBody = (error) => {
		return <p className='mt-4 text-center text-danger'>{error}</p>;
	};
	return (
		<Container>
			{loading ? (
				<Loader />
			) : errorMessage ? (
				failBody(errorMessage)
			) : (
				successBody()
			)}
		</Container>
	);
}

export default Home;
