/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _iceCream = __webpack_require__(1);

var _vessel = __webpack_require__(2);

$(document).ready(function () {
  console.log(_iceCream.IceCreamBlock);
  console.log(_iceCream.ScoopOfIceCream);
  console.log(_vessel.Cone);
  console.log(_vessel.Cup);
  console.log(_vessel.Tub);
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Scoop of ice cream.
 * Private class, used only by IceCreamBlock.
 */
var ScoopOfIceCream = function ScoopOfIceCream() {
  var flavour = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'vanilla';

  _classCallCheck(this, ScoopOfIceCream);

  this.flavour = flavour;
};

/**
 * Ice cream block
 */


var IceCreamBlock = function () {
  function IceCreamBlock(flavour) {
    _classCallCheck(this, IceCreamBlock);

    this.flavour = this.validateFlavour(flavour) || 'vanilla';
  }

  _createClass(IceCreamBlock, null, [{
    key: 'getNameString',
    value: function getNameString() {
      return 'Ice Cream Block';
    }
  }]);

  return IceCreamBlock;
}();

IceCreamBlock.prototype.nameString = IceCreamBlock.getNameString();
IceCreamBlock.prototype.scoopsLeft = 50;
IceCreamBlock.prototype.validateFlavour = function validateFlavour(flavour) {
  var validFlavours = ['vanilla', 'cookies and cream', 'double chocolate', 'lemon sorbet', 'strawberry', 'rum and raisin'];
  var cleaned = flavour ? flavour.toLowerCase() : null;
  if (validFlavours.includes(cleaned)) return cleaned;
  return false;
};
IceCreamBlock.prototype.scoop = function scoop() {
  if (this.scoopsLeft === 0) return null;
  this.scoopsLeft = this.scoopsLeft - 1;
  return new ScoopOfIceCream(this.flavour);
};
IceCreamBlock.prototype.unscoop = function unscoop() {
  this.scoopsLeft = this.scoopsLeft + 1;
  return true;
};

module.exports = {
  IceCreamBlock: IceCreamBlock,
  ScoopOfIceCream: ScoopOfIceCream
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = __webpack_require__(1),
    ScoopOfIceCream = _require.ScoopOfIceCream;

/**
 * Vessel to hold ScoopOfIceCream.
 */


var Vessel = function () {
  function Vessel() {
    _classCallCheck(this, Vessel);

    this.scoops = [];
  }

  _createClass(Vessel, null, [{
    key: 'getNameString',
    value: function getNameString() {
      return 'Ice Cream Container';
    }
  }]);

  return Vessel;
}();

Vessel.prototype.nameString = Vessel.getNameString();
Vessel.prototype.capacityInScoops = 1;
Vessel.prototype.add = function add(scoop) {
  if (!(scoop instanceof ScoopOfIceCream)) {
    throw new TypeError('you must pass `ScoopOfIceCream` instance into add()');
  }
  if (this.isFull()) throw new Error('container is already full');
  this.scoops.push(scoop);
};
Vessel.prototype.isFull = function isFull() {
  return this.scoops.length === this.capacityInScoops;
};

/**
 * Cone container that extends from Vessel.
 */

var Cone = function (_Vessel) {
  _inherits(Cone, _Vessel);

  function Cone() {
    _classCallCheck(this, Cone);

    return _possibleConstructorReturn(this, (Cone.__proto__ || Object.getPrototypeOf(Cone)).apply(this, arguments));
  }

  _createClass(Cone, null, [{
    key: 'getNameString',
    value: function getNameString() {
      return 'Cone';
    }
  }]);

  return Cone;
}(Vessel);

Cone.prototype.nameString = Cone.getNameString();
Cone.prototype.capacityInScoops = 3;

/**
 * Cup container that extends from Vessel.
 */

var Cup = function (_Vessel2) {
  _inherits(Cup, _Vessel2);

  function Cup() {
    _classCallCheck(this, Cup);

    return _possibleConstructorReturn(this, (Cup.__proto__ || Object.getPrototypeOf(Cup)).apply(this, arguments));
  }

  _createClass(Cup, null, [{
    key: 'getNameString',
    value: function getNameString() {
      return 'Cup';
    }
  }]);

  return Cup;
}(Vessel);

Cup.prototype.nameString = Cup.getNameString();
Cup.prototype.capacityInScoops = 2;

/**
 * Tub container that extends from Vessel.
 */

var Tub = function (_Vessel3) {
  _inherits(Tub, _Vessel3);

  function Tub() {
    _classCallCheck(this, Tub);

    return _possibleConstructorReturn(this, (Tub.__proto__ || Object.getPrototypeOf(Tub)).apply(this, arguments));
  }

  _createClass(Tub, null, [{
    key: 'getNameString',
    value: function getNameString() {
      return 'Tub';
    }
  }]);

  return Tub;
}(Vessel);

Tub.prototype.nameString = Tub.getNameString();
Tub.prototype.capacityInScoops = 10;

module.exports = {
  Vessel: Vessel,
  Cone: Cone,
  Cup: Cup,
  Tub: Tub
};

/***/ })
/******/ ]);
//# sourceMappingURL=app.bundle.js.map