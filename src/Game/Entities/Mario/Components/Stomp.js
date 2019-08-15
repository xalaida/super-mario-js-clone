import Component from '../../../../Engine/Behaviour/Component.js';
import Vector from '../../../../Engine/Math/Vector.js';

export default class Stomp extends Component {
  constructor(entity) {
    super('stomp', entity);
    this.queueBounce = false;
    this.bounceVelocity = new Vector(0, -300);
  }

  bounce() {
    this.queueBounce = true;
  }

  update() {
    if (this.queueBounce) {
      this.entity.velocity.set(this.bounceVelocity);
      this.queueBounce = false;
    }
  }
}
