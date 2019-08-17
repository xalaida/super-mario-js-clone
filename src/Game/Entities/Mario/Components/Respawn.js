import Component from '../../../../Engine/Behaviour/Component.js';
import Vector from '../../../../Engine/Math/Vector.js';

export default class Respawn extends Component {
  /**
   * Respawn constructor
   *
   * @param {Mario} entity
   * @param {Camera} camera
   */
  constructor(entity, camera) {
    super('respawn', entity);
    this.camera = camera;
    this.spawn = Vector.zero();
  }

  /**
   * Update the respawn component
   */
  update() {
    if (this.entity.component('killable').dead) {
      this.respawn();
    }
  }

  /**
   * Respawn the entity
   */
  respawn() {
    this.entity.component('killable').revive();
    this.entity.position.set(this.spawn);
    this.camera.focus();
  }
}
