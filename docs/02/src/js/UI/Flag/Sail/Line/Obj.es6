export default class Controller {
  constructor(posi, config) {
    //height,i,offset,offset_x
    this.posi = posi;
    this.config = config;
    this.NUM = 200;
    this.TIME = 0;
    this.setup();
  }

  setup() {
    const points = [];

    for (let i = 0; i < 100; i++) {
      const x = this.posi[0].x + i * 10;
      points.push(x, this.posi[0].y + this.sin(0, i), 0);
    }
    // const line = new MeshLine();
    // line.setGeometry(points);

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(100 * 3);
    geometry.addAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(points), 3)
    );

    const material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      depthTest: true
    });
    this.obj = new THREE.Line(geometry, material);
    this.obj.geometry.attributes.position.needsUpdate = true;

    this.pointsNUM = this.obj.geometry.attributes.position.array.length;
    // console.log(this.obj);
  }

  sin(t, i) {
    return (
      this.config.height *
      Math.sin((t * this.config.i + i) / this.config.offset)
    );
  }

  update() {
    ++this.TIME;
    // this.TIME = this.TIME % (Math.PI * 2);
    for (let i = 0; i < this.pointsNUM; i++) {
      if (i % 3 == 2 && i > 3) {
        // const py = ;
        this.obj.geometry.attributes.position.needsUpdate = true;
        this.obj.geometry.attributes.position.array[i] =
          Math.abs(Math.sin((i / this.NUM / 3) * Math.PI)) *
          this.sin(this.TIME * -1, i);
      }
    }
  }
}
