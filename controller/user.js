var User = require("../models/user");
var auth = require("../util/auth");
var { isValidUser } = require("../util/validatorModule");

module.exports = {
	registerUser: async (req, res, next) => {
		try {
			if (!req.body.user) {
				return res.status(400).json({ message: "Invalid Credentials" });
			}
			if (!isValidUser(req.body.user)) {
				return res.status(400).json({ message: "Wrong Input" });
			}
			var user = await User.create(req.body.user);
			res.json({ user: user.format() });
		} catch (error) {
			next(error);
		}
	},
	loginUser: async (req, res, next) => {
		try {
			var { user } = req.body;
			if (!user || !user.email || !user.password) {
				return res.status(400).json({ message: "Wrong Input" });
			}
			var currentUser = await User.findOne({ email: user.email });
			if (!currentUser) {
				return res.status(404).json({ message: "Invalid email address" });
			}
			var result = await currentUser.verifyPassword(user.password);
			if (!result) {
				return res.status(401).json({ message: "Invalid password" });
			}
			var token = await auth.generateJwt(currentUser, next);
			console.log(token);
			res.json({ user: currentUser.format(), token });
		} catch (error) {
			next(error);
		}
	},
	updateUser: async (req, res, next) => {
		try {
			var user = req.body.user;
			console.log("BACKEND BODY.USER", user);

			if (!user) {
				return res.status(400).json({ massage: "Invalid User" });
			}

			var currentUser = await User.findById(req.userId);

			// console.log(currentUser, "Before adding Password");

			// //if user has not changed password, assign the previous password again to user to pass isValidUser validator
			// if (user.password && !user.password === "") {
			// 	currentUser.password = user.password;
			// } else {
			// 	user.password = currentUser.password;
			// }

			// console.log(user, "After adding Password");

			// //run isValidUser and if not valid user return error

			// if (!isValidUser(user)) {
			// 	return res.status(400).json({ massage: "Invalid Input" });
			// }

			// //var updatedUser = await currentUser.save();
			// var updatedUser = await currentUser.save();

			//newChange

			//real change
			if (user.email) {
				currentUser.email = user.email;
			}
			if (user.password) {
				currentUser.password = user.password;
			}
			if (user.name) {
				currentUser.name = user.name;
			}
			var updatedUser = await currentUser.save();

			res.send({ user: updatedUser });
		} catch (error) {
			next(error);
		}
	},

	getCurrentUser: async (req, res, next) => {
		try {
			var userId = req.userId;

			var user = await User.findById(userId);

			if (!user) {
				res.status(404).send({ massage: "User not found" });
			}

			res.send({ user: user.format() });
		} catch (error) {
			next(error);
		}
	},
};

//isValueToBeUpdatedValid
