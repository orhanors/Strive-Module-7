import React from "react";
import Job from "../Job";
import { Row, Col } from "react-bootstrap";
function JobList(props) {
	const { jobs } = props;
	return (
		<div>
			<Row>
				{jobs?.map((job, index) => (
					<Col key={index} md={3}>
						<Job job={job} />
					</Col>
				))}
			</Row>
		</div>
	);
}

export default JobList;
