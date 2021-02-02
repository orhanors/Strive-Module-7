import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getJobs } from "../../api/search";
import Search from "../../components/Search";
import JobList from "../../components/JobList/index";
import Loader from "../../common/Loader";

function Home(props) {
	const {
		isLoading,
		searchPosition,
		searchLocation,
		jobList,
		handleChange,
		handleSearch,
	} = props;

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
	return <Container>{isLoading ? <Loader /> : successBody()}</Container>;
}

export default Home;
