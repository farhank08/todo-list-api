import TodoModel from '../models/todoModel.js';

// Find todo item by id
export const findTodoById = async (req, res) => {
	// Get user id from session
	const userId = req.session.userId;

	// Get todo id from url
	const todoId = req.params.id;

	try {
		// Get todo with id from database
		const todo = await TodoModel.findOne({ _id: todoId, userId: userId });

		// Handle todo not found error
		if (!todo) {
			console.error(`Todo id ${todoId} not found for User id ${userId}`);
			return res.status(404).json({
				success: false,
				message: 'Todo not found',
			});
		}

		// Respond with success
		console.log(`Todo id ${todoId} retrieved for User id ${userId}`);
		return res.status(200).json({
			success: true,
			payload: todo,
			message: 'Todo found',
		});
	} catch (error) {
		// Handle database query error
		console.error(`Database query error: ${error.message} for User id ${userId}`);
		return res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

// Retrive all todos with optional pagination e.g. /todos?page=1&limit=10
export const getTodos = async (req, res, next) => {
	// Get user id from session
	const userId = req.session.userId;

	// Get queries from (express) request
	const { page, limit } = req.query;

	// Handle missing queries (either one but not both)
	if ((page && !limit) || (!page && limit)) {
		return next();
	}

	try {
		let todos;

		if (page && limit) {
			// Parse queries
			const pageNum = parseInt(page);
			const limitNum = parseInt(limit);

			// Get todos from database with sort and pagination
			todos = await TodoModel.find({ userId })
				.sort({ createdAt: -1 })
				.skip((pageNum - 1) * limitNum)
				.limit(limitNum);
		} else {
			// Get todos from database with sort
			todos = await TodoModel.find({ userId }).sort({ createdAt: -1 });
		}

		// Respond with success
		console.log(`Todos retrieved${page && limit ? ' with pagination' : ''} for user id ${userId}`);
		return res.status(200).json({
			success: true,
			payload: todos,
			message: `Todos found${
				page && limit ? ` for page ${page} and limited to ${limit} todos` : ''
			}`,
		});
	} catch (error) {
		// Handle database query error
		console.error(`Database query error: ${error.message} for User id ${userId}`);
		return res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

// Create new todo item
export const createTodo = async (req, res) => {
	// Get user id from session
	const userId = req.session.userId;

	// Spread request body (from express.json middleware)
	const { title, description } = req.body;

	try {
		// Create new todo on database
		const newTodo = await TodoModel.create({
			title,
			description,
			userId,
		});

		// Respond with success
		console.log(`Created new Todo id ${newTodo.id} for User id ${userId}`);
		return res.status(201).json({
			success: true,
			payload: newTodo,
			message: 'Created new Todo item successfully',
		});
	} catch (error) {
		// Handle database query error
		console.error(`Database query error: ${error.message} for User id ${userId}`);
		return res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

// Update existing todo item
export const updateTodo = async (req, res) => {
	// Get user id from session
	const userId = req.session.userId;

	// Get todo id from url
	const todoId = req.params.id;

	// Handle missing request body error
	if (!req.body) {
		console.error(`Missing request body to update Todo id ${todoId} for User id ${userId}`);
		return res.status(400).json({
			success: false,
			message: 'Missing request body',
		});
	}

	// Spread request body
	const { title, description } = req.body;

	// Handle missing request body data error
	if (!title && !description) {
		console.error(`Missing request body to update Todo id ${todoId} for User id ${userId}`);
		return res.status(400).json({
			success: false,
			message: 'Missing request body',
		});
	}

	try {
		// Seperate undefined values from request body
		const update = {};
		if (title) update.title = title;
		if (description) update.description = description;

		// Find and update todo
		const updatedTodo = await TodoModel.findOneAndUpdate(
			{
				_id: todoId,
				userId,
			},
			update,
			{ new: true }
		);

		// Handle todo not found error
		if (!updatedTodo) {
			console.error(`Todo id ${todoId} not found for User id ${userId}`);
			return res.status(404).json({
				success: false,
				message: 'Todo not found',
			});
		}

		// Respond with success
		console.log(`Updated Todo id ${todoId} for User id ${userId}`);
		return res.status(200).json({
			success: true,
			payload: updatedTodo,
			message: 'Updated todo item successfully',
		});
	} catch (error) {
		// Handle database query error
		console.error(`Database query error: ${error.message} for User id ${userId}`);
		return res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

// Delete existing todo item
export const deleteTodo = async (req, res) => {
	// Get user id from session
	const userId = req.session.userId;

	// Get todo id from url
	const todoId = req.params.id;

	try {
		// Create new todo on database
		const newTodo = await TodoModel.deleteOne({ _id: todoId, userId });

		// Handle todo not found error
		if (!newTodo.deletedCount) {
			console.error(`Todo id ${todoId} not found for User id ${userId}`);
			return res.status(404).json({
				success: false,
				message: 'Todo not found',
			});
		}

		// Respond with success
		console.log(`Deleted Todo id ${todoId} for User id ${userId}`);
		return res.status(500).json({
			success: true,
			payload: newTodo,
			message: 'Deleted Todo item successfully',
		});
	} catch (error) {
		// Handle database query error
		console.error(`Database query error: ${error.message} for User id ${userId}`);
		return res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};
