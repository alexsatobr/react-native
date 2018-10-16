"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _validator = _interopRequireDefault(require("validator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _lodash = _interopRequireDefault(require("lodash"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSchema = new _mongoose.default.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: _validator.default.isEmail,
      message: '{VALUE} is not a valid email'
    }
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
  }]
});

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();
  return _lodash.default.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';

  var token = _jsonwebtoken.default.sign({
    _id: user._id.toHexString(),
    access: access
  }, process.env.JWT_SECRET).toString(); // user.tokens = user.tokens.concat([{access, token}]);


  user.tokens.push({
    access: access,
    token: token
  });
  return user.save().then(function () {
    return token;
  });
};

UserSchema.methods.removeToken = function (token) {
  var user = this;
  return user.update({
    $pull: {
      tokens: {
        token: token
      }
    }
  });
};

UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try {
    decoded = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return Promise.reject();
  } // console.log(decoded);


  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function (email, password) {
  var User = this;
  return User.findOne({
    email: email
  }).then(function (user) {
    if (!user) {
      return Promise.reject();
    }

    return new Promise(function (resolve, reject) {
      _bcryptjs.default.compare(password, user.password, function (err, res) {
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
  var user = this;

  if (user.isModified('password')) {
    _bcryptjs.default.genSalt(10, function (err, salt) {
      _bcryptjs.default.hash(user.password, salt, function (err, hash) {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

var User = _mongoose.default.model('User', UserSchema);

module.exports = {
  User: User
};
//# sourceMappingURL=user.js.map