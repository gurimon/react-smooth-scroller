# react-smooth-scroller

I scroll to the location of the designation (classname).

## Installation

```sh
$ npm i -S react-smooth-scroller
```

## Usage

```javascript
// ES2015 imports
import rsScroller from 'react-smooth-scroller';
```

## API

### rsScroller#scrollToTop(option)

```javascript
rsScroller.scrollToTop();

// default option => { easing: 'easeOutQuint', duration: 1000, frame: 13, revise: 0 }
rsScroller.scrollToTop({ easing: 'linear', duration: 1500, frame: 20, revise: 100 });
```

### rsScroller#scrollToTarget(classname, option)

```javascript
rsScroller.scrollToTarget('hoge');

// default option => { easing: 'easeOutQuint', duration: 1000, frame: 13, revise: 0 }
rsScroller.scrollToTarget('hoge', { easing: 'linear', duration: 1500, frame: 20, revise: 100 });
```

### rsScroller#scroller(start, end, option)

```javascript
rsScroller.scroller(0, 600);
```

##### easing
- linear
- easeInQuad
- easeOutQuad
- easeInOutQuad
- easeInCubic
- easeOutCubic
- easeInOutCubic
- easeInQuart
- easeOutQuart
- easeInOutQuart
- easeInQuint
- easeOutQuint
- easeInOutQuint
- easeInSine
- easeOutSine
- easeInOutSine
- easeInExpo
- easeOutExpo
- easeInOutExpo
- easeInCirc
- easeOutCirc
- easeInOutCirc
- easeInElastic
- easeOutElastic
- easeInBack
- easeOutBack
- easeInOutBack
- easeInBounce
- easeOutBounce
- easeInOutBounce

#### Use with React

```javascript
import React from 'react';
import rsScroller from 'react-smooth-scroller';

class Test extends React.Component {
  onScrollTop() {
    rsScroller.scrollToTop();
  }

  onScrollTarget() {
    rsScroller.scrollToTarget('hoge');
  }

  render() {
    return (
      <div className="test">
        <h1>react-smooth-scroller</h1>
        <div className="test__desc">
          <p>test</p>
          <a onClick={ () => this.onScrollTarget() } className="btn">button-A</a>
        </div>
        <a onClick={ () => this.onScrollTop() } className="btn hoge">button-B</a>
      </div>
    )
  }
});
```

## License

MIT
