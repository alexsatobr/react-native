import {User} from './../models/user';
const authenticate = (req, res, next) => {
	const token = req.header('x-auth');
	console.log('token Flockow', token);
	User.findByToken(token).then((user) => {
		console.log('findbytokens', user);
		if (!user) {
			return Promise.reject();
		}
		req.user = user;
		console.log('authenticate', req.user);
		req.token = token;
		next();
	}).catch((e) => {
		res.status(401).send();
	});
};

module.exports = {authenticate};