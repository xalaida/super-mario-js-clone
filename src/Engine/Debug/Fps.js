import Vector from '../Math/Vector.js';

export default class Fps {
  /**
   * Fps constructor
   *
   * @param {Config} config
   */
  constructor(config) {
    this.config = config;
    this.timestamp = 0;
    this.previousTimestamp = 0;
  }

  /**
   * Render the FPS
   *
   * @param {View} view
   */
  render(view) {
    view.text(`FPS: ${this.calculate()}`, new Vector(10, 20));
  }

  /**
   * Calculate the FPS value
   */
  calculate() {
    this.timestamp = performance.now();
    const dt = this.timestamp - this.previousTimestamp;
    this.previousTimestamp = this.timestamp;
    return Math.round(1 / (dt / 1000));
  }
}
