/* eslint-disable class-methods-use-this */

export default class State {
  /**
   * State constructor
   *
   * @param {Koopa} entity
   */
  constructor(entity) {
    this.entity = entity;
  }

  /**
   * Update the state
   */
  update() {}

  /**
   * On stomp handler
   */
  onStomp() {
    throw new Error(`Define the onStomp() method in the ${this.constructor.name} class`);
  }

  /**
   * On touch handler
   */
  onTouch() {
    throw new Error(`Define the onTouch() method in the ${this.constructor.name} class`);
  }

  /**
   * Get animation frame for the entity in the state
   *
   * @returns {SpriteImage}
   */
  getAnimationFrame() {
    throw new Error(`Define the getAnimationFrame() method in the ${this.constructor.name} class`);
  }
}
