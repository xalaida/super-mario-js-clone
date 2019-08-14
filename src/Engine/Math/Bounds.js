export default class Bounds {
  /**
   * Bounds constructor
   *
   * @param {Vector} position
   * @param {Size} size
   */
  constructor(position, size) {
    this.position = position;
    this.size = size;
  }

  /**
   * Get left bounds point
   *
   * @returns {Number}
   */
  get left() {
    return this.position.x;
  }

  /**
   * Get top bounds point
   *
   * @returns {Number}
   */
  get top() {
    return this.position.y;
  }

  /**
   * Get right bounds point
   *
   * @returns {Number}
   */
  get right() {
    return this.position.x + this.size.width;
  }

  /**
   * Get bottom bounds point
   *
   * @returns {Number}
   */
  get bottom() {
    return this.position.y + this.size.height;
  }

  /**
   * Get start (top - left) bounds point
   *
   * @returns {Vector}
   */
  get start() {
    return this.position;
  }

  /**
   * Get end (bottom - right) bounds point
   *
   * @returns {Vector}
   */
  get end() {
    return this.position.plus(this.size.toVector());
  }

  /**
   * Determine if bounds are intersected
   *
   * @param {Bounds} bounds
   * @returns {boolean}
   */
  intersects(bounds) {
    return this.left < bounds.right
      && bounds.left < this.right
      && this.top < bounds.bottom
      && bounds.top < this.bottom;
  }
}
