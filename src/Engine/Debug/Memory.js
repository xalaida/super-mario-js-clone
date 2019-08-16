import Vector from '../Math/Vector.js';

export default class Memory {
  /**
   * Memory constructor
   *
   * @param {Config} config
   */
  constructor(config) {
    this.positionLineUsed = new Vector(config.width - 120, 60);
    this.positionLineTotal = new Vector(config.width - 120, 40);
  }

  /**
   * Render the memory info
   *
   * @param {View} view
   */
  render(view) {
    view.text(`Memory used: ${Memory.format(performance.memory.usedJSHeapSize)}`, this.positionLineUsed);
    view.text(`Memory total: ${Memory.format(performance.memory.totalJSHeapSize)}`, this.positionLineTotal);
  }

  /**
   * Translate bytes amount to human readable format
   *
   * @param {Number} bytes
   * @param {Number} decimals
   * @returns {string}
   */
  static format(bytes, decimals = 2) {
    if (bytes === 0) {
      return '0 Bytes';
    }

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / (k ** i)).toFixed(dm))} ${sizes[i]}`;
  }
}
