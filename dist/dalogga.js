(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["dalogga"] = factory();
	else
		root["dalogga"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.prefixes = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.createLogger = createLogger;

	var _levels = __webpack_require__(1);

	var _levels2 = _interopRequireDefault(_levels);

	var _getInitialState = __webpack_require__(2);

	var _getInitialState2 = _interopRequireDefault(_getInitialState);

	var _logMessages = __webpack_require__(6);

	var _logMessages2 = _interopRequireDefault(_logMessages);

	var _levelPrefix = __webpack_require__(5);

	var _levelPrefix2 = _interopRequireDefault(_levelPrefix);

	var _timestampPrefix = __webpack_require__(3);

	var _timestampPrefix2 = _interopRequireDefault(_timestampPrefix);

	var _colours = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function createLogger(settings) {
	  var state = (0, _getInitialState2.default)(settings || {});

	  return _levels2.default.reduce(function (acc, level, index) {
	    return _extends({}, acc, _defineProperty({}, level, (0, _colours.colourify)(_logMessages2.default.bind(undefined, state, index))));
	  }, {
	    getLevel: function getLevel() {
	      return _levels2.default[state.currentLevel];
	    },
	    setLevel: function setLevel(level) {
	      state.currentLevel = (0, _levels.getLevelNumber)(level);
	    },
	    disable: function disable() {
	      state.isEnabled = false;
	    },
	    enable: function enable() {
	      state.isEnabled = true;
	    }
	  });
	}

	var prefixes = exports.prefixes = {
	  levelPrefix: _levelPrefix2.default,
	  timestampPrefix: _timestampPrefix2.default
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getLevelNumber = getLevelNumber;
	var levels = ['trace', 'debug', 'log', 'info', 'warn', 'error', 'fatal'];

	exports.default = levels;
	function getLevelNumber(levelNameOrNumber) {
	  var parsedLevelNumber = parseInt(levelNameOrNumber, 10);
	  var levelNumber = isNaN(parsedLevelNumber) ? levels.indexOf(levelNameOrNumber) : levelNameOrNumber;
	  if (levelNumber >= 0 && levelNumber < levels.length) {
	    return levelNumber;
	  }
	  throw new Error('Invalid level: ' + levelNameOrNumber);
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getInitialState;

	var _levels = __webpack_require__(1);

	var _levels2 = _interopRequireDefault(_levels);

	var _timestampPrefix = __webpack_require__(3);

	var _timestampPrefix2 = _interopRequireDefault(_timestampPrefix);

	var _levelPrefix = __webpack_require__(5);

	var _levelPrefix2 = _interopRequireDefault(_levelPrefix);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getLogFunctionArray(settings) {
	  if (typeof settings.logFunction === 'function') {
	    return _levels2.default.map(function () {
	      return settings.logFunction;
	    });
	  }

	  var consoleObj = console || {};

	  var defaultLogFnArr = ['log'].concat(_levels2.default).reduce(function (logFnArr, level, index) {
	    var consoleMethod = consoleObj[level];
	    return logFnArr.concat(consoleMethod ? consoleMethod.bind(consoleObj) : logFnArr[index - 1]);
	  }, []).slice(1);

	  var customLogFnObj = settings.logFunction || {};

	  return _levels2.default.map(function (level, index) {
	    return customLogFnObj[index] || customLogFnObj[level] || defaultLogFnArr[index];
	  });
	}

	function getInitialState(settings) {
	  var logFunction = getLogFunctionArray(settings);

	  var useColours = typeof settings.useColours === 'boolean' ? settings.useColours : !settings.logFunction && typeof process !== 'undefined' && (process.stdout || {}).isTTY;

	  var isEnabled = settings.isEnabled !== false;
	  var currentLevel = (0, _levels.getLevelNumber)(settings.currentLevel || 0);

	  var prefixes = [].concat(settings.prefixes || [_timestampPrefix2.default, _levelPrefix2.default, '-']);

	  return {
	    logFunction: logFunction,
	    prefixes: prefixes,
	    isEnabled: isEnabled,
	    currentLevel: currentLevel,
	    useColours: useColours
	  };
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _colours = __webpack_require__(4);

	function timestampPrefix(colour) {
	  return {
	    text: new Date().toISOString(),
	    colour: colour || 'cyan'
	  };
	}

	exports.default = (0, _colours.colourify)(timestampPrefix);

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.getColouredMessage = getColouredMessage;
	exports.colourify = colourify;

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var resetString = '\x1b[0m';

	var colourStrings = {
	  black: '\x1b[30m',
	  red: '\x1b[31m',
	  green: '\x1b[32m',
	  yellow: '\x1b[33m',
	  blue: '\x1b[34m',
	  magenta: '\x1b[35m',
	  cyan: '\x1b[36m',
	  white: '\x1b[37m'
	};

	var colours = Object.keys(colourStrings);

	exports.default = colours;
	function getColouredMessage(colour, message) {
	  var colourString = colourStrings[colour];
	  if (!colourString || !message) {
	    return message;
	  }
	  return '' + colourString + message + resetString;
	}

	function colourify(fn) {
	  return Object.assign(fn.bind(undefined, undefined), colours.reduce(function (obj, colour) {
	    return _extends({}, obj, _defineProperty({}, colour, fn.bind(undefined, colour)));
	  }, {}));
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _colours = __webpack_require__(4);

	var colorMap = {
	  trace: 'cyan',
	  debug: 'cyan',
	  log: 'green',
	  info: 'blue',
	  warn: 'yellow',
	  error: 'magenta',
	  fatal: 'red'
	};

	function levelPrefix(colour, levelName) {
	  return {
	    text: '[' + levelName.toUpperCase() + ']',
	    colour: colour || colorMap[levelName]
	  };
	}

	exports.default = (0, _colours.colourify)(levelPrefix);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.default = logMessages;

	var _levels = __webpack_require__(1);

	var _levels2 = _interopRequireDefault(_levels);

	var _colours = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function getMessageValue(message, state, level, messages) {
	  var messageValue = typeof message === 'function' ? message(_levels2.default[level], messages) : message;

	  if (!messageValue || !messageValue.text) {
	    return messageValue;
	  }
	  if (!messageValue.colour || !state.useColours) {
	    return messageValue.text;
	  }
	  return (0, _colours.getColouredMessage)(messageValue.colour, messageValue.text);
	}

	function logMessages(state, level, colour) {
	  for (var _len = arguments.length, messages = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
	    messages[_key - 3] = arguments[_key];
	  }

	  var formattedMessages = messages.map(function (item) {
	    if (item && (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && Object.keys(item).length > 0) {
	      var json = JSON.stringify(item, null, 2);
	      return state.useColours ? (0, _colours.getColouredMessage)(colour, json) : json;
	    }
	    return state.useColours ? (0, _colours.getColouredMessage)(colour, item) : item;
	  });

	  if (state.isEnabled && state.currentLevel <= level) {
	    var _state$logFunction;

	    var prefixValues = state.prefixes.map(function (prefixItem) {
	      return getMessageValue(prefixItem, state, level, messages);
	    });

	    (_state$logFunction = state.logFunction)[level].apply(_state$logFunction, _toConsumableArray(prefixValues.concat(formattedMessages)));
	  }

	  return formattedMessages.join(' ');
	}

/***/ }
/******/ ])
});
;