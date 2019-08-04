import Component from '../../Engine/Entities/Component.js';

export default class Falling extends Component {
  constructor(entity) {
    super('falling', entity);
    this.state = false;
  }

  /**
   * Update the falling component
   */
  update() {
    this.setState();
    this.checkCollisions();
  }

  /**
   * Set falling state
   */
  setState() {
    if (this.entity.velocity.y > 0) {
      this.state = true;
    }
  }

  /**
   * Check the entity collisions
   */
  checkCollisions() {
    if (this.entity.component('collisions').isCollideBottom()) {
      this.state = false;
    }
  }
}
