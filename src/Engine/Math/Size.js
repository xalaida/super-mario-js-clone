import Vector from './Vector.js';

export default class Size {
  /**
   * Size constructor
   *
   * @param {Number} width
   * @param {Number} height
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  /**
   * Pixel size factory method
   *
   * @returns {Size}
   */
  static pixel() {
    return new Size(1, 1);
  }

  /**
   * Set the size width
   *
   * @param {Number} width
   * @returns {Size}
   */
  setWidth(width) {
    this.width = width;
    return this;
  }

  /**
   * Set the size height
   *
   * @param {Number} height
   * @returns {Size}
   */
  setHeight(height) {
    this.height = height;
    return this;
  }

  /**
   * Convert the size into the 2D vector
   *
   * @returns {Vector}
   */
  toVector() {
    return new Vector(
      this.width,
      this.height,
    );
  }
}
