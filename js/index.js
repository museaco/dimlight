window.__auther__ = 'bHVzaGVuZzEwdkAxNjMsY29t';
gsap.registerPlugin(ScrollTrigger);

$(window).on('load', function() {
  $('#page-loading').remove();

  gsap.from('img[data-img]', {
    y: 20,
    autoAlpha: 0,
    stagger: 0.25,
  });

  const dy_tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#dy-section',
      scrub: true,
      start: 'top bottom',
      end: 'bottom bottom',
      // markers: true,
      toggleActions: 'play none none reverse',
    },
  });

  dy_tl.from('#dy-section', { opacity: 0, y: '1.8rem', duration: 1 });

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

  function createDialogueAnimate({
    showBtn,
    hideBtn,
    modal,
  }) {
    /** 点击弹出 */
    $(showBtn).on('click', function() {
      const tl = gsap.timeline();
      tl.from(`${modal} [data-rule-modal-content] `, { scale: .9, duration: 0.4, opacity: 0, ease: 'back.out' });
      tl.to(modal, { autoAlpha: 1, duration: 0.2 }, '<');

    });

    /** 点击关闭*/
    $(hideBtn).on('click', function() {

      gsap.to(modal, { autoAlpha: 0, duration: 0.3 });
    });

  }

  createDialogueAnimate({
    showBtn: 'button[data-btn="rule"]',
    hideBtn: 'img[data-btn="close-rule"]',
    modal: '#rule-modal',
  });

});




