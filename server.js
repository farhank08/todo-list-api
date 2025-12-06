import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import * as dbClient from './src/services/dbClient.js';
import userRouter from './src/routers/apiRouters/userRouter.js';
import todoRouter from './src/routers/apiRouters/todoRouter.js';
import viewRouter from './src/routers/viewRouter.js';

// Load environment variables
dotenv.config();

// Resolve the current filepath in ES Module
const __filepath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filepath);
const publicDir = path.resolve(__dirname, 'public');

// Connect to databse
try {
	await dbClient.initDb();
	console.log('Database connection successful');
} catch (error) {
	console.log('Database connection failed');
	console.error(error.message);

	// Exit process with error
	process.exit(1);
}

// Port to deploy server
const port = process.env.PORT || 5000;

// Initialize express server
const app = express();

// Session storage middleware
app.use(
	session({
		name: 'session',
		secret: process.env.SESSION_SECRET_KEY,
		resave: false, // Disable saving session unless modified
		rolling: true, // Refresh token on each request
		saveUninitialized: false, // Disable saving empty session
		cookie: {
			maxAge: 1000 * 60 * 60, // 1 hour (in milliseconds) session lifetime
		},
	})
);

// Parse JSON middleware
app.use(express.json());

// Serve static files
app.use(express.static(publicDir));

// Handle automatic browser favicon request
app.get('/favicon.ico', (req, res) => res.sendStatus(204));

// Set API routers
app.use('/api', userRouter);
app.use('/api', todoRouter);

// Set views router
app.use('/', viewRouter);

// Unhandled routes
app.use((req, res) => {
	console.error(`Unhandled route ${req.path}`);
	return res.status(404).json({
		success: false,
		message: 'Route not found',
	});
});

// Start server
const server = app.listen(port, () => {
	console.log(`Server listening on port: ${port}`);
});

// Close server
process.on('SIGINT', async () => {
	try {
		await new Promise((resolve) => server.close(resolve));
		console.log('Server shutdown successful');
	} catch (error) {
		console.error(`Server shutdown failed\n${error.message}`);
	}

	try {
		await mongoose.disconnect();
		console.log('Database shutdown successful');
	} catch (error) {
		console.error(`Database shutdown failed\n${error.message}`);
	}

	// Exit process with success
	process.exit(0);
});
