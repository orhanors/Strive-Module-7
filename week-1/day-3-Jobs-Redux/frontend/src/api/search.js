const proxyurl = "https://thingproxy.freeboard.io/fetch/";
export const getJobs = async (description = "backend", location = "berlin") => {
	const url = `https://jobs.github.com/positions.json?description=${description}&location=${location}`;

	try {
		const response = await fetch(proxyurl + url, {
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
		});

		const data = await response.json();
		console.log("response is ---> ", data);
		return data;
	} catch (error) {
		console.log("Get jobs error", error);
		return error;
	}
};

export const getSingleJob = async (jobId) => {
	const url = `https://jobs.github.com/positions/${jobId}.json`;
	try {
		const response = await fetch(proxyurl + url, {
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
		});

		const data = await response.json();
		console.log("single job: ", data);
		return data;
	} catch (error) {
		console.log("Get single job error", error);
		return error;
	}
};
