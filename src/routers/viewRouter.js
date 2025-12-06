import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { authViews } from '../authenticators/auth.js';

// Resolve file path in ES Module
const __filepath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filepath);
const viewsDir = path.resolve(__dirname, '../../public/views');

// Initialize express router
const router = Router();

// Serve index page
router.get('/', authViews, (req, res, next) => {
	return res.sendFile(path.join(viewsDir, 'index.html'), (error) => {
		if (error) return next();
	});
});

// Serve login page
router.get('/login', (req, res, next) => {
	// Reroute to home page if in active session
	if (req.session.userId) {
		return res.redirect('/');
	}

	return res.sendFile(path.join(viewsDir, 'login.html'), (error) => {
		if (error) return next();
	});
});

// Server all other html pages
router.use(authViews, (req, res, next) => {
	if (req.method !== 'GET' || req.path.startsWith('/api') || path.extname(req.path)) return next();

	return res.sendFile(path.join(viewsDir, `${req.path}.html`), (error) => {
		if (error) return next();
	});
});

// Export router
export default router;
