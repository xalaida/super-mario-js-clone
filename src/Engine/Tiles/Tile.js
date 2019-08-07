import Bounds from '../Math/Bounds.js';

export default class Tile {
  /**
   * Set the tile position
   *
   * @param {Vector} position
   */
  setPosition(position) {
    this.position = position;
  }

  /**
   * Set the tile size
   *
   * @param {Size} size
   */
  setSize(size) {
    this.size = size;
  }

  /**
   * Get the tile bounds
   *
   * @returns {Bounds}
   */
  getBounds() {
    return new Bounds(this.position, this.size);
  }

  /**
   * Tile render function
   */
  render() {
    console.log(`Override the tile ${this.constructor.name} render function`);
  }
}
