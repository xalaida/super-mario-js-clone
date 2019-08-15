import Component from '../../../../Engine/Behaviour/Component.js';
import Vector from '../../../../Engine/Math/Vector.js';

const STATE_WALKING = 'walking';
const STATE_HIDING = 'hiding';

export default class Behaviour extends Component {
  constructor(entity) {
    super('behaviour', entity);
    this.state = STATE_WALKING;
    this.hideDuration = 5;
    this.hideTime = 0;
  }

  update(deltaTime) {
    this.stompKillHandler();

    // Update hiding process
    if (this.state === STATE_HIDING) {
      this.hideTime += deltaTime;
    }

    if (this.hideTime > this.hideDuration) {
      this.show();
    }
  }

  stompKillHandler() {
    const stomper = this.getStomper();

    if (!stomper || this.entity.component('killable').dying) {
      return;
    }

    // TODO: refactor and move the bounce logic to stomp mario component
    //  and handle it inside the new stompable component
    if (stomper.component('falling').state) {
      // TODO: probably replace with jump
      stomper.component('stomp').bounce();
      this.handleStomp();
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

  handleStomp() {
    if (this.state === STATE_WALKING) {
      this.hide();
    }
  }

  hide() {
    this.hideTime = 0;
    this.entity.velocity.setX(0);
    this.state = STATE_HIDING;
  }

  show() {
    this.hideTime = 0;
    // TODO: fix with old entity velocity
    this.entity.velocity.set(new Vector(-20, 0));
    this.state = STATE_WALKING;
  }
}
