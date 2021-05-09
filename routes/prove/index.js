const proveRoutes = require('express').Router();

proveRoutes.use('/prove02', require('./prove02')).get('/', (req, res, net) => {
	res.render('pages/prove/', {
		pageTitle: 'Prove Assignments',
		path: '/prove',
	});
});

module.exports = proveRoutes;
