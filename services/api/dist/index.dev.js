"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.applicationCreate = exports.loanSearch = exports.getState = exports.getPropertyUse = exports.getPropertyType = exports.getPromotionCode = exports.getMaritalStatus = exports.getLoanRefinanceType = exports.getLoanPurpose = exports.getLoanProgram = exports.getLoanDocType = exports.getCreditRating = exports.authenticate = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var apiUrl = process.env.apiEndpont || 'https://development.raterabbit.com:8181/RateRabbit/webapi'; // const instance = axios.create({
//   baseURL: apiUrl
// })

var axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': null
  }
};
var authPayload = {
  'userName': process.env.apiUsername,
  'password': process.env.apiPassword,
  'grantType': 'PASSWORD'
};

var handleError = function handleError(error) {
  var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (payload) {
      console.log('Payload\n', payload);
    }

    console.log('Error response');
    console.log(error.response.status);
    console.log(error.response.data);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser
    // and an instance of http.ClientRequest in node.js
    console.log('Error request');
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error message', error.message);
  }

  console.log('Error config', error.config);
  return error;
}; // Default returns if API error


var defaults = {
  loanPurpose: [{
    name: 'Purchase'
  }, {
    name: 'Refinance'
  }, {
    name: 'Refinance Cash Out'
  }],
  maritalStatus: [{
    name: 'Married'
  }, {
    name: 'Single'
  }],
  state: [{
    name: 'Arizona',
    active: true
  }, {
    name: 'California',
    active: true
  }, {
    name: 'Idaho',
    active: true
  }, {
    name: 'Massachusetts',
    active: true
  }]
};

var authenticate = function authenticate() {
  var _ref, data;

  return regeneratorRuntime.async(function authenticate$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(apiUrl, "/authenticate"), authPayload, axiosConfig).then(function (res) {
            return res;
          })["catch"](function (error) {
            handleError(error, authPayload);
            throw error;
          }));

        case 2:
          _ref = _context.sent;
          data = _ref.data;
          return _context.abrupt("return", data);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.authenticate = authenticate;

var getCreditRating = function getCreditRating(auth) {
  var _ref2, data;

  return regeneratorRuntime.async(function getCreditRating$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          axiosConfig.headers.Authorization = 'Bearer ' + auth.JWT;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(apiUrl, "/creditrating"), axiosConfig).then(function (res) {
            return res;
          })["catch"](function (error) {
            handleError(error);
            throw error;
          }));

        case 3:
          _ref2 = _context2.sent;
          data = _ref2.data;
          return _context2.abrupt("return", data);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getCreditRating = getCreditRating;

var getLoanDocType = function getLoanDocType(auth) {
  var _ref3, data;

  return regeneratorRuntime.async(function getLoanDocType$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          axiosConfig.headers.Authorization = 'Bearer ' + auth.JWT;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(apiUrl, "/loandoctype"), axiosConfig).then(function (res) {
            return res;
          })["catch"](function (error) {
            handleError(error);
            throw error;
          }));

        case 3:
          _ref3 = _context3.sent;
          data = _ref3.data;
          return _context3.abrupt("return", data);

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.getLoanDocType = getLoanDocType;

var getLoanProgram = function getLoanProgram(auth) {
  var _ref4, data;

  return regeneratorRuntime.async(function getLoanProgram$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          axiosConfig.headers.Authorization = 'Bearer ' + auth.JWT;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(apiUrl, "/loanprogram"), axiosConfig).then(function (res) {
            return res;
          })["catch"](function (error) {
            handleError(error);
            throw error;
          }));

        case 3:
          _ref4 = _context4.sent;
          data = _ref4.data;
          return _context4.abrupt("return", data);

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.getLoanProgram = getLoanProgram;

var getLoanPurpose = function getLoanPurpose(auth) {
  var _ref5, data;

  return regeneratorRuntime.async(function getLoanPurpose$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          axiosConfig.headers.Authorization = 'Bearer ' + auth.JWT;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(apiUrl, "/loanpurpose"), axiosConfig).then(function (res) {
            return res;
          })["catch"](function (error) {
            handleError(error); // throw error

            return defaults.loanPurpose;
          }));

        case 3:
          _ref5 = _context5.sent;
          data = _ref5.data;
          return _context5.abrupt("return", data);

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.getLoanPurpose = getLoanPurpose;

var getLoanRefinanceType = function getLoanRefinanceType(auth) {
  var _ref6, data;

  return regeneratorRuntime.async(function getLoanRefinanceType$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          axiosConfig.headers.Authorization = 'Bearer ' + auth.JWT;
          _context6.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(apiUrl, "/loanrefinancetype"), axiosConfig).then(function (res) {
            return res;
          })["catch"](function (error) {
            handleError(error);
            throw error;
          }));

        case 3:
          _ref6 = _context6.sent;
          data = _ref6.data;
          return _context6.abrupt("return", data);

        case 6:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports.getLoanRefinanceType = getLoanRefinanceType;

