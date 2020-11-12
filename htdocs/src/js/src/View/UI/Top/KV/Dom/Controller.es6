import Base from "../Base/Controller.es6";

export default class Controller extends Base {
  constructor() {
    super();
  }

  init() {
    this.name = "DomController";
    this.ft = $(".footer").height();
  }

  show(menuBtnShow) {
    const header = $(".header");
    const $inner = $(".index-kv-inner.def");
    const $innerLine = $(".index-kv-inner.line");
    const logo = $(".header-logo");
    const menuBtn = $(".header-menu-btn");
    const $lead = $inner.find(".index-kv-lead");
    const $tit = $inner.find(".index-kv-title");
    const $leadL = $innerLine.find(".index-kv-lead");
    const $titL = $innerLine.find(".index-kv-title");
    const tl = new TimelineMax();

    // ready
    TweenMax.set($tit, { x: 100 });
    TweenMax.set($titL, { x: 100 });
    TweenMax.set($lead, { x: 20 });
    TweenMax.set($leadL, { x: 20 });

    tl
      // $tit show
      .to(
        $tit,
        0.01,
        {
          opacity: 1,
          ease: Expo.easeOut,
        },
        0.0
      )
      // $tit x
      .to(
        $tit,
        0.9,
        {
          x: 0,
          ease: Expo.easeOut,
        },
        0.0
      )

      // $titL show
      .to(
        $titL,
        0.01,
        {
          opacity: 1,
          ease: Expo.easeOut,
        },
        0.0
      )
      // $titL x
      .to(
        $titL,
        0.9,
        {
          x: 0,
          ease: Expo.easeOut,
        },
        0.05
      )

      // $lead x
      .to(
        $lead,
        1.5,
        {
          x: 0,
          opacity: 1,
          ease: Expo.easeOut,
        },
        0.2
      )

      // logo
      .to(
        logo,
        1,
        {
          opacity: 1,
          y: 0,
          ease: Expo.easeOut,
        },
        0.7
      )
      // btn
      .add(menuBtnShow(), 0.7);
  }

  update() {}

  canvasStop(st) {
    // // if (!$("body").hasClass("isIE")) return;
    // const ftop = $(".footer").offset().top - window.innerHeight;
    // if (ftop <= st) {
    //   $(".canvasWrap").css({
    //     bottom: this.ft,
    //   });
    //   $(".canvasWrap").addClass("absolute");
    // } else {
    //   $(".canvasWrap").removeClass("absolute");
    //   $(".canvasWrap").css({
    //     bottom: "",
    //   });
    // }
  }

  setEvent() {
    super.__setUpdateFlag(false);

    // $(window).on("scroll", (e) => {
    //   const st = $(window).scrollTop();
    //   this.canvasStop(st);
    // });
  }

  reset() {}
}
