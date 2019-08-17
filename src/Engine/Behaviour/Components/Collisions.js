import Component from '../Component.js';

export default class Collisions extends Component {
  /**
   * Collisions constructor
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    super('collisions', entity);
    this.init();
  }

  /**
   * Init collisions states
   */
  init() {
    this.state = {
      up: null,
      down: null,
      left: null,
      right: null,
    };
  }

  /**
   * Set a collision from the top side
   *
   * @param {Tile} tile
   */
  setFromTop(tile) {
    this.state.top = tile;
  }

  /**
   * Set a collision from the right side
   *
   * @param {Tile} tile
   */
  setFromRight(tile) {
    this.state.right = tile;
  }

  /**
   * Set a collision from the bottom side
   *
   * @param {Tile} tile
   */
  setFromBottom(tile) {
    this.state.bottom = tile;
  }

  /**
   * Set a collision from the left side
   *
   * @param {Tile} tile
   */
  setFromLeft(tile) {
    this.state.left = tile;
  }

  /**
   * Get a collision from the top side
   *
   * @returns {Tile|null}
   */
  getFromTop() {
    return this.state.top;
  }

  /**
   * Get a collision from the right side
   *
   * @returns {Tile|null}
   */
  getFromRight() {
    return this.state.right;
  }

  /**
   * Get a collision from the bottom side
   *
   * @returns {Tile|null}
   */
  getFromBottom() {
    return this.state.bottom;
  }

  /**
   * Get a collision from the left side
   *
   * @returns {Tile|null}
   */
  getFromLeft() {
    return this.state.left;
  }

  /**
   * Reset all collisions state
   */
  reset() {
    this.state.right = false;
    this.state.left = false;
    this.state.top = false;
    this.state.bottom = false;
  }

  /**
   * Update the collision state
   */
  update() {
    this.reset();
  }
}
