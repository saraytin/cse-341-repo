const routes = require('express').Router();
const teamActivities = require('./teamActivities');
const proveActivities = require('./prove');

routes
	.use('/teamActivities', teamActivities)
	.use('/prove', proveActivities)
	.get('/', (req, res, next) => {
		res.render('pages/index', { title: 'CSE341', path: '/' });
	})
	.use((req, res, next) => {
		res.render('pages/404', { title: '404 - Page Not Found', path: req.url });
	});

module.exports = routes;