var getMaritalStatus = function getMaritalStatus(auth) {
  var _ref7, data;

  return regeneratorRuntime.async(function getMaritalStatus$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          axiosConfig.headers.Authorization = 'Bearer ' + auth.JWT;
          _context7.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(apiUrl, "/maritalstatus"), axiosConfig).then(function (res) {
            return res;
          })["catch"](function (error) {
            handleError(error); // throw error

            return defaults.maritalStatus;
          }));

        case 3:
          _ref7 = _context7.sent;
          data = _ref7.data;
          return _context7.abrupt("return", data);

        case 6:
        case "end":
          return _context7.stop();
      }
    }
  });
};

exports.getMaritalStatus = getMaritalStatus;

var getPromotionCode = function getPromotionCode(auth) {
  var _ref8, data;

  return regeneratorRuntime.async(function getPromotionCode$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          axiosConfig.headers.Authorization = 'Bearer ' + auth.JWT;
          _context8.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(apiUrl, "/promotioncode"), axiosConfig).then(function (res) {
            return res;
          })["catch"](function (error) {
            handleError(error); // throw error
          }));

        case 3:
          _ref8 = _context8.sent;
          data = _ref8.data;
          return _context8.abrupt("return", data);

        case 6:
        case "end":
          return _context8.stop();
      }
    }
  });
};

exports.getPromotionCode = getPromotionCode;

var getPropertyType = function getPropertyType(auth) {
  var _ref9, data;

  return regeneratorRuntime.async(function getPropertyType$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          axiosConfig.headers.Authorization = 'Bearer ' + auth.JWT;
          _context9.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(apiUrl, "/propertytype"), axiosConfig).then(function (res) {
            return res;
          })["catch"](function (error) {
            handleError(error);
            throw error;
          }));

        case 3:
          _ref9 = _context9.sent;
          data = _ref9.data;
          return _context9.abrupt("return", data);

        case 6:
        case "end":
          return _context9.stop();
      }
    }
  });
};

exports.getPropertyType = getPropertyType;

var getPropertyUse = function getPropertyUse(auth) {
  var _ref10, data;

  return regeneratorRuntime.async(function getPropertyUse$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          axiosConfig.headers.Authorization = 'Bearer ' + auth.JWT;
          _context10.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(apiUrl, "/propertyuse"), axiosConfig).then(function (res) {
            return res;
          })["catch"](function (error) {
            handleError(error);
            throw error;
          }));

        case 3:
          _ref10 = _context10.sent;
          data = _ref10.data;
          return _context10.abrupt("return", data);

        case 6:
        case "end":
          return _context10.stop();
      }
    }
  });
};

exports.getPropertyUse = getPropertyUse;

var getState = function getState(auth) {
  var _ref11, data;

  return regeneratorRuntime.async(function getState$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          axiosConfig.headers.Authorization = 'Bearer ' + auth.JWT;
          _context11.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(apiUrl, "/state"), axiosConfig).then(function (res) {
            return res;
          })["catch"](function (error) {
            handleError(error); // throw error

            return defaults.state;
          }));

        case 3:
          _ref11 = _context11.sent;
          data = _ref11.data;
          return _context11.abrupt("return", data.filter(function (state) {
            return state.active;
          }));

        case 6:
        case "end":
          return _context11.stop();
      }
    }
  });
};

exports.getState = getState;

var loanSearch = function loanSearch(auth, payload) {
  var _ref12, data;

  return regeneratorRuntime.async(function loanSearch$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          axiosConfig.headers.Authorization = 'Bearer ' + auth.JWT;
          _context12.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(apiUrl, "/loansearch"), payload, axiosConfig).then(function (res) {
            return res;
          })["catch"](function (error) {
            handleError(error);
            throw error;
          }));

        case 3:
          _ref12 = _context12.sent;
          data = _ref12.data;
          return _context12.abrupt("return", data);

        case 6:
        case "end":
          return _context12.stop();
      }
    }
  });
};

exports.loanSearch = loanSearch;

var applicationCreate = function applicationCreate(auth, payload) {
  var _ref13, data;

  return regeneratorRuntime.async(function applicationCreate$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          axiosConfig.headers.Authorization = 'Bearer ' + auth.JWT;
          _context13.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(apiUrl, "/application/create"), payload, axiosConfig).then(function (res) {
            return res;
          })["catch"](function (error) {
            handleError(error);
            throw error;
          }));

        case 3:
          _ref13 = _context13.sent;
          data = _ref13.data;
          return _context13.abrupt("return", data);

        case 6:
        case "end":
          return _context13.stop();
      }
    }
  });
};

exports.applicationCreate = applicationCreate;
var _default = authenticate;
exports["default"] = _default;