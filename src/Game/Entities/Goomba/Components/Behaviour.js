import Component from '../../../../Engine/Behaviour/Component.js';
import Vector from '../../../../Engine/Math/Vector.js';

export default class Behaviour extends Component {
  constructor(entity) {
    super('behaviour', entity);
  }

  update() {
    this.stompKillHandler();
  }

  stompKillHandler() {
    const stomper = this.getStomper();

    if (!stomper || this.entity.component('killable').dying) {
      return;
    }

    if (stomper.component('falling').state) {
      // TODO: probably replace with jump
      stomper.component('stomp').bounce();

      this.entity.component('killable').kill();

      this.entity.velocity.setX(0);
    } else {
      stomper.component('killable').kill();
    }
  }

  getStomper() {
    const intersectedEntity = this.entity.component('intersection').intersected;

    if (intersectedEntity && intersectedEntity.hasComponent('stomp')) {
      return intersectedEntity;
    }

    return null;
  }
}
