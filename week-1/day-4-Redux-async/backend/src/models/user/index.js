const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
/**
 * name: Joi.string().min(1).required(),
	surname: Joi.string().required(),
	email: Joi.string().email().required(),
	username: Joi.string().min(3).required(),
	password: Joi.string().min(6).required(),
 */
const userSchema = new mongoose.Schema({
	name: { type: String },
	surname: { type: String },
	username: { type: String },
	password: { type: String },
	savedJobs: [{ type: Object }],
	email: { type: String, unique: true },
});
/**
 * Enyrcyp user password before saving DB
 */
userSchema.methods.hashPassword = async function () {
	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
	} catch (error) {
		console.log("Bcryp hash error: ", error);
		next(error);
	}
};

/**
 * Checks entered password and hashed password in DB
 * returns boolean
 * @param {String} enteredPassword
 */
userSchema.methods.isValidPassword = async function (enteredPassword) {
	try {
		return await bcrypt.compare(enteredPassword, this.password);
	} catch (error) {
		console.log("Bcrypt password check error: ", error);
		next(error);
	}
};

const User = mongoose.model("User", userSchema);

module.exports = User;
