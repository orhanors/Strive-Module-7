import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.scss";
function Job(props) {
	const { job } = props;
	return (
		<div className='job-card-container mb-5'>
			<Card className='job-card' style={{ width: "15rem" }}>
				<img
					className='mx-3 my-3'
					alt='company-logo'
					src={job?.company_logo}
				/>
				<Card.Body>
					<div className='job-title'>
						<p>{job?.title.substring(0, 43)}</p>
					</div>
					<div style={{ marginBottom: "10rem" }}>
						<p className='job-subinfo'>
							{job?.company.substring(0, 16)}
						</p>
						<p className='job-subinfo'>{job?.location}</p>
					</div>
					<Link to={`/jobs/${job.id}`}>
						<button className='success-btn' id={job?.id}>
							Detail
						</button>
					</Link>
				</Card.Body>
			</Card>
		</div>
	);
}

export default Job;
