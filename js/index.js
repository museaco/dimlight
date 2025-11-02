window.__auther__ = 'bHVzaGVuZzEwdkAxNjMsY29t';
gsap.registerPlugin(ScrollTrigger);

$(window).on('load', function() {
  $('#page-loading').remove();

  gsap.from('img[data-img-y-show]', {
    y: 20,
    autoAlpha: 0,
    stagger: 0.25,
  });

  // const dy_tl = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: '#dy-section',
  //     scrub: true,
  //     start: 'top bottom',
  //     end: 'bottom bottom',
  //     // markers: true,
  //     toggleActions: 'play none none reverse',
  //   },
  // });
  //
  // dy_tl.from('#dy-section', { opacity: 0, y: '1.8rem', duration: 1 });

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

  function hideDialog(modalId, config = { duration: 0.3 }) {
    gsap.to(modalId, { autoAlpha: 0, duration: config.duration });
  }

  function createDialogueAnimate({
    showBtn,
    hideBtn,
    modal,
  }) {
    /** 点击弹出 */
    if (showBtn) {
      $(showBtn).on('click', function() {
        showDialog(modal);
      });
    }

    /** 点击关闭*/
    if (hideBtn) {
      $(hideBtn).on('click', function() {
        hideDialog(modal);
      });
    }

  }

  createDialogueAnimate({
    showBtn: 'button[data-btn="rule"]',
    hideBtn: 'img[data-btn="close-rule"]',
    modal: '#rule-modal',
  });

  createDialogueAnimate({
    showBtn: 'button[data-btn="myly"]',
    hideBtn: 'img[data-btn="close-myly"]',
    modal: '#myly-modal',
  });

  createDialogueAnimate({
    showBtn: '',
    hideBtn: 'img[data-btn="close-my-coupons"]',
    modal: '#my-coupons-modal',
  });

  function handleCoupons() {

    $('button[data-coupons-number]').on('click', function(e) {
      e.preventDefault();
      const couponsNumber = $(this).data('coupons-number');

      hideDialog('#myly-modal',{duration: 0});
      showDialog('#my-coupons-modal');
      console.log(couponsNumber);

    });

  }

  handleCoupons();
});




