(function(d, c) {
    var e = d.documentElement
      , a = 'orientationchange' in window ? 'orientationchange' : 'resize'
      , b = function() {
      var f = e.clientWidth;
      if (!f) {
        return;
      }
      var d = 1080; //设计稿宽。


      // if (f <= 750) {
      //   d = 750;
      // }

      if (f >= d) {
        d = f;
      }

      e.style.fontSize = (100 * (f / d)) + 'px';
    };
    if (!d.addEventListener) {
      b();
      return;
    }
    c.addEventListener(a, b, false);
    d.addEventListener('DOMContentLoaded', b, false);
    b();
  }
)(document, window);
