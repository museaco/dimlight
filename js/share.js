function setWXConfig(res, shareData) {
  const WX_APP_ID = 'wxfde72d83dd939a05';

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

function serviceGetShareSignature(shareData) {
  const shareurl = window.location.href;
  $.ajax({
    url: `https://zuul.gxrb.com.cn/api-newtime/getSignature/GetSignature/?shareurl=${encodeURIComponent(
      shareurl,
    )}`,
    success: function (res) {
      console.log('xxx')
      setWXConfig(res, shareData);
    },
    error: function (err) {
      console.error('获取微信签名失败', err);
    }
  });
}

serviceGetShareSignature({
  title: '广西日报「微光计划」', // 标题
  desc: '这个冬天，广西日报-广西云联合梁小糖、浅茶、爷爷不泡茶、芋田田共同发起「微光计划」',
  imgUrl: 'https://h5.gxrb.com.cn/front/2025/dimlight/images/share.jpg', // 缩略图
  link: window.location.href, //分享链接
});

console.log(wx)
