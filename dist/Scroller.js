'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Easing = require('./Easing');

var Scroller = function () {
  function Scroller() {
    _classCallCheck(this, Scroller);

    this.scrollBody = document.body || document.documentElement;
    this.elapsedTime = 0; // elapsed time
    this.timer = null;

    this.option = {
      easing: 'easeOutQuint', // default easing
      duration: 1000, // default all time
      frame: 13, // default one frame time
      revise: 0 };
  }

  /**
   * scrollToTop
   * @param  {Object} option easing, duration, frame is setting
   * @return {void}
   */


  _createClass(Scroller, [{
    key: 'scrollToTop',
    value: function scrollToTop() {
      var option = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      if (this.elapsedTime > 0) return;
      var sX = this.scrollBody.scrollTop,
          eX = option.revise || this.option.revise;
      this.scroller(sX, eX, option);
    }

    /**
     * scrollToTarget
     * @param  {String} target id name or class name
     * @param  {Object} option easing, duration, frame, revise is setting
     * @return {void}
     */

  }, {
    key: 'scrollToTarget',
    value: function scrollToTarget(className) {
      var option = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      if (this.elapsedTime > 0) return;
      var elm = document.getElementsByClassName(className),
          revise = option.revise || this.option.revise;
      var sX = this.scrollBody.scrollTop,
          eX = elm[0].getBoundingClientRect().top + revise;
      this.scroller(sX, eX, option);
    }

    /**
     * scroller
     * @param  {Number} sX     start x px
     * @param  {Number} eX     end x px
     * @param  {Object} option
     * @return {void}
     */

  }, {
    key: 'scroller',
    value: function scroller(sX, eX) {
      var _this = this;

      var option = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      clearTimeout(this.timer);
      var easing = option.easing || this.option.easing,
          duration = option.duration || this.option.duration,
          frame = option.frame || this.option.frame;

      if (this.elapsedTime >= duration) {
        this.scrollBody.scrollTop = eX;
        this.elapsedTime = 0;
      } else {
        var ease = Easing[easing] || Easing[this.option.easing];
        this.scrollBody.scrollTop = ease(this.elapsedTime, sX, eX - sX, duration);

        this.elapsedTime += frame;

        this.timer = setTimeout(function () {
          _this.scroller(sX, eX, option);
        }, frame);
      }
    }
  }]);

  return Scroller;
}();

module.exports = Scroller;