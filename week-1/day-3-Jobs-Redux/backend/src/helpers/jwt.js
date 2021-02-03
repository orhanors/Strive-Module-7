const JWT = require("jsonwebtoken");

const { jwtSecret } = require("../config/keys");
/**
 * @param {Object} newUser
 */
exports.signJWT = (payload) => {
	const modifiedPayload = {
		iss: "linkedin",
		sub: payload._id,
		iat: new Date().getTime(),
	};

	return JWT.sign(modifiedPayload, jwtSecret, { expiresIn: "20d" });
};
