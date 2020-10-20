import Line from "./Line/Obj.es6";

const noise = require("simplenoise");
export default class Controller {
  constructor(posi, num) {
    this.posi = posi;
    this.LENGTH = 1000;
    this.obj = new THREE.Group();
    this.width = 8;
    this.lines = [];
    this.NUM = this.verticalLength / this.width;
    console.log(this.verticalLength * (1 / 0.7));
    // this.NUM = 1;
    this.param = {
      height: 50,
      i: 3,
      offset: 100
    };
    this.setup();
  }

  setup() {
    for (let i = 0; i < this.NUM; i++) {
      const points = [];
      const p = {
        x: this.getVector(i).x + this.posi[0].x + 10,
        y: this.getVector(i).y + this.posi[0].y
      };
      const line = new Line(
        [
          {
            x: p.x,
            y: p.y
          }
        ],
        {
          height: 50 + (Math.sin((i / this.NUM) * Math.PI) + 1) * 10,
          i: 3,
          offset: 50
        }
      );
      this.obj.add(line.obj);
      this.lines.push(line);
    }

    window.dat.add(this.param, "height", 10, 500).onChange(e => {
      this.lines.forEach((line, i) => {
        line.config.height = i + e;
      });
    });
    window.dat.add(this.param, "i", 1, 10, 0.1).onChange(e => {
      this.lines.forEach((line, i) => {
        line.config.i = e;
      });
    });
    window.dat.add(this.param, "offset", 10, 1000).onChange(e => {
      this.lines.forEach((line, i) => {
        line.config.offset = e;
      });
    });
  }

  getVector(index) {
    const v = new THREE.Vector3(
      this.posi[0].x - this.posi[1].x,
      this.posi[0].y - this.posi[1].y,
      0
    ).normalize();

    return v.multiplyScalar(-index * this.width);
  }

  get verticalLength() {
    return (
      new THREE.Vector3(
        this.posi[0].x - this.posi[1].x,
        this.posi[0].y - this.posi[1].y,
        0
      ).length() * 0.7
    );
  }

  update() {
    const time = Date.now() / 4000 + Math.random() / 100;

    this.lines.forEach((line, index) => {
      // const time = (index + 1) * 0.0001;
      const i = index / 30;
      let n = noise.perlin2(i, time) * 10;
      // n = Math.abs(n) > 5 ? n * 0.8 : n;
      line.update(n);
    });
  }
}
