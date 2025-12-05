import mongoose from 'mongoose';

// Define structure and validation
const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

// Export model
export default mongoose.model('User', userSchema);
