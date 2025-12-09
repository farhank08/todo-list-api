import { Router } from 'express';

import { authApi } from '../../authenticators/auth.js';
import * as TodoController from '../../controllers/todoController.js';

// Initialize express router
const router = Router();

// Get todo item with id
router.get('/todos/:id', authApi, TodoController.findTodoById);

// Get all todo items with pagination
// url e.g. /todos?page=1&limit=10
router.get('/todos', authApi, TodoController.getTodos);

// Create new todo item
router.post('/todos', authApi, TodoController.createTodo);

// Update existing todo item
router.patch('/todos/:id', authApi, TodoController.updateTodo);

// Delete existing todo item
router.delete('/todos/:id', authApi, TodoController.deleteTodo);

// Export router
export default router;
