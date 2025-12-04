import mongoose from 'mongoose';

// Initialize database connection
export const initDb = async () => {
	// Load environment variables
	const uri = process.env.MONGODB_URI;

	// Connect to database
	const client = await mongoose.connect(uri);

	// Handle connection success
	client.connection.on('connected', () => {
		console.log('Database connection successful');
	});

	// Handle connection failure
	client.connection.on('error', (error) => {
		throw new Error(`Database connection failed\n${error}`);
	});
};
