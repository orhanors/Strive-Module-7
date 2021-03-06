const Joi = require("joi");

exports.userSignupSchema = Joi.object().keys({
	name: Joi.string().min(1).required(),
	surname: Joi.string().required(),
	email: Joi.string().email().required(),
	username: Joi.string().min(3).required(),
	password: Joi.string().min(6).required(),
	// image: Joi.string().pattern(
	// 	/http?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
	// ),
});
exports.userLoginSchema = Joi.object().keys({
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
});
// Generic validator function to check body
exports.validateBody = (schema) => {
	return (req, res, next) => {
		const { error } = schema.validate(req.body);

		if (error) {
			let originalErrorMessage = error.details[0].message;
			let modifiedErrorMessage =
				error.details[0].path +
				" " +
				originalErrorMessage.substring(
					originalErrorMessage.indexOf(" ") + 1
				);
			return res.status(400).json({ errors: modifiedErrorMessage });
		}

		if (!req.value) {
			req.value = {};
		}

		next();
	};
};
