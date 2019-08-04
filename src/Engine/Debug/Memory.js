import Vector from '../Math/Vector.js';

export default class Fps {
  constructor(config) {
    this.config = config;
  }

  render(view) {
    view.text(`Memory used: ${performance.memory.usedJSHeapSize}`, new Vector(this.config.width - 120, 60));
    view.text(`Memory total: ${performance.memory.totalJSHeapSize}`, new Vector(this.config.width - 120, 40));
  }
}
