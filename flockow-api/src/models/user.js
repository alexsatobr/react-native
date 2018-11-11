import mongoose from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import bcrypt from 'bcryptjs';


const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email'
		}
	},
	displayName: String,
	fullname: String,
	avatar: String,
	providerData: {
		uid: String,
		provider: String,
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}],
	createdAt: Number,
	completed_challenges: {
		Sum: Number,
		A: Number,
		B: Number,
		C: Number
	},
	created_challenges: {
		Sum: Number,
		C: Number
	},
	created_challenge_list: [{
		id: Number,
		description: String,
		createdAt: Number
	}],
	stage_1_completed_list: [{
		id: Number,
		description: String,
		createdAt: Number
	}],
	stage_2_completed_list: [{
		id: Number,
		description: String,
		createdAt: Number
	}],
	stage_3_completed_list: [{
		id: Number,
		description: String,
		createdAt: Number
	}],
	badges: [{
		id: Number,
		description: String,
		createdAt: String
	}]
});

UserSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();

	return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
	const user = this;
	const access = 'auth';
	let token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();
	// user.tokens = user.tokens.concat([{access, token}]);
	user.tokens.push({access, token});
	
	return user.save().then(() => {
		return token;
	});
};

UserSchema.methods.removeToken = function (token) {
	const user = this;
	return user.update({
		$pull: {
			tokens: {
				token
			}
		}
	});
};

UserSchema.statics.findByToken = function (token) {
	const User = this;
	let decoded;

	try {
		decoded = jwt.verify(token, process.env.JWT_SECRET);
	} catch (e) {
		return Promise.reject();
	}
	// console.log(decoded);
	return User.findOne({
		'_id': decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	});
};

UserSchema.statics.findByCredentials = function (email, password) {
	const User = this;
	return User.findOne({email}).then((user) => {
		if (!user) {
			return Promise.reject();
		}
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, res) => {
				if (res) {
					resolve(user);
				} else {
					reject();
				}
			});
		});
	});
};

UserSchema.pre('save', function (next) {
	const user = this;

	if (user.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});

const User = mongoose.model('User', UserSchema);

module.exports = {User};