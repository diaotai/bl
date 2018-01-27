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


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createElement = __webpack_require__(1);

var _render = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FuckApp = function (_React$Component) {
    _inherits(FuckApp, _React$Component);

    function FuckApp() {
        _classCallCheck(this, FuckApp);

        return _possibleConstructorReturn(this, (FuckApp.__proto__ || Object.getPrototypeOf(FuckApp)).apply(this, arguments));
    }

    _createClass(FuckApp, [{
        key: "render",
        value: function render() {
            return _createElement.React.createElement("div", { className: "I am FuckApp component" });
        }
    }]);

    return FuckApp;
}(_createElement.React.Component);

_render.ReactDOM.render(_createElement.React.createElement(FuckApp, null), document.body);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vnode = function Vnode(type, props, key, ref) {
    _classCallCheck(this, Vnode);

    this.type = type;
    this.props = props;
    this.key = key;
    this.ref = ref;
};

var Component = function () {
    function Component(props) {
        _classCallCheck(this, Component);

        this.props = props;
        this.state = this.state || {};
        this.nextState = null;
    }

    _createClass(Component, [{
        key: "setState",
        value: function setState(nextState) {}
    }, {
        key: "render",
        value: function render() {}
    }]);

    return Component;
}();

function createElement(type, config) {
    if (!type) return;
    var props = {},
        key = void 0,
        ref = void 0;
    if (config) {
        key = config.key === undefined ? null : config.key;
        ref = config.ref === undefined ? null : config.ref;
        for (var i in config) {
            if (i == "key" || i == "ref") continue;
            if (config.hasOwnProperty(i)) {
                props[i] = config[i];
            }
        }
    }

    for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
    }

    if (children.length == 1) {
        props.children = children[0];
    } else if (children.length > 1) {
        props.children = children;
    }
    return new Vnode(type, props, key, ref);
}

