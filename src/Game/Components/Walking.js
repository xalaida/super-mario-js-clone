import Component from '../../Engine/Behaviour/Component.js';

export default class Walking extends Component {
  /**
   * Walking constructor
   *
   * @param entity
   */
  constructor(entity) {
    super('walking', entity);
  }

  /**
   * Update the walking component
   * TODO: update with flipX method instead of hardcoded value
   */
  update() {
    if (this.entity.component('collisions').isCollideLeft()) {
      this.entity.velocity.setX(20);
    }

    if (this.entity.component('collisions').isCollideRight()) {
      this.entity.velocity.setX(-20);
    }
  }
}
