import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getJobs } from "../../api/search";
import Search from "../../components/Search";
import JobList from "../../components/JobList/index";
import Loader from "../../common/Loader";

function Home(props) {
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
		<Container>
			{isLoading ? (
				<Loader />
			) : (
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
			)}
		</Container>
	);
}

export default Home;
