//--------------------------------------------------
//
//  Controller
//
//--------------------------------------------------

import Base from "_MyLibs/Util/Base.es6";

export default class Controller extends Base {
  constructor(ele) {
    super();
    this.$ele = $(ele);

    this.setup();
    this.setEvents();

    // this.timeline();
  }

  setup() {}

  timeline() {}

  update() {}

  onResize() {}

  show() {
    const tl = new TimelineMax();
    const $line = this.$ele.find(".menu-close-line span");

    $line.each((i, e) => {
      tl.to(
        e,
        0.5,
        {
          scaleX: 1,
          ease: Expo.easeOut,
          startAt: {
            "transform-origin": "100% 0",
            x: 0,
            rotation: i == 0 ? -30 : 30
          }
        },
        i * 0.1
      );
    });
    tl.to(
      this.$ele.find(".menu-close-text"),
      1,
      {
        x: 0,
        opacity: 1,
        ease: Expo.easeOut,
        startAt: {
          x: 10
        }
      },
      0
    );
    return tl;
  }

  hide() {
    if (this.tl) this.tl.kill();

    const tl = new TimelineMax();
    const $line = this.$ele.find(".menu-close-line span");
    $line.each((i, e) => {
      tl.set(
        e,
        {
          x: 8,
          rotation: i == 0 ? 30 : -30,
          "transform-origin": "0 0"
        },
        0
      );
      tl.to(
        e,
        0.5,
        {
          scaleX: 0,
          ease: Expo.easeOut
        },
        i * 0.1
      );
    });
    tl.to(
      this.$ele.find(".menu-close-text"),
      1,
      {
        x: -10,
        opacity: 0,
        ease: Expo.easeOut
      },
      0
    );
    return tl;
  }

  showHover() {
    const tl = new TimelineMax();
    const $line = this.$ele.find(".menu-close-line span");
    $line.each((i, e) => {
      tl.set(
        e,
        {
          x: 8,
          rotation: i == 0 ? 30 : -30,
          "transform-origin": "0 0"
        },
        0
      );
      tl.to(
        e,
        0.5,
        {
          scaleX: 0,
          ease: Expo.easeOut
        },
        i * 0.1
      );
    });
    $line.each((i, e) => {
      tl.to(
        e,
        0.5,
        {
          scaleX: 1,
          ease: Expo.easeOut,
          startAt: {
            "transform-origin": "100% 0",
            x: 0,
            rotation: i == 0 ? -30 : 30
          }
        },
        i * 0.1 + 0.5
      );
    });
    return tl;
  }

  onEnter() {
    // console.log(this.tl);
    // this.tl.kill();
    if (this.tl) this.tl.kill();
    this.tl = new TimelineMax();

    this.tl.add(this.showHover());
  }

  setEvents() {
    super.setEvents();

    this.$ele.on("mouseenter." + this.name, this.onEnter.bind(this));

    this.$ele.on("touchstart." + this.name, this.onEnter.bind(this));
  }
}
