import bcrypt from 'bcrypt';

import userModel from '../models/userModel.js';

// Register new user
export const register = async (req, res) => {
	const { name, email, password } = req.body;

	// Encrypt password
	const salt = await bcrypt.genSalt(8);
	const hashedPassword = await bcrypt.hash(password, salt);

	try {
		// Create new user in database
		const newUser = await userModel.create({
			name,
			email,
			password: hashedPassword,
		});

		// Initialize authenticated session
		req.session.userId = newUser._id;

		// Respond with success
		console.log(`User registration successful with id ${newUser._id}`);
		return res.status(201).json({
			success: true,
			message: 'User registration successful',
		});
	} catch (error) {
		// Handle database query error
		console.log(`User registration failed: ${error.message}`);
		return res.status(500).json({
			success: false,
			message: `Internal server error`,
		});
	}
};

// Log in user
export const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		// Find user from database
		const user = await userModel.findOne({ email: email });

		if (!user) {
			// Handle incorrect or missing email
			console.error(`User with email:${email} not found`);
			return res.status(400).json({
				success: false,
				message: `User not found`,
			});
		}

		// Verify password
		const correctPassword = await bcrypt.compare(password, user.password);
		if (!correctPassword) {
			console.error(`Invalid login attempt by id ${user._id}`);
			return res.status(400).json({
				success: false,
				message: `Invalid password`,
			});
		}

		// Initialize authenticated session
		req.session.userId = user._id;

		// Respond with success
		console.log(`User id ${user._id} login successful`);
		return res.status(200).json({
			success: true,
			message: 'User login successful',
		});
	} catch (error) {
		// Handle database query error
		console.error(`User id ${user._id} login failed: ${error}`);
		return res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

// Log out user
export const logout = async (req, res) => {
	// Get user id from session
	const userId = req.session.userId;

	// Clear session on the server
	req.session.destroy((error) => {
		if (error) {
			// Handle server error
			console.error(`User id ${userId} logout error: ${error.message}`);
			return res.status(500).json({
				success: false,
				message: 'Internal server error',
			});
		}

		// Clear cookie on the client
		req.clearCookie('session');

		// Respond with success
		console.log(`User id ${userId} logout successful`);
		return res.status(200).json({
			success: true,
			message: 'User logout successful',
		});
	});
};
