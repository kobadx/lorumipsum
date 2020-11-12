import Base from "./Base/Controller.es6";
import Flag from "./Flag/Controller.es6";
import Dom from "./Dom/Controller.es6";
export default class Controller extends Base {
  constructor() {
    super();
  }

  init() {
    this.name = "UIController";
    this.flag = new Flag();
    this.dom = new Dom();
    this.$c = $("canvas");
  }

  timeline(menuBtnShow = e => {}) {
    return new Promise((resolve, reject) => {
      var tl = new TimelineMax({ delay: 0.0 });

      tl

        // ------------------------------------------------------------
        // canvas
        // ------------------------------------------------------------
        // canvasをop1に
        .add(() => {
          TweenMax.to(this.$c, 2.0, {
            opacity: 1,
            ease: Power2.easeInOut
          });
        }, 0.0)

        // draw line
        // 広がる
        //   y,z
        .add(() => {
          this.flag.show();
        }, 0.2)

        // effectを強める
        .add(() => {
          TweenMax.to(this.flag.setup.effectBloom, 2.0, {
            strength: 6,
            ease: Power2.easeInOut
          });
          // TweenMax.to(this.flag.setup.effectBloom, 1.5, {
          //   radius: 3,
          //   ease: Power2.easeInOut,
          // });
        }, 0.2 + 1.5)

        // カメラひくとき → zでゆっくり、パパっと一気に移動 → infocusで書いてる
        //   rgb, blur, zigzag, gunya, glitch(テレビ線など)→ kddi
        //     1frame強めの → this.frameか？
        //     3frame弱めでrandomなのを2、3回？

        //   composerに入れる → soyフォルダに書いてるか？
        .add(() => {
          // camera
          var tl = new TimelineMax();

          tl
            // ゆっくり引く
            .to(
              this.flag.setup.camera.position,
              2.0,
              {
                z: this.flag.setup.defz,
                ease: Expo.easeInOut
              },
              0.0
            )
            // パッと引く
            .to(
              this.flag.setup.camera.position,
              0.01,
              {
                z: this.flag.setup.defz * 0.85,
                ease: Expo.easeOut,
                onStart: () => {
                  this.flag.defY = -window.innerHeight * 0.5 + 375; // yを正しい位置に
                  this.flag.tar = -window.innerHeight * 0.5 + 375; // yを正しい位置に
                  // this.flag.setup.effectBloom.threshold = 0.03;
                  this.flag.setup.effectBloom.strength = 10;
                  this.flag.setup.effectBloom.radius = 3;
                  this.flag.setup.renderer.toneMappingExposure = Math.pow(
                    1.5,
                    4.0
                  );
                }
              },
              0.8
            )
            // 再度ゆっくり
            .to(
              this.flag.setup.camera.position,
              4.5,
              {
                z: this.flag.setup.defz * 1.1,
                ease: Expo.easeOut,
                onStart: () => {
                  // TweenMax.killTWeensOf(this.flag.setup.effectBloom.strength);
                  // this.flag.setup.effectBloom.threshold = 0.14;
                  this.flag.setup.effectBloom.strength = 2;
                  this.flag.setup.effectBloom.radius = 0.3;
                  this.flag.setup.renderer.toneMappingExposure = Math.pow(
                    1.3,
                    4.0
                  );
                }
              },
              0.8 + 0.05
            );
        }, 0.2 + 3.8)

        // bg line
        .add(() => {
          //scrollを解除
          $(".id_top").removeClass("fixed");
          this.flag.bg.show();
        }, 0.2 + 3.8 + 1.2)
        // dom
        .add(() => {
          this.dom.show(menuBtnShow);
        }, 0.2 + 3.8 + 0.9)
        .add(() => {
          resolve();
        }, 0.2 + 6.0);
    });
  }

  setEvent() {
    super.__setUpdateFlag(false);
  }

  reset() {}
}
