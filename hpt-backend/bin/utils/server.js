"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _express = _interopRequireDefault(require("express"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _swaggerRoutesExpress = require("swagger-routes-express");

var _yamljs = _interopRequireDefault(require("yamljs"));

var OpenApiValidator = _interopRequireWildcard(require("express-openapi-validator"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var api = _interopRequireWildcard(require("../api/controllers"));

var db = _interopRequireWildcard(require("../db/db"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import { Express } from 'express-serve-static-core';
db.connect().then(function () {
  return console.log('MongoDB connected');
})["catch"](function (error) {
  return console.log(error);
});
var yamlSpecFile = './bin/api/apiv1.yaml';

var apiDefinition = _yamljs["default"].load(yamlSpecFile);

var apiSummary = (0, _swaggerRoutesExpress.summarise)(apiDefinition);
console.info(apiSummary);
var server = (0, _express["default"])();
server.use((0, _morgan["default"])('dev'));
server.use(_express["default"].urlencoded({
  extended: true
}));
server.use(_express["default"].json());
server.use((0, _cors["default"])());
var validatorOptions = {
  coerceTypes: false,
  apiSpec: yamlSpecFile,
  validateRequests: true,
  validateResponses: false
};
server.use('/v1/api-docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(apiDefinition, {
  explorer: false
}));
server.use(OpenApiValidator.middleware(validatorOptions));
server.use(function (err, req, res, next) {
  res.status(err.status).json({
    error: {
      type: 'request_validation',
      message: err.message,
      errors: err.errors
    }
  });
}); // error customization, if request is invalid

server.use(function (err, req, res, next) {
  res.status(err.status).json({
    error: {
      type: 'request_validation',
      message: err.message,
      errors: err.errors
    }
  });
});
var connect = (0, _swaggerRoutesExpress.connector)(api, apiDefinition, {
  onCreateRoute: function onCreateRoute(method, descriptor) {
    console.log("Method ".concat(method, " of endpoint ").concat(descriptor[0], " linked to ").concat(descriptor[1].name));
  }
});
connect(server);
module.exports = server;