"use strict";

var _user = require("./../models/user");

var authenticate = function authenticate(req, res, next) {
  var token = req.header('x-auth');

  _user.User.findByToken(token).then(function (user) {
    if (!user) {
      return Promise.reject();
    }

    req.user = user;
    req.token = token;
    next();
  }).catch(function (e) {
    res.status(401).send();
  });
};

module.exports = {
  authenticate: authenticate
};
//# sourceMappingURL=authenticate.js.map