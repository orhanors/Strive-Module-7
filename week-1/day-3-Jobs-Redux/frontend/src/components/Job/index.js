import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.scss";
import { BiLabel } from "react-icons/bi";
import { IconContext } from "react-icons";
import { getSingleJob } from "../../api/search";
import { saveJob } from "../../api/userJobs";
import { isAuthenticated } from "../../helpers/auth";

function Job(props) {
	const { job } = props;

	const handleSaveJob = async (e) => {
		if (!isAuthenticated()) {
			window.location.href = "http://localhost:3000/auth/login";
		} else {
			const jobId = e.target.id;

			const jobData = await getSingleJob(jobId);
			const response = await saveJob(jobData);
			if (response.data) {
				console.log("successfully added new job: ");
			}
			window.location.href = "http://localhost:3000/jobs";
		}
	};
	return (
		<div className='job-card-container mb-5'>
			<Card className='job-card' style={{ width: "15rem" }}>
				<div className='d-flex justify-content-around'>
					<img
						className='mx-3 my-3'
						alt='company-logo'
						src={job?.company_logo}
					/>

					{!props.savedJobs && (
						<div>
							<IconContext.Provider
								value={{
									className: "save-job-icon mt-3",
									size: "1.6em",
								}}>
								<BiLabel
									id={job.id}
									onClick={(e) => handleSaveJob(e)}
								/>
							</IconContext.Provider>
						</div>
					)}
				</div>
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
