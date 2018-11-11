import './config/config';

import _ from 'lodash';
import express from 'express';
import bodyParser from 'body-parser';
import {ObjectID} from 'mongodb';

import {mongoose} from './db/mongoose';
import {Todo} from './models/todo';
import {User} from './models/user';
import {DesafiosGerais} from './models/desafios';
import {DesafiosComunidade} from './models/DesafiosComunidade';
import {authenticate} from './middleware/authenticate';

import * as AuthController from './controllers/authController';

import MomentTz from './utils/helpers/momentTz';



const passport = require('passport'), FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
	clientID: 2045886269056862,
	clientSecret: '59684ab904b9c4b662f39bba67cabe61',
	callbackURL: 'http://localhost:3000/auth/facebook/callback/'
},
function(accessToken, refreshToken, profile, done) {
	console.log('AAA', accessToken, profile);
	// User.findOrCreate({ facebookId: profile.id }, function(err, user) {
	// 	if (err) { return done(err); }
	// 	done(null, user);
	// done(null, user)
	// });
}
));

// import 'babel-polyfill';
const app = express();
const port = process.env.PORT || 3000;

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());


app.post('/users/socialauth', AuthController.loginWithAuth);

app.get('/desafios_gerais', async (req, res) => {
	const challengeInterest = req.query.interest;
	const challengeInterestArr = challengeInterest && challengeInterest.split(' ');
	const challengeStage = req.query.stage === '1' || req.query.stage === '2' ? req.query.stage : null;
	if (challengeInterest && challengeStage) {
		try {
			const challengeStageStr = `stage_${challengeStage}`;
			const challengesByInterest = await DesafiosGerais.aggregate([
				{$project: {
					result: {
						$filter: {
							input: `$${challengeStageStr}`,
							as: `${challengeStageStr}`,
							cond: {$in: [`$$${challengeStageStr}.interest`, challengeInterestArr]}
							// cond: {$eq: [`$$${challengeStageStr}.interest`, challengeInterest]}
						}
					}
				}}
			]);	
			return res.send(...challengesByInterest);

		} catch (err) {
			return res.status(400).send(err);
		}
	}

	return DesafiosGerais.find({}).then((desafios_gerais) => {
		res.send(desafios_gerais[0]);
	}, (e) => {
		res.status(400).send(e);
	});
});

app.post('/desafios_gerais', async (req, res) => {
	const challengeStage = req.query.stage === '1' || req.query.stage === '2' ? req.query.stage : null;
	// const challengeType = req.query.type;
	// const challengeDifficulty = req.query.difficulty;

	if (challengeStage) {
		const challengeType = `stage_${challengeStage}`;
		const sumOfChallengesByType = `stage_${challengeStage}_total`;
		let sumOfChallengesByTypeObj = {[sumOfChallengesByType]: 1};
		req.body.dateTzUtc = MomentTz(req.body.createdAt, req.body.timeZone);
		let challengeObj = {[challengeType]: req.body};

		try {
			const getSumOfChallenges = await DesafiosGerais.find({}, sumOfChallengesByTypeObj);
			const index = getSumOfChallenges[0] && getSumOfChallenges[0][sumOfChallengesByType] || 0;
			challengeObj[challengeType].id = index + 1;
			await DesafiosGerais.findOneAndUpdate({}, {$inc: {...sumOfChallengesByTypeObj}, $push: challengeObj }, { upsert: true });
			const receivedChallenges = await DesafiosGerais.find({});

			return res.send(...receivedChallenges);

		} catch (err) {
			return res.status(400).send(err);
		}
	}

	return res.status(400).send('Not Found');

});

app.get('/desafios_comunidade', async (req, res) => {
	const challengeId = req.query.challengeId;
	if (challengeId) {
		return await DesafiosComunidade.find({ 'stage_3.id': challengeId}, {_id: 0, 'stage_3.$': 1}, (err, suc) => {
			if (suc && suc[0] && suc[0].stage_3 && suc[0].stage_3[0]) {
				return res.send(suc[0].stage_3[0]);
			} else {
				return res.status(400).send(err);		
			}
		});
	}
	return DesafiosComunidade.find({}).then((desafios_comunidade) => {
		res.send(desafios_comunidade[0]);
	}, (e) => {
		res.status(400).send(e);
	});
});

