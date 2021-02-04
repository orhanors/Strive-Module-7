import React from "react";
import { Card } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import "./styles.scss";
import { BiLabel } from "react-icons/bi";
import { IoIosRemoveCircle } from "react-icons/io";
import { IconContext } from "react-icons";
import { getSingleJob } from "../../api/search";
import { isAuthenticated } from "../../helpers/auth";
import { useDispatch } from "react-redux";
import { addJob } from "../../store/jobs";

function Job(props) {
	const { job } = props;
	const dispatch = useDispatch();

	const handleSaveJob = async (e) => {
		if (!isAuthenticated()) {
			props.history.push("/auth/login");
		} else {
			//TODO SAVE JOB STORE
			const job = await getSingleJob(e.target.id);
			dispatch(addJob(job));
			props.history.push("/jobs");
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

					{props.savedJobs && (
						<div>
							<IconContext.Provider
								value={{
									className: "save-job-icon mt-3",
									size: "1.6em",
								}}>
								<IoIosRemoveCircle
									id={job.id}
									onClick={props.handleRemoveJob}
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

export default withRouter(Job);
