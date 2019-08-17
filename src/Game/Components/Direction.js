import Component from '../../Engine/Behaviour/Component.js';

/**
 * Direction left constant
 *
 * @type {String}
 */
const DIRECTION_LEFT = 'left';

/**
 * Direction right constant
 *
 * @type {String}
 */
const DIRECTION_RIGHT = 'right';

export default class Direction extends Component {
  /**
   * Direction constructor
   *
   * @param {Entity} entity
   * @param {String} direction
   */
  constructor(entity, direction = DIRECTION_RIGHT) {
    super('direction', entity);
    this.state = direction;
  }

  /**
   * Create the component with the init right direction
   *
   * @param {Entity} entity
   * @returns {Direction}
   */
  static right(entity) {
    return new Direction(entity, DIRECTION_RIGHT);
  }

  /**
   * Create the component with the init left direction
   *
   * @param {Entity} entity
   * @returns {Direction}
   */
  static left(entity) {
    return new Direction(entity, DIRECTION_LEFT);
  }

  /**
   * Set the direction state as right
   */
  turnRight() {
    this.state = DIRECTION_RIGHT;
  }

  /**
   * Set the direction state as left
   */
  turnLeft() {
    this.state = DIRECTION_LEFT;
  }

  /**
   * Determine if the direction state is right
   *
   * @returns {Boolean}
   */
  isRight() {
    return this.state === DIRECTION_RIGHT;
  }

  /**
   * Determine if the direction state is left
   *
   * @returns {Boolean}
   */
  isLeft() {
    return this.state === DIRECTION_LEFT;
  }

  /**
   * Set the direction state from the entity velocity
   */
  setFromVelocity() {
    this.state = this.entity.velocity.x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
  }

  /**
   * Convert the direction state to the sign
   *
   * @returns {Number}
   */
  toSign() {
    if (this.isRight()) {
      return 1;
    }

    return -1;
  }
}
