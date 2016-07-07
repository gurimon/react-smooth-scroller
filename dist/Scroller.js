'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Easing = require('./Easing');

var Scroller = function () {
  function Scroller(prop) {
    _classCallCheck(this, Scroller);

    this.scrollBody = prop.scrollBody;
    this.easing = prop.easing;
    this.duration = prop.duration;
    this.frameTime = prop.frameTime;
    this.elapsedTime = prop.elapsedTime;
    this.timer = prop.timer;
  }

  _createClass(Scroller, [{
    key: 'scrollTop',


    // scroll top
    value: function scrollTop() {
      var start = this.scrollBody.scrollTop,
          end = 0;
      this.scroll(start, end);
    }

    // to scroll

  }, {
    key: 'scrollTarget',
    value: function scrollTarget(className) {
      var _easing = arguments.length <= 1 || arguments[1] === undefined ? this.easing : arguments[1];

      var elm = document.getElementsByClassName(className);
      var start = this.scrollBody.scrollTop,
          end = elm[0].getBoundingClientRect().top;
      this.scroll(start, end, _easing);
    }
  }, {
    key: 'scroll',
    value: function scroll(start, end) {
      var _this = this;

      var _easing = arguments.length <= 2 || arguments[2] === undefined ? this.easing : arguments[2];

      clearTimeout(this.timer);
      var current = this.scrollBody.scrollTop;
      if (this.elapsedTime >= this.duration) {
        this.scrollBody.scrollTop = end;
        this.elapsedTime = 0;
      } else {
        var easing = Easing[_easing];
        this.scrollBody.scrollTop = easing(this.elapsedTime, start, end - start, this.duration);

        this.elapsedTime += this.frameTime;

        this.timer = setTimeout(function () {
          _this.scroll(start, end);
        }, this.frameTime);
      }
    }
  }], [{
    key: 'set',
    value: function set() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var prop = {};
      prop.scrollBody = options.scrollBody || document.body || document.documentElement;
      prop.easing = options.easing || 'easeOutQuint'; // easing
      prop.duration = options.duration || 1000; // all time
      prop.frameTime = options.frameTime || 13; // one frame time
      prop.elapsedTime = 0; // elapsed time
      prop.timer = null;

      return new Scroller(prop);
    }
  }]);

  return Scroller;
}();

module.exports = Scroller;