import Component from '../../Engine/Behaviour/Component.js';

export default class Walking extends Component {
  /**
   * Walking constructor
   *
   * @param {Entity} entity
   * @param {Number} speed
   */
  constructor(entity, speed = 20) {
    super('walking', entity);
    this.speed = speed;
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
    if (this.entity.component('collisions').getFromLeft()) {
      this.entity.velocity.setX(this.speed);
    }

    if (this.entity.component('collisions').getFromRight()) {
      this.entity.velocity.setX(-this.speed);
    }
  }
}
