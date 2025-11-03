gsap.registerPlugin(ScrollTrigger);
const actyid = '952';
const $body = $('body');
let page = 1;

let imgList = [
  // 'https://static.gxrb.com.cn/front_app_data/image/uploadpic/20251103/7ebfac402a23ec4061dd0071fb178689.jpg',
  // 'https://static.gxrb.com.cn/front_app_data/image/uploadpic/20251103/7ebfac402a23ec4061dd0071fb178689.jpg',
  // 'https://static.gxrb.com.cn/front_app_data/image/uploadpic/20251103/7ebfac402a23ec4061dd0071fb178689.jpg',
  // 'https://static.gxrb.com.cn/front_app_data/image/uploadpic/20251103/7ebfac402a23ec4061dd0071fb178689.jpg',
  // 'https://static.gxrb.com.cn/front_app_data/image/uploadpic/20251103/7ebfac402a23ec4061dd0071fb178689.jpg',
  // 'https://static.gxrb.com.cn/front_app_data/image/uploadpic/20251103/7ebfac402a23ec4061dd0071fb178689.jpg',
];
let videoList = [];

function toast(message = '操作成功') {

  $('div[data-xo-toast]').remove();

  const $toast = $(`
    <div data-xo-toast   style="
      position: fixed;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      background: #8f4900;
      color: #fff;
      padding: .2rem .35rem;
      border-radius: .2rem;
      font-size: .40rem;
      opacity: 0;
      pointer-events: none;
      z-index: 8888;
      font-family: 'FZZYK', system-ui;
    ">
      ${message}
    </div>
  `);

  $body.append($toast);

  const tl = gsap.timeline({
    onComplete() {
      $toast.remove();
    },
  });

  tl.to($toast, { autoAlpha: 1, y: '1rem', duration: 0.3, ease: 'back.out(1.7)' })
    .to($toast, { autoAlpha: 0, y: '-1rem', duration: 0.3, delay: 1.5, ease: 'power2.in' });
}

function toast_with_mask(message = '操作成功') {
  $('div[data-xo-toast-with-mask]').remove();

  const $toast = $(`
    <div data-xo-toast-with-mask style="
      position: fixed;
      inset: 0;
      z-index: 7777;
      background: rgba(0, 0, 0, 0.4);
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
        transform: scale(0);
      
    ">
      <div  style="
   
        background: #8f4900;
        color: #fff;
        padding: .2rem .35rem;
        border-radius: .2rem;
        font-size: .40rem;
        pointer-events: none;
    
        font-family: 'FZZYK', system-ui;
      ">
        <p>${message}</p>
      </div>
    </div>
  `);

  $body.append($toast);

  const tl = gsap.timeline({ paused: true });
  tl.to($toast, { autoAlpha: 1, scale: 1, duration: 0.3, ease: 'back.out(1.7)' });

  tl.play();

  return function closeToast() {
    gsap.to($toast, {
      autoAlpha: 0,
      scale: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete() {
        $toast.remove();
      },
    });
  };
}

