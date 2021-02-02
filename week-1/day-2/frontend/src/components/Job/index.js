import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.scss";
function Job(props) {
	const stringToHTML = function (str) {
		let htmlObject = document.createElement("div");
		htmlObject.innerHTML = str;
		return htmlObject;
	};

	const { job } = props;
	return (
		<div>
			<Card style={{ width: "13rem" }}>
				<Card.Img variant='top' src={job?.company_logo} />
				<Card.Body>
					<Card.Title>{job?.title}</Card.Title>
					<Card.Text>
						{job?.description.substring(0, 40) + "..."}
					</Card.Text>
					<Link to={`/jobs/${job.id}`}>
						<button id={job?.id}>Go somewhere</button>
					</Link>
				</Card.Body>
			</Card>
		</div>
	);
}

export default Job;
