import Component from '../../Engine/Behaviour/Component.js';

export default class Falling extends Component {
  /**
   * Falling constructor
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    super('falling', entity);
    this.state = false;
  }

  /**
   * Update the falling component
   */
  update() {
    this.setFromVelocity();
    this.checkCollisions();
  }

  /**
   * Set the falling state
   */
  setFromVelocity() {
    if (this.entity.velocity.y > 0) {
      this.state = true;
    }
  }

  /**
   * Check entity collisions
   */
  checkCollisions() {
    if (this.entity.component('collisions').getFromBottom()) {
      this.state = false;
    }
  }
}
