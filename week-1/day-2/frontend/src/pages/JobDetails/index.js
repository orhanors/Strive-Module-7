import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Loader from "../../common/Loader";
import "./styles.scss";
import { getSingleJob } from "../../api/search";
function JobDetails(props) {
	const [job, setJob] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		getJobDetail();
	}, []);

	const getJobDetail = async () => {
		const jobId = props.match.params.jobId;

		const job = await getSingleJob(jobId);
		setJob(job);
		setIsLoading(false);
	};

	const convertStrToHTML = (text) => {
		const element = document.querySelector(".job-description");
		if (!element) return "loading...";
		element.innerHTML = text;
	};
	return (
		<Container>
			<div className='job-detail-container mt-5'>
				{job ? (
					<Row>
						<Col sm={12}>
							<h4>{job.title}</h4>
						</Col>
						<hr />
						<Col sm={12}>
							<Row>
								<Col sm={8}>
									<div className='job-description'>
										{convertStrToHTML(job.description)}
									</div>
								</Col>

								<Col sm={4}></Col>
							</Row>
						</Col>
					</Row>
				) : (
					<Loader />
				)}
			</div>
		</Container>
	);
}

export default withRouter(JobDetails);
