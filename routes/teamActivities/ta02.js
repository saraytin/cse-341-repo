//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself!
const express = require('express');
const router = express.Router();

var users = ['user1', 'user2', 'user3'];

router.get('/', (req, res, next) => {
	res.render('pages/teamActivities/ta02', {
		title: 'Team Activity 02',
		path: '/teamActivities/ta02', // For pug, EJS
		users: users,
		activeTA03: true, // For HBS
		contentCSS: true, // For HBS
	});
});

router.post('/addUser', (req, res, next) => {
	users.push(req.body.username);
	res.redirect('/teamActivities/ta02');
});
router.post('/removeUser', (req, res, next) => {
	users.splice(users.indexOf(req.body.username), 1);
	res.redirect('/teamActivities/ta02');
});

module.exports = router;