app.post('/desafios_comunidade', async (req, res) => {
	const challengeRating = req.query.rating;
	const challengeId = req.query.challengeId;
	req.body.dateTzUtc = MomentTz(req.body.createdAt, req.body.timeZone);
	if (challengeRating && challengeId) {
		try {
			const rating = challengeRating === 'likes' ? 'likes' : 'dislikes';
			const ratingKey = `stage_3.$.rating.${rating}`;			
			await DesafiosComunidade.findOneAndUpdate({'stage_3.id': challengeId}, {$inc: {[ratingKey]: 1}}, { upsert: true });
			const receivedChallenges = await DesafiosComunidade.find({});
			return res.send(receivedChallenges);
		} catch(err) {
			return res.status(400).send(err);
		}
	}

	try {
		const getSumOfChallenges = await DesafiosComunidade.find({}, {total_challenges: 1});
		const index = getSumOfChallenges[0] && getSumOfChallenges[0].total_challenges || 0;
		let challengeObj = {...req.body, ...{id: index + 1}};
		await DesafiosComunidade.updateOne({}, { $inc: {total_challenges: 1}, $push: {stage_3: challengeObj} }, { upsert: true });
		const receivedChallenges = await DesafiosComunidade.find({});

		return res.send(receivedChallenges);

	} catch (err) {
		return res.status(400).send(err);
	}
});


app.delete('/todos/:id', authenticate, async (req, res) => {
	const id = req.params.id;
	if (!ObjectID.isValid(id)){
		return res.status(404).send();
	}

	try {
		const todo = await Todo.findOneAndRemove({
			_id: id,
			_creator: req.user._id
		});
		if (!todo) {
			return res.status(404).send();
		}
		res.send({todo});
	} catch (e) {
		res.status(400).send();
	}
});

app.patch('/todos/:id',  authenticate, (req, res) => {
	const id = req.params.id;
	let body = _.pick(req.body, ['text', 'completed']);

	if (!ObjectID.isValid(id)){
		return res.status(404).send();
	}
	if (_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findOneAndUpdate({
		_id: id,
		_creator: req.user._id
	}, {$set: body}, {new: true}).then((todo) => {
		if (!todo) {
			return res.status(404).send();
		}
		res.send({todo});
	}).catch((e) => {
		res.status(404).send();
	});
});

app.post('/users', async (req, res) => {
	try {
		const body = _.pick(req.body, ['email', 'password']);
		const user = new User(body);
		await user.save();
		const token = await user.generateAuthToken();
		res.header('x-auth', token).send(user);
	} catch(e) {
		res.status(400).send(e);
	}
});

app.get('/users/details', authenticate, async (req, res) => {
	const userObj = {
		name: req.user.displayName,
		avatar: req.user.avatar,
		email: req.user.email,
		provider: req.user.providerData.provider,
		id: req.user._id,
		completed_challenges: req.user.completed_challenges,
		created_challenges: req.user.created_challenges,
		created_challenge_list: req.user.created_challenge_list,
		stage_1_completed_list: req.user.stage_1_completed_list,
		stage_2_completed_list: req.user.stage_2_completed_list,
		stage_3_completed_list: req.user.stage_3_completed_list,
		badges: req.user.badges
	};
	res.send(userObj);
});

app.post('/users/login', async (req, res) => {
	try {
		const body = _.pick(req.body, ['email', 'password']);
		const user =  await User.findByCredentials(body.email, body.password);
		const token = await user.generateAuthToken();
		res.header('x-auth', token).send(user);
	} catch (e) {
		res.status(400).send();
	}
});

app.delete('/users/me/token', authenticate, async (req, res) => {
	try {
		await req.user.removeToken(req.token);
		res.status(200).send();
	} catch (e) {
		res.status(400).send();
	}
});

app.listen(port, () => {
	console.log(`Started on port ${port}`);
});

module.exports = {app};