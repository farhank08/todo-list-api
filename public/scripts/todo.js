// Get id from url
const pathname = window.location.pathname;
const parts = pathname.split('/').filter(Boolean); // ["todo", "123"]
const id = parts.length === 2 ? parts[1] : null;

// Handle clearing form data on clear button click
const titleInput = document.getElementById('title-input');
const descTextarea = document.getElementById('description-textarea');
const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', (event) => {
	titleInput.value = '';
	descTextarea.value = '';
});

// Handle reroute to previous route on back button click
const backButton = document.getElementById('back-button');
backButton.addEventListener('click', (event) => {
	window.location.href = '/';
});

// Handle form submission
const todoForm = document.getElementById('todo-form');
todoForm.addEventListener('submit', async (event) => {
	// Stop default execution
	event.preventDefault();

	// Get form data
	const formData = new FormData(todoForm);
	const title = formData.get('title');
	const description = formData.get('description');

	// Validate form data
	if (!title || !description) {
		alert('Title and description are required');
		return;
	}

	let response;
	try {
		if (id) {
			// Send patch request with id to update todo
			response = await axios.patch(`/api/todos/${id}`, {
				title,
				description,
			});
		} else {
			// Send post request to create new todo
			response = await axios.post('/api/todos', {
				title,
				description,
			});
		}
	} catch (error) {
		// Handle server request error
		const data = error.response.data;
		console.error(data);
		alert(`Error: ${data.message}`);
		return;
	}

	// Alert user to response
	const { message } = response.data;
	alert(message);
});

// Load todo from server if id exists
const loadEditTodo = async () => {
	// Create id label element
	const idContainer = document.getElementById('id-container');
	const idLabel = document.createElement('h6');
	idLabel.id = 'id-label';
	idLabel.innerText = `Todo ID: ${id}`;

	// Append id label to container
	idContainer.appendChild(idLabel);

	// Create delete button element
	const deleteButton = document.createElement('button');
	deleteButton.id = 'delete-button';
	deleteButton.type = 'button';
	deleteButton.classList.add('red');
	deleteButton.innerText = 'Delete';

	// Delete todo item on click
	deleteButton.addEventListener('click', async (event) => {
		// Verify user confirmation for deletion
		const confirmed = confirm('Are you sure?');
		if (!confirmed) return;

		try {
			const response = await axios.delete(`/api/todos/${id}`);

			// Reroute on success
			alert(`Todo id ${id} successfully deleted!`);
			window.location.href = '/';
		} catch (error) {
			// Handle server request error
			const data = error.response.data;
			console.error(data);
			alert(`Error: ${data.message}`);
		}
	});

	// Append delete button to form button container
	const buttonContainer = document.getElementById('form-buttons');
	buttonContainer.appendChild(deleteButton);

	try {
		// Send GET request to retrieve todo with id
		const response = await axios.get(`/api/todos/${id}`);
		const { payload } = response.data;

		// Add response data to form
		titleInput.value = payload.title;
		descTextarea.value = payload.description;
	} catch (error) {
		// Handle server request error
		const { data } = error.response;
		console.error(data);
		alert(`Error: ${data.message}`);
		window.history.back();
	}
};

/* Initialize */
// Hydrate form if id exists
if (id) {
	await loadEditTodo();
}
