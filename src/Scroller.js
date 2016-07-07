import Easing from './Easing';

class Scroller {
  constructor(prop) {
    this.scrollBody  = prop.scrollBody;
    this.easing      = prop.easing;
    this.duration    = prop.duration;
    this.frameTime   = prop.frameTime;
    this.elapsedTime = prop.elapsedTime;
    this.timer       = prop.timer;
  }

  static set(options = {}) {
    let prop = {};
    prop.scrollBody  = options.scrollBody || document.body || document.documentElement;
    prop.easing      = options.easing || 'easeOutQuint';  // easing
    prop.duration    = options.duration || 1000;          // all time
    prop.frameTime   = options.frameTime || 13;           // one frame time
    prop.elapsedTime = 0;                                 // elapsed time
    prop.timer       = null;

    return new Scroller(prop);
  }

  // scroll top
  scrollTop() {
    const start = this.scrollBody.scrollTop, end = 0;
    this.scroll(start, end);
  }

  // to scroll
  scrollTarget(className, _easing = this.easing) {
    const elm = document.getElementsByClassName(className);
    const start = this.scrollBody.scrollTop, end = elm[0].getBoundingClientRect().top;
    this.scroll(start, end, _easing);
  }

  scroll(start, end, _easing = this.easing) {
    clearTimeout(this.timer);
    let current = this.scrollBody.scrollTop;
    if(this.elapsedTime >= this.duration) {
      this.scrollBody.scrollTop = end;
      this.elapsedTime = 0;
    } else {
      const easing = Easing[_easing];
      this.scrollBody.scrollTop = easing(this.elapsedTime, start, end - start, this.duration);

      this.elapsedTime += this.frameTime;

      this.timer = setTimeout(() => {
        this.scroll(start, end);
      }, this.frameTime);
    }
  }
}

export default Scroller;
