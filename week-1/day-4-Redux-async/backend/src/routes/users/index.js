const {
	validateBody,
	userSignupSchema,
	userLoginSchema,
} = require("../../middlewares/validator");
const {
	signup,
	login,
	saveJob,
	getSavedJobs,
} = require("../../controllers/user");
const passport = require("../../middlewares/passport");
const router = require("express").Router();
// AUTH
router.post("/auth/signup", validateBody(userSignupSchema), signup);
router.post(
	"/auth/login",
	validateBody(userLoginSchema),
	passport.authenticate("local", { session: false }),
	login
);

//JOBS

router.post("/:userId/jobs", saveJob);
router.get("/:userId/jobs", getSavedJobs);
module.exports = router;
