/* eslint-disable no-param-reassign,import/extensions */
import Vector from './Utils/Vector.js';

export default class Fps {
  constructor() {
    this.value = 0;
  }

  update() {
    const lastTimestamp = this.timestamp || 0;
    this.timestamp = performance.now();
    const diff = this.timestamp - lastTimestamp;
    this.value = Math.round(1 / (diff / 1000));
  }

  render(view) {
    view.text(`FPS: ${this.value}`, new Vector(120, 20));
  }
}
