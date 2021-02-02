export const getJobs = async (description = "backend", location = "berlin") => {
	const proxyurl = "https://cors-anywhere.herokuapp.com/";
	const url = `https://jobs.github.com/positions.json?description=${description}&location=${location}`;
	console.log("url is: ", url);
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