var React = exports.React = {
    createElement: createElement,
    Component: Component
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function render(vnode, container) {
  if (!vnode) return;
  var props = vnode.props,
      type = vnode.type;

  var domNode = void 0;
  if (typeof type == "string") {
    domNode = document.createElement(type);
  } else if (typeof type == "function") {
    domNode = renderComponent(vnode, container);
  }
  mapPropsToDom(props, domNode);
  var children = props.children;

  mountChild(children, domNode);
  container.appendChild(domNode);
  return domNode;
}

function mapPropsToDom(props, dom) {
  for (var i in props) {
    if (!props.hasOwnProperty(i) || i == "children") {
      continue;
    }
    if (i == "style") {
      var _ret = function () {
        var style = props.style;
        Object.keys(style).forEach(function (key) {
          dom.style[key] = style[key];
        });
        return "continue";
      }();

      if (_ret === "continue") continue;
    }
    dom.setAttribute(i, props[i]);
  }
}

function mountChild(children, domNode) {
  if (!children) return;
  if (Array.isArray(children)) {
    children.forEach(function (child) {
      render(child, domNode);
    });
  } else {
    render(children, domNode);
  }
}

function renderComponent(vnode, container) {
  if (!vnode) return;
  var type = vnode.type,
      props = vnode.props;

  var component = new type(props).render();
  var dom = render(component, container);
  return dom;
}

var ReactDOM = exports.ReactDOM = {
  render: render
};

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjMyMGQxOWU2ZTAyYTBiNWZkNmUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jcmVhdGVFbGVtZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9yZW5kZXIuanMiXSwibmFtZXMiOlsiRnVja0FwcCIsIkNvbXBvbmVudCIsInJlbmRlciIsImRvY3VtZW50IiwiYm9keSIsIlZub2RlIiwidHlwZSIsInByb3BzIiwia2V5IiwicmVmIiwic3RhdGUiLCJuZXh0U3RhdGUiLCJjcmVhdGVFbGVtZW50IiwiY29uZmlnIiwidW5kZWZpbmVkIiwiaSIsImhhc093blByb3BlcnR5IiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJSZWFjdCIsInZub2RlIiwiY29udGFpbmVyIiwiZG9tTm9kZSIsInJlbmRlckNvbXBvbmVudCIsIm1hcFByb3BzVG9Eb20iLCJtb3VudENoaWxkIiwiYXBwZW5kQ2hpbGQiLCJkb20iLCJzdHlsZSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwic2V0QXR0cmlidXRlIiwiQXJyYXkiLCJpc0FycmF5IiwiY2hpbGQiLCJjb21wb25lbnQiLCJSZWFjdERPTSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM3REE7O0FBQ0E7Ozs7Ozs7O0lBRU1BLE87Ozs7Ozs7Ozs7O2lDQUNPO0FBQ0wsbUJBQU8sNENBQUssV0FBVSx3QkFBZixHQUFQO0FBQ0g7Ozs7RUFIaUIscUJBQU1DLFM7O0FBTTVCLGlCQUFTQyxNQUFULENBQ0ksbUNBQUMsT0FBRCxPQURKLEVBRUVDLFNBQVNDLElBRlgsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNUTUMsSyxHQUNKLGVBQVlDLElBQVosRUFBa0JDLEtBQWxCLEVBQXlCQyxHQUF6QixFQUE4QkMsR0FBOUIsRUFBbUM7QUFBQTs7QUFDakMsU0FBS0gsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0MsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsR0FBTCxHQUFXQSxHQUFYO0FBQ0EsU0FBS0MsR0FBTCxHQUFXQSxHQUFYO0FBQ0QsQzs7SUFHR1IsUztBQUNGLHVCQUFZTSxLQUFaLEVBQWtCO0FBQUE7O0FBQ2QsYUFBS0EsS0FBTCxHQUFXQSxLQUFYO0FBQ0EsYUFBS0csS0FBTCxHQUFXLEtBQUtBLEtBQUwsSUFBWSxFQUF2QjtBQUNBLGFBQUtDLFNBQUwsR0FBaUIsSUFBakI7QUFDSDs7OztpQ0FFUUEsUyxFQUFVLENBRWxCOzs7aUNBRU8sQ0FFUDs7Ozs7O0FBR0wsU0FBU0MsYUFBVCxDQUF1Qk4sSUFBdkIsRUFBNkJPLE1BQTdCLEVBQWtEO0FBQzlDLFFBQUcsQ0FBQ1AsSUFBSixFQUFVO0FBQ1YsUUFBSUMsUUFBTSxFQUFWO0FBQUEsUUFBYUMsWUFBYjtBQUFBLFFBQWlCQyxZQUFqQjtBQUNBLFFBQUdJLE1BQUgsRUFBVTtBQUNOTCxjQUFJSyxPQUFPTCxHQUFQLEtBQWFNLFNBQWIsR0FBdUIsSUFBdkIsR0FBNEJELE9BQU9MLEdBQXZDO0FBQ0FDLGNBQUlJLE9BQU9KLEdBQVAsS0FBYUssU0FBYixHQUF1QixJQUF2QixHQUE0QkQsT0FBT0osR0FBdkM7QUFDQSxhQUFJLElBQUlNLENBQVIsSUFBYUYsTUFBYixFQUFvQjtBQUNoQixnQkFBR0UsS0FBRyxLQUFILElBQVVBLEtBQUcsS0FBaEIsRUFBdUI7QUFDdkIsZ0JBQUdGLE9BQU9HLGNBQVAsQ0FBc0JELENBQXRCLENBQUgsRUFBNEI7QUFDeEJSLHNCQUFNUSxDQUFOLElBQVNGLE9BQU9FLENBQVAsQ0FBVDtBQUNIO0FBRUo7QUFDSjs7QUFiNkMsc0NBQVZFLFFBQVU7QUFBVkEsZ0JBQVU7QUFBQTs7QUFjOUMsUUFBR0EsU0FBU0MsTUFBVCxJQUFpQixDQUFwQixFQUFzQjtBQUNsQlgsY0FBTVUsUUFBTixHQUFlQSxTQUFTLENBQVQsQ0FBZjtBQUNILEtBRkQsTUFFTSxJQUFHQSxTQUFTQyxNQUFULEdBQWdCLENBQW5CLEVBQXFCO0FBQ3ZCWCxjQUFNVSxRQUFOLEdBQWVBLFFBQWY7QUFDSDtBQUNELFdBQU8sSUFBSVosS0FBSixDQUFVQyxJQUFWLEVBQWVDLEtBQWYsRUFBcUJDLEdBQXJCLEVBQXlCQyxHQUF6QixDQUFQO0FBQ0g7O0FBRU0sSUFBTVUsd0JBQU07QUFDZlAsZ0NBRGU7QUFFZlg7QUFGZSxDQUFaLEM7Ozs7Ozs7Ozs7OztBQy9DUCxTQUFTQyxNQUFULENBQWdCa0IsS0FBaEIsRUFBdUJDLFNBQXZCLEVBQWtDO0FBQ2hDLE1BQUksQ0FBQ0QsS0FBTCxFQUFZO0FBRG9CLE1BRTFCYixLQUYwQixHQUVWYSxLQUZVLENBRTFCYixLQUYwQjtBQUFBLE1BRW5CRCxJQUZtQixHQUVWYyxLQUZVLENBRW5CZCxJQUZtQjs7QUFHaEMsTUFBSWdCLGdCQUFKO0FBQ0EsTUFBSSxPQUFPaEIsSUFBUCxJQUFlLFFBQW5CLEVBQTZCO0FBQzNCZ0IsY0FBVW5CLFNBQVNTLGFBQVQsQ0FBdUJOLElBQXZCLENBQVY7QUFDRCxHQUZELE1BRU8sSUFBRyxPQUFPQSxJQUFQLElBQWUsVUFBbEIsRUFBNkI7QUFDbENnQixjQUFVQyxnQkFBZ0JILEtBQWhCLEVBQXNCQyxTQUF0QixDQUFWO0FBQ0Q7QUFDREcsZ0JBQWNqQixLQUFkLEVBQXFCZSxPQUFyQjtBQVRnQyxNQVUxQkwsUUFWMEIsR0FVYlYsS0FWYSxDQVUxQlUsUUFWMEI7O0FBV2hDUSxhQUFXUixRQUFYLEVBQXFCSyxPQUFyQjtBQUNBRCxZQUFVSyxXQUFWLENBQXNCSixPQUF0QjtBQUNBLFNBQU9BLE9BQVA7QUFDRDs7QUFFRCxTQUFTRSxhQUFULENBQXVCakIsS0FBdkIsRUFBOEJvQixHQUE5QixFQUFtQztBQUNqQyxPQUFLLElBQUlaLENBQVQsSUFBY1IsS0FBZCxFQUFxQjtBQUNuQixRQUFJLENBQUNBLE1BQU1TLGNBQU4sQ0FBcUJELENBQXJCLENBQUQsSUFBNEJBLEtBQUssVUFBckMsRUFBaUQ7QUFDL0M7QUFDRDtBQUNELFFBQUlBLEtBQUssT0FBVCxFQUFrQjtBQUFBO0FBQ2hCLFlBQUlhLFFBQVFyQixNQUFNcUIsS0FBbEI7QUFDQUMsZUFBT0MsSUFBUCxDQUFZRixLQUFaLEVBQW1CRyxPQUFuQixDQUEyQixlQUFPO0FBQ2hDSixjQUFJQyxLQUFKLENBQVVwQixHQUFWLElBQWlCb0IsTUFBTXBCLEdBQU4sQ0FBakI7QUFDRCxTQUZEO0FBR0E7QUFMZ0I7O0FBQUEsK0JBS2hCO0FBQ0Q7QUFDRG1CLFFBQUlLLFlBQUosQ0FBaUJqQixDQUFqQixFQUFvQlIsTUFBTVEsQ0FBTixDQUFwQjtBQUNEO0FBQ0Y7O0FBRUQsU0FBU1UsVUFBVCxDQUFvQlIsUUFBcEIsRUFBOEJLLE9BQTlCLEVBQXVDO0FBQ3JDLE1BQUcsQ0FBQ0wsUUFBSixFQUFjO0FBQ2QsTUFBR2dCLE1BQU1DLE9BQU4sQ0FBY2pCLFFBQWQsQ0FBSCxFQUEyQjtBQUN6QkEsYUFBU2MsT0FBVCxDQUFpQixVQUFDSSxLQUFELEVBQVM7QUFDdEJqQyxhQUFPaUMsS0FBUCxFQUFhYixPQUFiO0FBQ0gsS0FGRDtBQUdELEdBSkQsTUFJTztBQUNMcEIsV0FBT2UsUUFBUCxFQUFpQkssT0FBakI7QUFDRDtBQUNGOztBQUVELFNBQVNDLGVBQVQsQ0FBeUJILEtBQXpCLEVBQStCQyxTQUEvQixFQUF5QztBQUNyQyxNQUFHLENBQUNELEtBQUosRUFBVztBQUQwQixNQUVoQ2QsSUFGZ0MsR0FFbEJjLEtBRmtCLENBRWhDZCxJQUZnQztBQUFBLE1BRTNCQyxLQUYyQixHQUVsQmEsS0FGa0IsQ0FFM0JiLEtBRjJCOztBQUdyQyxNQUFJNkIsWUFBWSxJQUFJOUIsSUFBSixDQUFTQyxLQUFULEVBQWdCTCxNQUFoQixFQUFoQjtBQUNBLE1BQUl5QixNQUFNekIsT0FBT2tDLFNBQVAsRUFBaUJmLFNBQWpCLENBQVY7QUFDQSxTQUFPTSxHQUFQO0FBQ0g7O0FBRU0sSUFBTVUsOEJBQVc7QUFDdEJuQztBQURzQixDQUFqQixDIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDIzMjBkMTllNmUwMmEwYjVmZDZlIiwiaW1wb3J0IHsgUmVhY3QgfSBmcm9tIFwiLi9jcmVhdGVFbGVtZW50XCI7XHJcbmltcG9ydCB7IFJlYWN0RE9NIH0gZnJvbSBcIi4vcmVuZGVyXCI7XHJcblxyXG5jbGFzcyBGdWNrQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9J0kgYW0gRnVja0FwcCBjb21wb25lbnQnPjwvZGl2PlxyXG4gICAgfVxyXG59XHJcblxyXG5SZWFjdERPTS5yZW5kZXIoXHJcbiAgICA8RnVja0FwcCAvPixcclxuICBkb2N1bWVudC5ib2R5XHJcbik7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsImNsYXNzIFZub2RlIHtcclxuICBjb25zdHJ1Y3Rvcih0eXBlLCBwcm9wcywga2V5LCByZWYpIHtcclxuICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XHJcbiAgICB0aGlzLmtleSA9IGtleTtcclxuICAgIHRoaXMucmVmID0gcmVmO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgQ29tcG9uZW50e1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgICAgIHRoaXMucHJvcHM9cHJvcHM7XHJcbiAgICAgICAgdGhpcy5zdGF0ZT10aGlzLnN0YXRlfHx7fTtcclxuICAgICAgICB0aGlzLm5leHRTdGF0ZSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U3RhdGUobmV4dFN0YXRlKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCl7XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50KHR5cGUsIGNvbmZpZywgLi4uY2hpbGRyZW4pIHtcclxuICAgIGlmKCF0eXBlKSByZXR1cm47XHJcbiAgICBsZXQgcHJvcHM9e30sa2V5LHJlZjtcclxuICAgIGlmKGNvbmZpZyl7XHJcbiAgICAgICAga2V5PWNvbmZpZy5rZXk9PT11bmRlZmluZWQ/bnVsbDpjb25maWcua2V5O1xyXG4gICAgICAgIHJlZj1jb25maWcucmVmPT09dW5kZWZpbmVkP251bGw6Y29uZmlnLnJlZjtcclxuICAgICAgICBmb3IobGV0IGkgaW4gY29uZmlnKXtcclxuICAgICAgICAgICAgaWYoaT09XCJrZXlcInx8aT09XCJyZWZcIikgY29udGludWU7XHJcbiAgICAgICAgICAgIGlmKGNvbmZpZy5oYXNPd25Qcm9wZXJ0eShpKSl7XHJcbiAgICAgICAgICAgICAgICBwcm9wc1tpXT1jb25maWdbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYoY2hpbGRyZW4ubGVuZ3RoPT0xKXtcclxuICAgICAgICBwcm9wcy5jaGlsZHJlbj1jaGlsZHJlblswXVxyXG4gICAgfWVsc2UgaWYoY2hpbGRyZW4ubGVuZ3RoPjEpe1xyXG4gICAgICAgIHByb3BzLmNoaWxkcmVuPWNoaWxkcmVuO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBWbm9kZSh0eXBlLHByb3BzLGtleSxyZWYpXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBSZWFjdD17XHJcbiAgICBjcmVhdGVFbGVtZW50LFxyXG4gICAgQ29tcG9uZW50XHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jcmVhdGVFbGVtZW50LmpzIiwiZnVuY3Rpb24gcmVuZGVyKHZub2RlLCBjb250YWluZXIpIHtcclxuICBpZiAoIXZub2RlKSByZXR1cm47XHJcbiAgbGV0IHsgcHJvcHMsIHR5cGUgfSA9IHZub2RlO1xyXG4gIGxldCBkb21Ob2RlO1xyXG4gIGlmICh0eXBlb2YgdHlwZSA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICBkb21Ob2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcclxuICB9IGVsc2UgaWYodHlwZW9mIHR5cGUgPT0gXCJmdW5jdGlvblwiKXtcclxuICAgIGRvbU5vZGUgPSByZW5kZXJDb21wb25lbnQodm5vZGUsY29udGFpbmVyKTtcclxuICB9XHJcbiAgbWFwUHJvcHNUb0RvbShwcm9wcywgZG9tTm9kZSk7XHJcbiAgbGV0IHsgY2hpbGRyZW4gfSA9IHByb3BzO1xyXG4gIG1vdW50Q2hpbGQoY2hpbGRyZW4sIGRvbU5vZGUpO1xyXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkb21Ob2RlKTtcclxuICByZXR1cm4gZG9tTm9kZVxyXG59XHJcblxyXG5mdW5jdGlvbiBtYXBQcm9wc1RvRG9tKHByb3BzLCBkb20pIHtcclxuICBmb3IgKGxldCBpIGluIHByb3BzKSB7XHJcbiAgICBpZiAoIXByb3BzLmhhc093blByb3BlcnR5KGkpIHx8IGkgPT0gXCJjaGlsZHJlblwiKSB7XHJcbiAgICAgIGNvbnRpbnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKGkgPT0gXCJzdHlsZVwiKSB7XHJcbiAgICAgIGxldCBzdHlsZSA9IHByb3BzLnN0eWxlO1xyXG4gICAgICBPYmplY3Qua2V5cyhzdHlsZSkuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgIGRvbS5zdHlsZVtrZXldID0gc3R5bGVba2V5XTtcclxuICAgICAgfSk7XHJcbiAgICAgIGNvbnRpbnVlO1xyXG4gICAgfVxyXG4gICAgZG9tLnNldEF0dHJpYnV0ZShpLCBwcm9wc1tpXSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBtb3VudENoaWxkKGNoaWxkcmVuLCBkb21Ob2RlKSB7XHJcbiAgaWYoIWNoaWxkcmVuKSByZXR1cm5cclxuICBpZihBcnJheS5pc0FycmF5KGNoaWxkcmVuKSl7XHJcbiAgICBjaGlsZHJlbi5mb3JFYWNoKChjaGlsZCk9PntcclxuICAgICAgICByZW5kZXIoY2hpbGQsZG9tTm9kZSk7XHJcbiAgICB9KVxyXG4gIH0gZWxzZSB7XHJcbiAgICByZW5kZXIoY2hpbGRyZW4sIGRvbU5vZGUpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVyQ29tcG9uZW50KHZub2RlLGNvbnRhaW5lcil7XHJcbiAgICBpZighdm5vZGUpIHJldHVybjtcclxuICAgIGxldCB7dHlwZSxwcm9wc30gPSB2bm9kZTtcclxuICAgIGxldCBjb21wb25lbnQgPSBuZXcgdHlwZShwcm9wcykucmVuZGVyKCk7XHJcbiAgICBsZXQgZG9tID0gcmVuZGVyKGNvbXBvbmVudCxjb250YWluZXIpO1xyXG4gICAgcmV0dXJuIGRvbTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFJlYWN0RE9NID0ge1xyXG4gIHJlbmRlclxyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcmVuZGVyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==