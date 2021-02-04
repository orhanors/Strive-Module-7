import React, { useState, useEffect } from "react";
import "./styles.scss";
import { useSelector } from "react-redux";
import Job from "../../components/Job/index";
import { Row, Col, Container } from "react-bootstrap";

import { getLocalStorage } from "../../helpers/localStorage";
import Loader from "../../common/Loader";

function SavedJobs(props) {
	const { savedJobs, errorMessage, loading } = useSelector(
		(state) => state.jobs
	);
	console.log("saved jobs: ", savedJobs);
	const successBody = () => {
		return (
			<Container>
				<Row>
					<Col>
						<p className='text-center my-5'>
							Apply to your saved jobs{" "}
							<strong>{getLocalStorage("user").name}</strong>{" "}
						</p>
					</Col>
				</Row>
				<Row>
					{savedJobs.length > 0 &&
						savedJobs?.map((job, index) => (
							<Col key={index} sm={12} md={6} lg={3}>
								<Job
									//handleRemoveJob={handleRemoveJob}
									savedJobs={true}
									job={job}
								/>
							</Col>
						))}
				</Row>
			</Container>
		);
	};

	const failBody = (error) => {
		return <div className='mt-4 text-center'>{error}</div>;
	};
	return (
		<div>
			{loading ? (
				<Loader />
			) : errorMessage ? (
				failBody(errorMessage)
			) : (
				successBody()
			)}
		</div>
	);
}

export default SavedJobs;
