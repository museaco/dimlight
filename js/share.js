function setWXConfig(res) {
  var WX_APP_ID = 'wxfde72d83dd939a05';
  var shareData = {
    title: '广西日报「微光计划」', // 标题
    desc: '这个冬天，广西日报-广西云联合梁小糖、浅茶、爷爷不泡茶、芋田田共同发起「微光计划」',
    imgUrl: 'https://material.cloudgx.cn/thumbnail/20251031/dc521b33483f45a78e4e6497889f0082.jpg', // 缩略图
    link: window.location.href, //分享链接
  };
  if (res.data && res.data.noncestr) {
    wx.config({
      debug: false,
      appId: WX_APP_ID, // 必填，公众号的唯一标识
      timestamp: res.data.timestamp, // 必填，生成签名的时间戳
      nonceStr: res.data.noncestr, // 必填，生成签名的随机串
      signature: res.data.signature, // 必填，签名
      jsApiList: [
        'onMenuShareAppMessage',
        'onMenuShareTimeline',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',
        'updateAppMessageShareData',
        'updateTimelineShareData',
        'openLocation',
        'getLocation',
      ], // 必填，需要使用的JS接口列表
      openTagList: ['wx-open-launch-weapp'],
    });
    wx.ready(() => {
      wx.onMenuShareAppMessage(shareData);
      wx.onMenuShareTimeline(shareData);
      wx.onMenuShareQQ(shareData);
      wx.onMenuShareWeibo(shareData);
      wx.onMenuShareQZone(shareData);
      wx.updateAppMessageShareData(shareData);
      wx.updateTimelineShareData(shareData);
    });
  }
}

function serviceGetShareSignature() {
  var shareurl = window.location.href;
  $.ajax({
    url: `https://zuul.gxrb.com.cn/api-newtime/getSignature/GetSignature/?shareurl=${encodeURIComponent(
      shareurl,
    )}`,
    success: function success(res) {
      setWXConfig(res);
    },
  });
}

serviceGetShareSignature();
