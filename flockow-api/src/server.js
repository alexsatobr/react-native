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
// import 'babel-polyfill';
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/desafios_gerais', (req, res) => {
	DesafiosGerais.find({}).then((desafios_gerais) => {
		res.send(desafios_gerais[0]);
	}, (e) => {
		res.status(400).send(e);
	});
});

app.post('/desafios_gerais', async (req, res) => {
	const challengeStage = req.query.stage === '1' || req.query.stage === '2' ? req.query.stage : null;
	const challengeType = req.query.type;
	const challengeDifficulty = req.query.difficulty;

	if (challengeStage && challengeType && challengeDifficulty) {
		const challengeType = `stage_${challengeStage}`;
		const sumOfChallengesByType = `stage_${challengeStage}_total`;
		let sumOfChallengesByTypeObj = {[sumOfChallengesByType]: 1};
		let challengeObj = {[challengeType]: req.body};

		try {
			const getSumOfChallenges = await DesafiosGerais.find({}, sumOfChallengesByTypeObj);
			const index = getSumOfChallenges[0] && getSumOfChallenges[0][sumOfChallengesByType] || 0;
			challengeObj[challengeType].id = index + 1;
			await DesafiosGerais.findOneAndUpdate({}, {$inc: {...sumOfChallengesByTypeObj}, $push: challengeObj }, { upsert: true });
			const receivedChallenges = await DesafiosGerais.find({});

			return res.send(receivedChallenges);

		} catch (err) {
			return res.status(400).send(err);
		}
	}

	return res.status(400).send('Not Found');

});

app.get('/desafios_comunidade', (req, res) => {
	DesafiosComunidade.find({}).then((desafios_comunidade) => {
		res.send(desafios_comunidade[0]);
	}, (e) => {
		res.status(400).send(e);
	});
});

app.post('/desafios_comunidade', async (req, res) => {
	// const challengeStage = req.query.stage === '1' || req.query.stage === '2' ? req.query.stage : null;
	// const challengeType = req.query.type;
	//rating like or dislike
	const challengeRating = req.query.rating;
	const challengeId = req.query.challengeId;
	// const hasOnlyOneQParam = Object.keys(req.query).length === 1;

	if (challengeRating && challengeId) {
		try {
			const rating = challengeRating === 'likes' ? 'likes' : 'dislikes';
			const ratingKey = `stage_3.$.rating.${rating}`;
			await DesafiosComunidade.find({ 'stage_3.id': challengeId},  {_id: 0, 'stage_3.$': 1}, (err, suc) => {
			// await DesafiosComunidade.find({'stage_3.id': challengeId}, (err, suc) => {
				if (suc) {
					console.log(suc[0].stage_3[0]);
					// console.log(suc[0].stage_3[0].toObject());
				}
			});
			// console.log(find); 
			await DesafiosComunidade.findOneAndUpdate({'stage_3.id': challengeId}, {$inc: {[ratingKey]: 1}}, { upsert: true });
			const receivedChallenges = await DesafiosComunidade.find({});
			return res.send(receivedChallenges);
		} catch(err) {
			return res.status(400).send(err);
		}
	}
	// const challengeType = `stage_${challengeStage}`;
	// const sumOfChallengesByType = `stage_${challengeStage}_total`;
	// let sumOfChallengesByTypeObj = {[sumOfChallengesByType]: 1};

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
s
});



app.post('/todos', authenticate, (req, res) => {
	const todo = new Todo({
		text: req.body.text,
		_creator: req.user._id
	});
	todo.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/todos', authenticate, (req, res) => {
	Todo.find({
		_creator: req.user._id
	}).then((todos) => {
		res.send({todos});
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/todos/:id', authenticate, (req, res) => {
	const id = req.params.id;
	if (!ObjectID.isValid(id)){
		return res.status(404).send();
	}

	Todo.findOne({
		_id: id,
		_creator: req.user._id
	}).then((todo) => {
		if (!todo) {
			return res.status(404).send();
		}
		res.send({todo});
	}).catch((e) => {
		res.status(400).send();
	});
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

app.get('/users/me', authenticate, async (req, res) => {
	// try {
	// 	const id = '5bb2ddb4c6fa840a7326a5bb';
	// 	const td = await Todo.findOne({
	// 		_id: id,
	// 		_creator: '5bb2dc88c6fa840a7326a5b9'
	// 	}).then((todo) => {
	// 		if (!todo) {
	// 			return res.status(404).send();
	// 		}
	// 		res.send({todo});
	// 	}).catch((e) => {
	// 		console.log(e);
	// 		res.status(400).send();
	// 	});
		
	// 	res.send(td);
	// } catch(e) {
	// 	console.log(e);
	// }
	res.send(req.user);
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