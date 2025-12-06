const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// Handle login form submission
loginForm.addEventListener('submit', async (event) => {
	// Prevent default execution
	event.preventDefault();

	// Get form data from login form
	const formData = new FormData(loginForm);
	const email = formData.get('email');
	const password = formData.get('password');

	try {
		// Post request to server
		const response = await axios.post('/api/login', {
			email,
			password,
		});

		// Reroute to home page on success
		alert('Login successful!');
		window.location.href = '/';
	} catch (error) {
		// Store server response data
		const result = error.response.data;

		// Handle server request error
		console.error(result);
		alert(`Login failed: ${result.message}`);
	}
});

// Handle register form submission
registerForm.addEventListener('submit', async (event) => {
	// Prevent default execution
	event.preventDefault();

	// Get form data from register form
	const formData = new FormData(registerForm);
	const name = formData.get('name');
	const email = formData.get('email');
	const password = formData.get('password');

	try {
		// Post request to server
		const response = await axios.post('/api/register', {
			name,
			email,
			password,
		});

		// Reroute to home page on success
		alert('Registration successful!');
		window.location.href = '/';
	} catch (error) {
		// Store server response data
		const result = error.response.data;

		// Handle server request error
		console.error(result);
		alert(`Registration failed: ${result.message}`);
	}
});