$(window).on('load', function() {

  // imgList.forEach((fileUrl) => {
  //
  //   $('.preview-list')
  //     .append(
  //       `<div class="uploaded-image"><img src="${fileUrl}" alt=""><span class="preview-close"></span></div>`,
  //     )
  //     .addClass('show');
  // });

  $('#page-loading').remove();
  // const isClient = browser.versions.gxrb;
  const isClient = true;

  function get_cloudgx_signstr() {
    // return getAppMultiUserInfo(1).trim().replace(/\n/g, '');
    const t = 'YWki++v23SWNgkrFc92bsTCzVrASKRhAp+JenIGtQy9BygJk9IXONH/ga/M/CuhdCyUql4FZTQrqoNuCpqupwo/Vy7gazPdQc4RmBjD8ziQJJBUvUN9Q17hTpiYVJHQkuaMANzrtUNY0yUCleadDtagXYXKhq09dhHe2beu+ci2xy/0Glwhb593q52iBh85QZOhXm2xrIjce29cTJqxR6Q5gyxlnmrdwBNDwe0cC9ECNeUzVrvf8lbV28rpJJJUyuPWcOfxV8MHH3avgggluw80dYlNIByUHqOH1kz6m+jB8tkI8U6U+o/BZN1DjJL6LkG5uAOuhPBlEpmV8V1s+FVaCfgqblgGyk7X8cddlZ2W1IeIO4WPjFDC4Fyxdc84sux9svEGgpk81kgxh0tuNOXUccRZJCbmQhs5QWKru3dqcZz96xJ1OvMmc5T6Cd4qOw/goZ6wQ+hD9EuxI4f6q3g==';
    return t;
  }

  // 获取评论列表
  function fetchComments() {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('tenant_id', '114');
    params.append('status', '1');
    params.append('actyid', actyid);
    params.append('size', '20');

    $.ajax({
      url: `https://zuul.gxrb.com.cn/api-newtime/pub/activityComment/list?${params}`,
      type: 'GET',
      success: function(data) {
        if (data.code === 0) {

        } else {
          console.error('Error:', data.message);
        }
      },
      error: function(xhr, status, error) {
        console.error('Error:', error);
      },
    });
  }

  fetchComments();
  console.log(browser);
  console.log(browser.versions.gxrb);
  if (isClient) {

    $('#upload-img')
      .append(
        `<input multiple accept="image/heic,image/jpeg,image/jpg" type="file" class="absolute inset-0 z-10 border-none outline-none opacity-0 cursor-pointer" draggable="false" />`);

    createDialogueAnimate({
      showBtn: 'button[data-btn="myly"]',
      hideBtn: 'img[data-btn="close-myly"]',
      modal: '#myly-modal',
    });

    $('#textarea-wrap').append(`
     <label>
      <textarea placeholder="请输入评论..." class="msg-text text-[#6d3f3f] outline-none h-full resize-none w-full bg-transparent border-none text-[.46rem] p-0 m-0"></textarea>
    </label>
    `);

  } else {

    $('#upload-img').addClass('needApp');
    $('button[data-btn="submit"]').addClass('needApp');
    $('button[data-btn="myly"]').addClass('needApp');

    $('#textarea-wrap').append(`
    <img src="./images/ly/placeholder.png" alt="" class="w-[3rem] block select-none pointer-events-none" draggable="false">
    `).addClass('needApp');
  }

  const clipboard = new ClipboardJS('.copy-btn');
  clipboard.on('success', function(e) {
    toast('复制成功');
    e.clearSelection();
  });

  gsap.from('img[data-img-y-show]', {
    y: 20,
    autoAlpha: 0,
    stagger: 0.25,
  });

  gsap.utils.toArray(['.from-y-show']).forEach(section => {
    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        scrub: true,
        start: 'top bottom',
        end: '50% bottom',
      },
    }).from(section, { opacity: 0, y: '2rem', duration: 1 });
  });

  const fl_tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#fl-section',
      scrub: true,
      start: 'top 90%',
      end: 'bottom bottom',
      // markers: true,
    },
  });

  fl_tl.from('img[data-fl="01"]', { opacity: 0, y: '0.8rem' });
  fl_tl.from('img[data-fl="02"]', { opacity: 0, x: '-1.8rem' });
  fl_tl.from('div[data-fl="bg"]', { opacity: 0, scale: .8 });
  fl_tl.from('img[data-fl="04"]', { opacity: 0, y: '-0.8rem' });
  fl_tl.from('img[data-fl="03"]', { opacity: 0, x: '-0.8rem' });
  fl_tl.from('div[data-fl="05"]', { opacity: 0, x: '0.8rem' }, '<');

  function showDialog(modalId) {
    const tl = gsap.timeline();
    tl.from(`${modalId} [data-modal-content] `, { scale: .9, duration: 0.4, opacity: 0, ease: 'back.out' });
    tl.to(modalId, { autoAlpha: 1, duration: 0.2 }, '<');
  }

  function hideDialog(modalId, config = {}) {

    gsap.to(modalId, {
      autoAlpha: 0,
      duration: config.duration || 0.2,
      onComplete() {
        if (config.hideComplete) {
          config.hideComplete();
        }
      },
    });
  }

  function createDialogueAnimate({
    showBtn,
    hideBtn,
    modal,
    hideComplete,
  }) {
    /** 点击弹出 */
    if (showBtn) {
      $(showBtn).on('click', function() {
        showDialog(modal);
      });
    }

    /** 点击关闭 */
    if (hideBtn) {
      $(hideBtn).on('click', function() {
        hideDialog(modal, { hideComplete });
      });
    }

  }

  createDialogueAnimate({
    showBtn: 'button[data-btn="rule"]',
    hideBtn: 'img[data-btn="close-rule"]',
    modal: '#rule-modal',
  });

  createDialogueAnimate({
    showBtn: '',
    hideBtn: 'img[data-btn="close-needApp-modal"]',
    modal: '#needApp-modal',
  });

  createDialogueAnimate({
    showBtn: '',
    hideBtn: 'img[data-btn="close-my-coupons"]',
    modal: '#my-coupons-modal',
  });

  $('button[data-coupons-number]').on('click', function(e) {
    e.preventDefault();
    const couponsNumber = $(this).data('coupons-number');

    hideDialog('#myly-modal', { duration: 0 });
    $('#coupons-content').text(couponsNumber);
    showDialog('#my-coupons-modal');

  });

  function handleNoneDialog() {

    const $el = $(`<div id="nonc-modal" class="fixed inset-0 bg-black/40 z-[1500] touch-none flex flex-col justify-center items-center invisible">
      <div class="relative w-[9.17rem] touch-none" data-modal-content>
        <img data-btn="close-no-nc" data-press src="./images/671390.png" class="absolute -top-[.4rem] right-[.28rem] select-none  w-[1.11rem] z-20 cursor-pointer" alt="" draggable="false">
        <img src="./images/169034.png" class="w-full block mx-auto select-none pointer-events-none" draggable="false" alt="">
    
        <div class="absolute inset-0  z-10">
          <div class="text-[#8F4900] text-[.42rem] h-[4.3rem] overflow-y-auto mt-[3.5rem] ml-[.9rem] mr-[.9rem] ly-list-scrollbar ly-list-scrollbar flex flex-col gap-[.3rem]">
            <p class="text-[#441d00] text-[.65rem] font-FZZYK">本期奶茶已抢光，每期限定<span class="text-[#e27d15]">2500</span>杯先到先得，下一期再来吧！</p>
          </div>
        </div>
      </div>
    </div>`);

    $body.append($el);
    createDialogueAnimate({
      showBtn: '',
      hideBtn: 'img[data-btn="close-no-nc"]',
      modal: '#nonc-modal',
      hideComplete: () => {
        $el.remove();
      },
    });
    showDialog('#nonc-modal');

  }

  function handleSubmitDialog() {

    const $el = $(`<div id="submit-modal" class="fixed inset-0 bg-black/40 z-[1500] touch-none flex flex-col justify-center items-center invisible">
      <div class="relative w-[9.32rem] touch-none" data-modal-content>
        <img data-btn="close-submit" data-press src="./images/671390.png" class="absolute -top-[.4rem] right-[.28rem] select-none  w-[1.11rem] z-20 cursor-pointer" alt="" draggable="false">
        <img src="./images/169034.png" class="w-full block mx-auto select-none pointer-events-none" draggable="false" alt="">
    
        <div class="absolute inset-0  z-10">
          <div class="text-[#8F4900] text-[.42rem] h-[4.8rem] overflow-y-auto mt-[2.6rem] ml-[.9rem] mr-[.8rem] ly-list-scrollbar ly-list-scrollbar flex flex-col gap-[.3rem]">
            <p class="text-[#441d00] text-[.65rem] font-FZZYK leading-[.9rem]">您的暖心故事已提交成功，通过审核后可获得梁小糖立冬新品—<span class="text-[#e27d15]">荔浦芋椰粒奶茶</span> ，可点击
            <span class="text-[#5ba8b9]">【我的留言】</span> 查看。</p>
          </div>
        </div>
      </div>
    </div>`);

    $body.append($el);
    createDialogueAnimate({
      showBtn: '',
      hideBtn: 'img[data-btn="close-submit"]',
      modal: '#submit-modal',
      hideComplete: () => {
        $el.remove();
      },
    });
    showDialog('#submit-modal');

  }

  function handleSubmit() {

    return new Promise((resolve, reject) => {

      var comment = $('.msg-text').val();
      if (comment === '') {
        return reject('请输入评论内容');
      }

      const data = {
        actyid: actyid,
        content: comment, // 留言内容
        images: JSON.stringify(imgList),
        videos: JSON.stringify(videoList),
        tenant_id: 114,
        star: 3,
        status: 2,
        cloudgx_signstr: get_cloudgx_signstr(),
        newtime_token: 'e534cd480b1728e484ce9674f4edeb92',
        newtime_userid: 258,
        // cloudgx_signstr: getAppMultiUserInfo(1).trim().replace(/\n/g, "")
      };
      let formData = new FormData();
      for (let i in data) {
        formData.append(i, data[i]);
      }

      const close_toast = toast_with_mask('正在提交...');
      $.ajax({
        url: `https://zuul.gxrb.com.cn/api-newtime/pub/activityComment/add`,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(res) {
          if (res.data.accommentid) {
            resolve();
            $('.msg-text').val('');
            imgList = [];
            videoList = [];
            $('.preview-list').html('').removeClass('show');
            // $("body").removeClass("listActive");
            page = 1;
            // getToken();
            fetchComments();
          } else {
            reject('网络错误，请稍后重试');

          }
          console.log(res);
        },
        error: function() {
          reject('网络错误，请稍后重试');
        },
        complete: function(xhr, status) {
          close_toast();
        },
      });

    });

  }

  $('button[data-btn="submit"]').on('click', function(e) {
    e.preventDefault();
    if (!isClient) {
      return;
    }

    handleSubmit().then(handleSubmitDialog).catch((msg) => {
      toast(msg);
    });

  });

  // handleNoneDialog();

  function fetchNewsList(moduleId) {

    $.ajax({
      url: `https://apph5.cloudgx.cn/api/content/h5/topic/contentList/page2?contentId=${contentId}&moduleId=${moduleId}&current=1&size=20&t=1731405583691`,
      type: 'GET',
      contentType: 'application/json',
      success: function(res) {
        const records = (res.data || {}).records || [];
        records.slice(0, 12).forEach(item => {
          $('.news-wrapper').append(`
          <a class="flex " data-id="${item.contentId}" target="_blank" href="${articleLink}/${item.contentId}">
            <div class="w-[4.01rem] h-[2.31rem] shrink-0">
              <img src="${item.abridgePictures[0].url}" class="w-full h-full object-cover" alt="">
            </div>

            <div class="flex-1 min-w-0 ml-[.3rem]">
              <p class="text-[#9E5600] text-[.4rem] nowrap3">${item.title}</p>
            </div>
          </a>
    `);
        });

      },
    });
  }

  function fetchTopic(_contentId, success) {
    $.ajax({
      url: 'https://apph5.cloudgx.cn/api/content/h5/topic/detail/v1',
      type: 'POST',
      data: JSON.stringify({
        contentId: _contentId,
        preview: 1,
      }),
      contentType: 'application/json',
      success: function(res) {
        typeof success === 'function' && success(res);
      },
    });
  }

  fetchTopic(contentId, function() {
    fetchNewsList('9098');
  });

  // 点击跳转广西云
  $body.on('click', '.needApp', function(e) {

    e.preventDefault();
    e.stopPropagation();
    const $el = $(`<div id="needApp-modal" class="fixed inset-0 bg-black/40 z-[1500] touch-none flex flex-col justify-center items-center invisible">
      <div class="relative w-[9.9rem] touch-none" data-modal-content>
          <img src="./images/close.png" class="w-[.93rem] absolute right-[2rem] top-0" data-btn="close-needApp-modal" alt="">
          <div class="w-[6rem] mx-auto">
            <img class="w-full" id="gotoApp" src="./images/needApp.png" alt="">
          </div>
        </div>
      </div>`);

    $body.append($el);
    createDialogueAnimate({
      showBtn: '',
      hideBtn: 'img[data-btn="close-needApp-modal"]',
      modal: '#needApp-modal',
      hideComplete: () => {
        $el.remove();
      },
    });

    showDialog('#needApp-modal');

  });

  $body.on('click', '#gotoApp', function() {
    const contentType = 12;
    const link = 'https://apph5.cloudgx.cn/topic/b5da5cc74c5e4e4cae336cf32eb01215';

    const data = { contentId, contentType, link };
    location.href = `gxrbapp://content?contentId=${encodeURIComponent(contentId)}&contentType=${encodeURIComponent(contentType)}&link=${encodeURIComponent(
      link)}&params=${encodeURIComponent(JSON.stringify(data))}`;

    setTimeout(() => {
      window.location.href = 'https://apph5.cloudgx.cn/download';
    }, 500);
  });

  // 监听图片上传 限制上传最多六张图片
  $('#upload-img').on('change', function(e) {
    const files = e.target.files;
    const existingImages = imgList.length;
    if (files.length < 1) {
      return;
    }
    console.log(files);
    if (files.length + existingImages > 6) {
      toast('最多上传六张图片');
      return;
    }
    // 限制上传图片大小不大于10M
    // 用户重新选择相同文件，有些浏览器（尤其是 Chrome）可能不会触发 change 事件。
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB

    for (const file of files) {
      if (file.size > MAX_SIZE) {
        const $input = $('#upload-img');
        $input.val('');
        $input[0].value = ''; // 兼容清空
        toast('图片大小不能超过 10M');
        return;
      }
    }

    const close_toast = toast_with_mask('图片上传中...');

    const formData = new FormData();
    Array.from(files).forEach((file, index) => {
      formData.append(`file[${index}]`, file);
    });
    formData.append('cloudgx_signstr', get_cloudgx_signstr());
    formData.append('scene', 'frontApp');

    $.ajax({
      type: 'post',
      url: 'https://zuul.gxrb.com.cn/api-upload/front/uploadImage/gxrbapp',
      data: formData,
      processData: false,
      contentType: false,
      success: function(response) {
        if (response.code === 0) {
          response.data.file.forEach((item) => {
            imgList.push(item.fileUrl);
            $('.preview-list')
              .append(
                `<div class="uploaded-image"><img src="${item.fileUrl}" alt=""><span class="preview-close"></span></div>`,
              )
              .addClass('show');
          });
          toast('图片上传成功');
        } else {
          toast(response.msg || '图片上传失败，请稍后重试');
        }

      },
      error: function() {
        toast('网络错误，请稍后重试');
      },
      complete: function(xhr, status) {
        close_toast();
        // 清空input
        $('#upload-img').val('');
      },
    });
  });

  // 删除图片或视频
  $('.preview-list').on('click', '.preview-close', function() {
    $(this).parent().remove();
    const src = $(this).siblings('img, video').attr('src');
    const index = imgList.indexOf(src);
    if (index !== -1) {
      imgList.splice(index, 1);
    } else {
      const videoIndex = videoList.indexOf(src);
      if (videoIndex !== -1) {
        videoList.splice(videoIndex, 1);
      }
    }
  });
});




