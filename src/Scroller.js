const Easing = require('./Easing');

class Scroller {
  constructor() {
    this.scrollBody  = document.body || document.documentElement;
    this.elapsedTime = 0;       // elapsed time
    this.timer       = null;

    this.option = {
      easing:   'easeOutQuint', // default easing
      duration: 1000,           // default all time
      frame:    13,             // default one frame time
      revise:   0,              // default revise pixel
    };
  }

  /**
   * scrollToTop
   * @param  {Object} option easing, duration, frame is setting
   * @return {void}
   */
  scrollToTop(option = {}) {
    if(this.elapsedTime > 0) return;
    const sX = this.scrollBody.scrollTop, eX = option.revise || this.option.revise;
    this.scroller(sX, eX, option);
  }

  /**
   * scrollToTarget
   * @param  {String} target id name or class name
   * @param  {Object} option easing, duration, frame, revise is setting
   * @return {void}
   */
  scrollToTarget(className, option = {}) {
    if(this.elapsedTime > 0) return;
    const elm = document.getElementsByClassName(className), revise = option.revise || this.option.revise;
    const sX = this.scrollBody.scrollTop, eX = elm[0].getBoundingClientRect().top + revise;
    this.scroller(sX, eX, option);
  }

  /**
   * scroller
   * @param  {Number} sX     start x px
   * @param  {Number} eX     end x px
   * @param  {Object} option
   * @return {void}
   */
  scroller(sX, eX, option = {}) {
    clearTimeout(this.timer);
    const easing   = option.easing || this.option.easing,
          duration = option.duration || this.option.duration,
          frame    = option.frame || this.option.frame;

    if(this.elapsedTime >= duration) {
      this.scrollBody.scrollTop = eX;
      this.elapsedTime = 0;
    } else {
      const ease = Easing[easing] || Easing[this.option.easing];
      this.scrollBody.scrollTop = ease(this.elapsedTime, sX, eX - sX, duration);

      this.elapsedTime += frame;

      this.timer = setTimeout(() => {
        this.scroller(sX, eX, option);
      }, frame);
    }
  }
}

module.exports = Scroller;
