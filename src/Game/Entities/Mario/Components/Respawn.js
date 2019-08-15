import Component from '../../../../Engine/Behaviour/Component.js';
import Vector from '../../../../Engine/Math/Vector.js';

export default class Respawn extends Component {
  constructor(entity) {
    super('respawn', entity);
    this.spawn = Vector.zero();
  }

  update() {
    if (this.entity.component('killable').dead) {
      this.respawn();
    }
  }

  respawn() {
    this.entity.component('killable').revive();
    this.entity.position.set(this.spawn);
  }
}
