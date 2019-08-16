import Component from '../../Engine/Behaviour/Component.js';

export default class Walking extends Component {
  /**
   * Walking constructor
   *
   * @param entity
   */
  constructor(entity) {
    super('walking', entity);
    this.speed = 20;
  }

  /**
   * Set the walking speed
   *
   * @param speed
   */
  setSpeed(speed) {
    this.speed = speed;
  }

  /**
   * Update the walking component
   */
  update() {
    if (this.entity.component('collisions').isCollideLeft()) {
      this.entity.velocity.setX(this.speed);
    }

    if (this.entity.component('collisions').isCollideRight()) {
      this.entity.velocity.setX(-this.speed);
    }
  }
}
