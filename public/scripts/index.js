// Handle create button event onClick
const createButton = document.getElementById('create-button');
createButton.addEventListener('click', (event) => {
	window.location.href = '/todo';
});
// Handle logout button event onClick
const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', async (event) => {
	try {
		// Post request to server
		const response = await axios.post('/api/logout');

		// Reroute to login on success
		alert('Logout successful!');
		window.location.href = '/login';
	} catch (error) {
		// Handle server request error
		const { data } = error.response;
		console.error(data);
		alert(`Logout failed: ${data.message}`);
	}
});

// Handle submit event for search form
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', async (event) => {
	// Prevent form default execution
	event.preventDefault();

	// Get form input values
	const formData = new FormData(searchForm);
	const page = formData.get('page');
	const limit = formData.get('limit');

	try {
		// GET server api request
		const response = await axios.get('/api/todos', {
			params: { page, limit },
		});

		// Spread payload from response data
		const { payload } = response.data;

		// Display todos
		loadTodos(payload);
	} catch (error) {
		//Handle server request error
		const { data } = error.response;
		console.error(data);
		alert(data.message);
	}
});

// Load todos in todo list
const listContainer = document.getElementById('todo-list');
const loadTodos = (todos) => {
	// Reset list element to empty
	listContainer.innerHTML = '';

	for (const todo of todos) {
		/* Todo card element */
		const todoCard = document.createElement('li');
		todoCard.classList.add('todo-item', 'container', 'full-width');

		// Reroute to todo page on click
		todoCard.addEventListener('click', (event) => {
			window.location.href = `/todo/${todo._id}`;
		});

		/* Todo card title element */
		const todoTitle = document.createElement('h4');
		todoTitle.classList.add('padding-medium');
		todoTitle.innerText = todo.title;

		/* Todo card description element */
		const todoDesc = document.createElement('small');
		todoDesc.classList.add('full-width', 'padding-large');
		todoDesc.innerText = todo.description;

		// Append elements
		todoCard.appendChild(todoTitle);
		todoCard.appendChild(todoDesc);
		listContainer.appendChild(todoCard);
	}
};
