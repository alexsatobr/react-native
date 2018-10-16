"use strict";

require("./config/config");

var _lodash = _interopRequireDefault(require("lodash"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongodb = require("mongodb");

var _mongoose = require("./db/mongoose");

var _todo = require("./models/todo");

var _user = require("./models/user");

var _desafios = require("./models/desafios");

var _authenticate = require("./middleware/authenticate");

require("babel-polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var app = (0, _express.default)();
var port = process.env.PORT || 3000;
app.use(_bodyParser.default.json());
app.post('/desafios_gerais/list/:num/', function (req, res) {
  var desafios;

  if (req.params === null) {
    console.log('no params');
  }

  if (req.params.num === '1') {
    desafios = new _desafios.Desafios({
      fase_1: req.body.desafio
    });
  } else if (req.params.num === '2') {
    desafios = new _desafios.Desafios({
      fase_2: req.body.desafio
    });
  }

  desafios.save().then(function (doc) {
    res.send(doc);
  }, function (e) {
    res.status(400).send(e);
  });
});
app.post('/todos', _authenticate.authenticate, function (req, res) {
  var todo = new _todo.Todo({
    text: req.body.text,
    _creator: req.user._id
  });
  todo.save().then(function (doc) {
    res.send(doc);
  }, function (e) {
    res.status(400).send(e);
  });
});
app.get('/todos', _authenticate.authenticate, function (req, res) {
  _todo.Todo.find({
    _creator: req.user._id
  }).then(function (todos) {
    res.send({
      todos: todos
    });
  }, function (e) {
    res.status(400).send(e);
  });
});
app.get('/todos/:id', _authenticate.authenticate, function (req, res) {
  var id = req.params.id;

  if (!_mongodb.ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  _todo.Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then(function (todo) {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({
      todo: todo
    });
  }).catch(function (e) {
    res.status(400).send();
  });
});
app.delete('/todos/:id', _authenticate.authenticate,
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var id, todo;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = req.params.id;

            if (_mongodb.ObjectID.isValid(id)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(404).send());

          case 3:
            _context.prev = 3;
            _context.next = 6;
            return _todo.Todo.findOneAndRemove({
              _id: id,
              _creator: req.user._id
            });

          case 6:
            todo = _context.sent;

            if (todo) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", res.status(404).send());

          case 9:
            res.send({
              todo: todo
            });
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](3);
            res.status(400).send();

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[3, 12]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
app.patch('/todos/:id', _authenticate.authenticate, function (req, res) {
  var id = req.params.id;

  var body = _lodash.default.pick(req.body, ['text', 'completed']);

  if (!_mongodb.ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_lodash.default.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  _todo.Todo.findOneAndUpdate({
    _id: id,
    _creator: req.user._id
  }, {
    $set: body
  }, {
    new: true
  }).then(function (todo) {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({
      todo: todo
    });
  }).catch(function (e) {
    res.status(404).send();
  });
});
app.post('/users',
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var body, user, token;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            body = _lodash.default.pick(req.body, ['email', 'password']);
            user = new _user.User(body);
            _context2.next = 5;
            return user.save();

          case 5:
            _context2.next = 7;
            return user.generateAuthToken();

          case 7:
            token = _context2.sent;
            res.header('x-auth', token).send(user);
            _context2.next = 14;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);
            res.status(400).send(_context2.t0);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 11]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
app.get('/users/me', _authenticate.authenticate,
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
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

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
app.post('/users/login',
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var body, user, token;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            body = _lodash.default.pick(req.body, ['email', 'password']);
            _context4.next = 4;
            return _user.User.findByCredentials(body.email, body.password);

          case 4:
            user = _context4.sent;
            _context4.next = 7;
            return user.generateAuthToken();

          case 7:
            token = _context4.sent;
            res.header('x-auth', token).send(user);
            _context4.next = 14;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](0);
            res.status(400).send();

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this, [[0, 11]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
app.delete('/users/me/token', _authenticate.authenticate,
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return req.user.removeToken(req.token);

          case 3:
            res.status(200).send();
            _context5.next = 9;
            break;

          case 6:
            _context5.prev = 6;
            _context5.t0 = _context5["catch"](0);
            res.status(400).send();

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this, [[0, 6]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
app.listen(port, function () {
  console.log("Started on port ".concat(port));
});
module.exports = {
  app: app
};
//# sourceMappingURL=server.js.map