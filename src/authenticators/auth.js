// Authentication middleware for views
export const authViews = (req, res, next) => {
	// Verify existing session
	if (!req.session.userId) {
		// Reroute to login page
		console.error(`Unauthorized request to ${req.path}`);
		return res.redirect('/login');
	}

	// Reroute to next route handler
	return next();
};

// Authentication middleware for API routes
export const authApi = (req, res, next) => {
	// Verify existing session
	if (!req.session.userId) {
		// Respond with unauthorized
		console.error(`Unauthorized request to ${req.path}`);
		return res.status(401).json({
			success: false,
			message: 'Unauthorized request',
		});
	}

	// Reroute to next route handler
	return next();
};
