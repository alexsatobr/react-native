"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Desafios = _mongoose.default.model('Desafios', {
  fase_1: [{
    id: Number,
    descricao: String,
    interest: String,
    difficult: String,
    createdAt: Number
  }],
  fase_2: [{
    id: Number,
    descricao: String,
    interest: String,
    difficult: String,
    createdAt: Number
  }]
});

module.exports = {
  Desafios: Desafios
};
//# sourceMappingURL=desafios.js.map