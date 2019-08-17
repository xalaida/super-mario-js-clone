import Vector from '../Math/Vector.js';
import Bounds from '../Math/Bounds.js';

export default class Camera {
  /**
   * Camera constructor
   *
   * @param {Vector} position
   * @param {Size} size
   */
  constructor(position, size) {
    this.position = position;
    this.size = size;
  }

  /**
   * Get the projection point relative to the camera view
   *
   * @param {Vector} position
   * @returns {Vector}
   */
  getProjection(position) {
    return position.minus(this.position);
  }

  /**
   * Get the camera bounds
   *
   * @returns {Bounds}
   */
  getBounds() {
    return new Bounds(this.position, this.size);
  }

  /**
   * Debug the camera bounds
   *
   * @param {View} view
   */
  debug(view) {
    view.outline(Vector.zero(), this.size, '#00d8ff');
  }

  /**
   * Follow the entity
   *
   * @param {Entity} entity
   */
  follow(entity) {
    this.target = entity;
  }

  /**
   * Focus on the target
   */
  focus() {
    this.position.setX(Math.max(0, this.target.position.x - 100));
  }

  /**
   * Update the camera
   */
  update() {
    if (Math.abs(this.target.velocity.x) > 1) {
      this.focus();
    }
  }
}
