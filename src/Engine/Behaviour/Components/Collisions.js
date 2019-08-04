import Component from '../Component.js';

export default class Collisions extends Component {
  constructor(entity) {
    super('collisions', entity);
    this.init();
  }

  /**
   * Init collisions states
   */
  init() {
    this.state = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
  }

  /**
   * Set a collision from the top side
   */
  collideTop() {
    this.state.top = true;
  }

  /**
   * Set a collision from the right side
   */
  collideRight() {
    this.state.right = true;
  }

  /**
   * Set a collision from the bottom side
   */
  collideBottom() {
    this.state.bottom = true;
  }

  /**
   * Set a collision from the left side
   */
  collideLeft() {
    this.state.left = true;
  }

  /**
   * Determine if top side has a collision
   */
  isCollideTop() {
    return this.state.top;
  }

  /**
   * Determine if right side has a collision
   */
  isCollideRight() {
    return this.state.right;
  }

  /**
   * Determine if bottom side has a collision
   */
  isCollideBottom() {
    return this.state.bottom;
  }

  /**
   * Determine if left side has a collision
   */
  isCollideLeft() {
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
