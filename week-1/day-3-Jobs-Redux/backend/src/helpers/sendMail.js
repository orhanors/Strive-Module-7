const sgMail = require("@sendgrid/mail");
const { sendGridApiKey } = require("../config/keys");
sgMail.setApiKey(sendGridApiKey);

const msg = {
	to: "",
	from: "",
	subject: "Sending with Twilio SendGrid is Fun",
	text: "and easy to do anywhere, even with Node.js",
	html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};

await sgMail.send(msg);
