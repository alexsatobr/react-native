"use strict";

var _require = require('mongodb'),
    ObjectID = _require.ObjectID;

var jwt = require('jsonwebtoken');

var _require2 = require('./../../models/todo'),
    Todo = _require2.Todo;

var _require3 = require('./../../models/user'),
    User = _require3.User;

var userOneId = new ObjectID();
var userTwoId = new ObjectID();
var users = [{
  _id: userOneId,
  email: 'alex@example.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({
      _id: userOneId,
      access: 'auth'
    }, process.env.JWT_SECRET).toString()
  }]
}, {
  _id: userTwoId,
  email: 'jen@example.com',
  password: 'userTwoPass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({
      _id: userTwoId,
      access: 'auth'
    }, process.env.JWT_SECRET).toString()
  }]
}];
var todos = [{
  _id: new ObjectID(),
  text: 'First test todo',
  _creator: userOneId
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333,
  _creator: userTwoId
}];

var populateTodos = function populateTodos(done) {
  Todo.remove({}).then(function () {
    return Todo.insertMany(todos);
  }).then(function () {
    done();
  });
};

var populateUsers = function populateUsers(done) {
  User.remove({}).then(function () {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();
    return Promise.all([userOne, userTwo]);
  }).then(function () {
    return done();
  });
};

module.exports = {
  todos: todos,
  populateTodos: populateTodos,
  users: users,
  populateUsers: populateUsers
};
//# sourceMappingURL=seed.js.map