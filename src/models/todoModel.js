import mongoose from 'mongoose';

// Define the structure and validation rules
const todoSchema = new mongoose.Schema({
	title: { type: String, required: true, trim: true, maxLength: 30 },
	description: { type: String, required: true, trim: true, maxLength: 120 },
	userId: { type: String, required: true },
});

// Export model
export default mongoose.model('Todo', todoSchema);
