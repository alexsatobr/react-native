"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var expect = require('expect');

var request = require('supertest');

var _require = require('mongodb'),
    ObjectID = _require.ObjectID;

var _require2 = require('./../server'),
    app = _require2.app;

var _require3 = require('./../models/todo'),
    Todo = _require3.Todo;

var _require4 = require('./../models/user'),
    User = _require4.User;

var _require5 = require('./seed/seed'),
    todos = _require5.todos,
    populateTodos = _require5.populateTodos,
    users = _require5.users,
    populateUsers = _require5.populateUsers;

beforeEach(populateUsers);
beforeEach(populateTodos);
describe('POST /todos', function () {
  it('should create a new todo', function (done) {
    var text = 'Test todo text';
    request(app).post('/todos').set('x-auth', users[0].tokens[0].token).send({
      text: text
    }).expect(200).expect(function (res) {
      expect(res.body.text).toBe(text);
    }).end(function (err, res) {
      if (err) {
        return done(err);
      }

      Todo.find({
        text: text
      }).then(function (todos) {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch(function (e) {
        return done(e);
      });
    });
  });
  it('should not create todo with invalid body data', function (done) {
    request(app).post('/todos').set('x-auth', users[0].tokens[0].token).send({}).expect(400).end(function (err, res) {
      if (err) {
        return done(err);
      }

      Todo.find().then(function (todos) {
        expect(todos.length).toBe(2);
        done();
      }).catch(function (e) {
        return done(e);
      });
    });
  });
});
describe('GET /todos', function () {
  it('should get all todos', function (done) {
    request(app).get('/todos').set('x-auth', users[0].tokens[0].token).expect(200).expect(function (res) {
      expect(res.body.todos.length).toBe(1);
    }).end(done);
  });
});
describe('GET /todos/:id', function () {
  it('should return todo doc', function (done) {
    request(app).get("/todos/".concat(todos[0]._id.toHexString())).set('x-auth', users[0].tokens[0].token).expect(200).expect(function (res) {
      expect(res.body.todo.text).toBe(todos[0].text);
    }).end(done);
  });
  it('should not return todo doc created by other user', function (done) {
    request(app).get("/todos/".concat(todos[1]._id.toHexString())).set('x-auth', users[0].tokens[0].token).expect(404).end(done);
  });
  it('should return 404 if todo not found', function (done) {
    var hexId = new ObjectID().toHexString();
    request(app).get("/todos/".concat(hexId)).set('x-auth', users[0].tokens[0].token).expect(404).end(done);
  });
  it('should return 404 for non-object ids', function (done) {
    request(app).get('/todos/123abc').set('x-auth', users[0].tokens[0].token).expect(404).end(done);
  });
});
describe('DELETE /todos/:id', function () {
  it('should remove a todo', function (done) {
    var hexId = todos[1]._id.toHexString();

    request(app).delete("/todos/".concat(hexId)).set('x-auth', users[1].tokens[0].token).expect(200).expect(function (res) {
      expect(res.body.todo._id).toBe(hexId);
    }).end(function (err, res) {
      if (err) {
        return done(err);
      }

      Todo.findById(hexId).then(function (todo) {
        expect(todo).toBeFalsy();
        done();
      }).catch(function (e) {
        return done(e);
      });
    });
  });
  it('should remove a todo', function (done) {
    var hexId = todos[0]._id.toHexString();

    request(app).delete("/todos/".concat(hexId)).set('x-auth', users[1].tokens[0].token).expect(404).end(function (err, res) {
      if (err) {
        return done(err);
      }

      Todo.findById(hexId).then(function (todo) {
        expect(todo).toBeTruthy();
        done();
      }).catch(function (e) {
        return done(e);
      });
    });
  });
  it('should return 404 if todo not found', function (done) {
    var hexId = new ObjectID().toHexString();
    request(app).get("/todos/".concat(hexId)).set('x-auth', users[1].tokens[0].token).expect(404).end(done);
  });
  it('should return 404 for object id is invalid', function (done) {
    request(app).delete('/todos/123abc').set('x-auth', users[1].tokens[0].token).expect(404).end(done);
  });
});
describe('PATCH /todos/:id', function () {
  it('should update the todo', function (done) {
    var hexId = todos[0]._id.toHexString();

    var text = 'This should be the new text';
    request(app).patch("/todos/".concat(hexId)).set('x-auth', users[0].tokens[0].token).send({
      completed: true,
      text: text
    }).expect(200).expect(function (res) {
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completed).toBe(true);
      expect(_typeof(res.body.todo.completedAt)).toBe('number');
    }).end(done);
  });
  it('should not update the todo created by other user', function (done) {
    var hexId = todos[0]._id.toHexString();

    var text = 'This should be the new text';
    request(app).patch("/todos/".concat(hexId)).set('x-auth', users[1].tokens[0].token).send({
      completed: true,
      text: text
    }).expect(404).end(done);
  });
  it('should clear completedAt when todo is not completed', function (done) {
    var hexId = todos[1]._id.toHexString();

    var text = 'This should be the new text!!';
    request(app).patch("/todos/".concat(hexId)).set('x-auth', users[1].tokens[0].token).send({
      completed: false,
      text: text
    }).expect(200).expect(function (res) {
      expect(res.body.todo.text).toBe(text);
      ;
      expect(res.body.todo.completed).toBe(false);
      expect(res.body.todo.completedAt).toBeFalsy();
    }).end(done);
  });
});
describe('GET /users/me', function (done) {
  it('should return user if authenticated', function (done) {
    request(app).get('/users/me').set('x-auth', users[0].tokens[0].token).expect(200).expect(function (res) {
      expect(res.body._id).toBe(users[0]._id.toHexString());
      expect(res.body.email).toBe(users[0].email);
    }).end(done);
  });
  it('should return 401 if not authenticated', function (done) {
    request(app).get('/users/me').expect(401).expect(function (res) {
      expect(res.body).toEqual({});
    }).end(done);
  });
});
describe('POST /users', function (done) {
  it('should create a user', function (done) {
    var email = 'example@example.com';
    var password = '123mnb!';
    request(app).post('/users').send({
      email: email,
      password: password
    }).expect(200).expect(function (res) {
      expect(res.headers['x-auth']).toBeTruthy();
      expect(res.body._id).toBeTruthy();
      expect(res.body.email).toBe(email);
    }).end(function (err) {
      if (err) {
        return done(err);
      }

      User.findOne({
        email: email
      }).then(function (user) {
        expect(user).toBeTruthy();
        expect(user.password).not.toBe(password);
        done();
      }).catch(function (e) {
        return done(e);
      });
    });
  });
  it('should return validation errors if request invalid', function (done) {
    request(app).post('/users').send({
      email: 'ale',
      password: '123'
    }).expect(400).end(done);
  });
  it('should not create user if email in use', function (done) {
    request(app).post('/users').send({
      email: users[0].email,
      password: 'Password123!'
    }).expect(400).end(done);
  });
});
describe('POST /users/login', function () {
  it('should login user and return auth token', function (done) {
    request(app).post('/users/login').send({
      email: users[1].email,
      password: users[1].password
    }).expect(200).expect(function (res) {
      expect(res.headers['x-auth']).toBeTruthy();
    }).end(function (err, res) {
      if (err) {
        return done(err);
      }

      User.findById(users[1]._id).then(function (user) {
        expect(user.toObject().tokens[1]).toMatchObject({
          access: 'auth',
          token: res.headers['x-auth']
        });
        done();
      }).catch(function (e) {
        return done(e);
      });
    });
  });
  it('should reject invalid login ', function (done) {
    request(app).post('/users/login').send({
      email: users[1].email,
      password: users[1].password + '1'
    }).expect(400).expect(function (res) {
      expect(res.headers['x-auth']).toBeFalsy();
    }).end(function (err, res) {
      if (err) {
        return done(err);
      }

      User.findById(users[1]._id).then(function (user) {
        expect(user.tokens.length).toBe(1);
        done();
      }).catch(function (e) {
        return done(e);
      });
    });
  });
});
describe('DELETE /users/me/token', function () {
  it('should remove auth token on logout', function (done) {
    request(app).delete('/users/me/token').set('x-auth', users[0].tokens[0].token).expect(200).end(function (err, res) {
      if (err) {
        return done(err);
      }

      User.findById(users[0]._id).then(function (user) {
        expect(user.tokens.length).toBe(0);
        done();
      }).catch(function (e) {
        return done(e);
      });
    });
  });
});
//# sourceMappingURL=server.test.js.map