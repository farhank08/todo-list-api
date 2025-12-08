const logoutButton = document.getElementById('logout-button');

logoutButton.addEventListener('click', async (event) => {
	try {
		// Post request to server
		const response = await axios.post('/api/logout');

		// Reroute to login on success
		alert('Logout successful!');
		window.location.href = '/login';
	} catch (error) {
		// Store error response data
		const result = error.response.data;

		// Handle server request error
		console.error(result);
		alert(`Logout failed: ${result.message}`);
	}
});
