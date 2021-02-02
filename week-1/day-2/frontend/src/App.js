import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails/index";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App(props) {
	return (
		<div>
			<Router>
				<Route path='/' exact component={Home} />
				<Route path='/jobs/:jobId' component={JobDetails} />
			</Router>
		</div>
	);
}

export default App;
