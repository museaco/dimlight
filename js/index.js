window.__auther__ = 'bHVzaGVuZzEwdkAxNjMsY29t';
gsap.registerPlugin(ScrollTrigger);

const $body = $('body');

function Toast(message = '操作成功') {

  $('#toast').remove();

  const $toast = $(`
    <div id="toast" style="
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
      z-index: 9999;
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

$(window).on('load', function() {
  $('#page-loading').remove();
  const isClient = browser.gxrb;

  if (isClient) {

    $('#upload-btn')
      .append(`<input accept="image/heic,image/jpeg,image/jpg" type="file" class="absolute inset-0 z-10 border-none outline-none opacity-0 cursor-pointer" draggable="false" />`);

    createDialogueAnimate({
      showBtn: 'button[data-btn="myly"]',
      hideBtn: 'img[data-btn="close-myly"]',
      modal: '#myly-modal',
    });

  } else {
    $('#ly-input').addClass('needApp');
    $('#upload-btn').addClass('needApp');
    $('button[data-btn="submit"]').addClass('needApp');
    $('button[data-btn="myly"]').addClass('needApp');
  }

  const clipboard = new ClipboardJS('.copy-btn');
  clipboard.on('success', function(e) {
    Toast('复制成功');
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
      reject();
    });

  }

  $('button[data-btn="submit"]').on('click', function(e) {
    e.preventDefault();
    if (!isClient) {
      return;
    }

    handleSubmit().then(handleSubmitDialog).catch(() => {
      Toast('提交失败，请稍后重试');
    });

  });

  // handleNoneDialog();

  function fetchNewsList() {

    $.ajax({
      url: `https://apph5.cloudgx.cn/api/content/h5/topic/contentList/page2?contentId=${contentId}&moduleId=8512&current=1&size=20&t=1731405583691`,
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

  fetchNewsList();

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

});




