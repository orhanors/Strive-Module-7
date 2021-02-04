import React, { useState, useEffect } from "react";
import "./styles.scss";
import { connect } from "react-redux";
import { getAllSavedJobs } from "../../api/userJobs";
import Job from "../../components/Job/index";
import { Row, Col, Container } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { getLocalStorage } from "../../helpers/localStorage";
import { removeJob } from "../../stateManagement/actions";
const mapStateToProps = (state) => state;

const mapDispatchtoProps = (dispatch) =>
	bindActionCreators(
		{
			getAllSavedJobs,
			removeJob: (id) => dispatch(removeJob(id)),
		},
		dispatch
	);
function SavedJobs(props) {
	const [jobs, setJobs] = useState([]);
	console.log("saved props: ", props);

	const getJobs = async () => {
		props.getAllSavedJobs();
	};
	useEffect(() => {
		getJobs();
	}, []);

	const handleRemoveJob = (e) => {
		console.log("e.target: ", e.target.id);
		removeJob(e.target.id);
	};

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
				{props.savedJobs?.map((job, index) => (
					<Col key={index} sm={12} md={6} lg={3}>
						<Job
							handleRemoveJob={handleRemoveJob}
							savedJobs={true}
							job={job}
						/>
					</Col>
				))}
			</Row>
		</Container>
	);
}

export default connect(mapStateToProps, mapDispatchtoProps)(SavedJobs);
