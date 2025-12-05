import mongoose from 'mongoose';

// Define the structure and validation rules
const todoSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, trim: true, maxLength: 60 },
		description: { type: String, required: true, trim: true, maxLength: 240 },
		userId: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

// Export model
export default mongoose.model('Todo', todoSchema);
