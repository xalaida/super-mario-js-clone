import Vector from '../Math/Vector.js';

export default class Fps {
  constructor(config) {
    this.config = config;
    this.value = 0;
    this.timestamp = 0;
    this.previousTimestamp = 0;
  }

  update() {
    this.timestamp = performance.now();

    const dt = this.timestamp - this.previousTimestamp;

    this.previousTimestamp = this.timestamp;

    this.value = Math.round(1 / (dt / 1000));
  }

  render(view) {
    view.text(`FPS: ${this.value}`, new Vector(this.config.width - 120, 20));
  }
}
