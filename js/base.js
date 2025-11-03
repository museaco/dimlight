const baseUrl = 'https://apph5.cloudgx.cn/';
const articleLink = `https://apph5.cloudgx.cn/article`;
const contentId = "0e8e28613e774ae2b243b4fc0a0f5626";
// const contentId = '71e2916fa3f4467782c640db2ebf0947';

$(function() {
  var ua = navigator.userAgent.toLowerCase();
  var isWeixin = ua.indexOf('micromessenger') !== -1;
  var isGxrbApp = ua.indexOf('gxrbapp') > -1;
  var isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  if (isGxrbApp) {
    if (!isIOS) {
      console.log('android app生效');
      $(document).on('click', 'a:not(.noAndroid)', function(e) {
        e.preventDefault();
        var $this = $(this);
        var url = $this.attr('href');
        var title = $this.attr('title');
        var contentId = $this.attr('data-id');
        if (contentId) {
          appInterJump(contentId);
        } else {
          window.location = url;
        }

        // console.log('android url', url);
        //
        // openWebview(url, title);
      });
    } else {
      console.log('ios app生效');
      $(document).on('click', 'a:not(.noIOS)', function(e) {
        e.preventDefault();
        var $this = $(this);
        var url = $this.attr('href');
        var title = $this.attr('title');
        var contentId = $this.attr('data-id');

        if (contentId) {
          appInterJump(contentId);
        } else {
          window.location = url;
        }
        // console.log('ios url', url);
        // openWebview(url, title);
        // window.location = url;
      });
    }
  }
  $('#goTop').click(function() {
    $('html,body').animate(
      {
        scrollTop: 0,
      },
      800,
    );
  });
});
