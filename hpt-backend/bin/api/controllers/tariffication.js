"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTariffication = getTariffication;
exports.createTariffication = createTariffication;
exports.getSingleTariffication = getSingleTariffication;
exports.deleteTariffication = deleteTariffication;

var mongoose = _interopRequireWildcard(require("mongoose"));

var uuid = _interopRequireWildcard(require("uuid"));

var _tarifficationRecord = require("../../db/models/tarifficationRecord");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TarifficationRecord = mongoose.model('TarifficationRecord', _tarifficationRecord.TarifficationRecordSchema);

function getTariffication(req, res) {
  var _req$query = req.query,
      column = _req$query.column,
      order = _req$query.order,
      _req$query$current = _req$query.current,
      current = _req$query$current === void 0 ? 1 : _req$query$current,
      _req$query$pageSize = _req$query.pageSize,
      pageSize = _req$query$pageSize === void 0 ? 1 : _req$query$pageSize,
      dateStart = _req$query.dateStart,
      dateEnd = _req$query.dateEnd,
      subscriber = _req$query.subscriber,
      external = _req$query.external,
      direction = _req$query.direction,
      searchExactSubscriber = _req$query.searchExactSubscriber,
      searchExactExternal = _req$query.searchExactExternal;
  var pageNumber = +current;
  var limit = +pageSize;

  var filter = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, subscriber && {
    subscriber: searchExactSubscriber ? subscriber : {
      $regex: subscriber,
      $options: 'i'
    }
  }), (dateStart || dateEnd) && {
    dateTime: _objectSpread(_objectSpread({}, dateStart && {
      $gte: dateStart
    }), dateEnd && {
      $lt: dateEnd
    })
  }), external && {
    external: searchExactExternal ? external : {
      $regex: external,
      $options: 'i'
    }
  }), direction && {
    direction: direction
  });

  TarifficationRecord.find(filter).sort(_objectSpread(_objectSpread({}, order === 'ascend' && _defineProperty({}, String(column), 1)), order === 'descend' && _defineProperty({}, String(column), -1))).collation({
    locale: 'en_US',
    numericOrdering: true
  }).limit(limit * 1).skip((pageNumber - 1) * limit).then( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(records) {
      var count;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return TarifficationRecord.countDocuments(filter);

            case 2:
              count = _context.sent;
              res.json({
                resultCode: 0,
                records: records,
                pagination: {
                  currentPage: pageNumber,
                  total: count,
                  totalPages: Math.ceil(count / limit)
                }
              });

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref3.apply(this, arguments);
    };
  }())["catch"](function (err) {
    res.json({
      resultCode: 1,
      message: err.message
    });
  });
}

function createTariffication(req, res) {
  var newRecord = new TarifficationRecord(req.body);
  newRecord._id = String(uuid.v4());
  newRecord.save().then(function (record) {
    res.json({
      resultCode: 0,
      id: String(record._id)
    });
  })["catch"](function (err) {
    res.json({
      resultCode: 1,
      message: err.message
    });
  });
}

function getSingleTariffication(req, res) {
  TarifficationRecord.find({
    _id: req.params.id
  }).then(function (record) {
    res.json({
      resultCode: 0,
      tariffication: record
    });
  })["catch"](function (err) {
    res.json({
      resultCode: 1,
      message: err.message
    });
  });
}

function deleteTariffication(req, res) {
  TarifficationRecord.deleteOne({
    _id: req.params.id
  }).then(function (result) {
    if (result.n === 0) {
      res.json({
        resultCode: 1,
        message: 'Document not found'
      });
    }

    res.json({
      resultCode: 0
    });
  })["catch"](function (err) {
    res.json({
      resultCode: 1,
      message: err.message
    });
  });
}