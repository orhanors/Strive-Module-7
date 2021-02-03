const ApiError = require("../classes/ApiError");
const { signJWT } = require("../helpers/jwt");
const db = require("../models");

exports.signup = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const foundUser = await db.User.findOne({ email });

		if (foundUser) throw new ApiError(400, "Email already exist");

		const newUser = new db.User({ ...req.body });
		await newUser.hashPassword();
		await newUser.save();

		const token = signJWT(newUser); //This is gonna generate a token which contains user ID
		res.status(201).json({ token });
	} catch (error) {
		console.log("Signup controller error", error);
		next(error);
	}
};

exports.login = async (req, res, next) => {
	try {
		//Passport middleware adds req.user
		const token = signJWT(req.user);
		res.status(201).json({ token, user: req.user });
	} catch (error) {
		console.log("Login controller error", error);
		next(error);
	}
};

exports.saveJob = async (req, res, next) => {
	try {
		const { userId } = req.params;
		const updatedUser = await db.User.findByIdAndUpdate(userId, {
			$push: { savedJobs: { ...req.body } },
		});
		console.log("updated user save job: ", updatedUser);
		if (!updatedUser) throw new ApiError(404, "User");

		res.status(201).json({ data: "OK" });
	} catch (error) {
		console.log("Save new job error", error);
		next(error);
	}
};

exports.getSavedJobs = async (req, res, next) => {
	try {
		const { userId } = req.params;
		const savedJobs = await db.User.find(
			{ _id: userId },
			{
				savedJobs: 1,
				_id: 0,
			}
		);

		if (!savedJobs) throw new ApiError(404, "User");

		res.status(200).json({ data: savedJobs });
	} catch (error) {
		console.log("Get all jobs error: ", error);
		next(error);
	}
};
