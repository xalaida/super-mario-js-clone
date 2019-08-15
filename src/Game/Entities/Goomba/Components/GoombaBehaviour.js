import Component from '../../../../Engine/Behaviour/Component.js';
import Vector from '../../../../Engine/Math/Vector.js';

export default class GoombaBehaviour extends Component {
  constructor(entity) {
    super('behaviour', entity);
  }

  update() {
    const intersectedEntity = this.entity.component('intersection').intersected;

    if (intersectedEntity && intersectedEntity.hasComponent('stomp')) {
      this.entity.velocity.set(Vector.zero());
    }
  }
}
