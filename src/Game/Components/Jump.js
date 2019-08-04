import Component from '../../Engine/Entities/Component.js';
import Vector from '../../Engine/Math/Vector.js';

/**
 * Jump supports the next things:
 * - Supports different height jumping with holding jump key
 * - Disable double jump in the air
 * - Disable infinity jump when key is pressed
 * - Disable jumping when entity just starts falling and tries to return back with jump
 */
export default class Jump extends Component {
  constructor(entity) {
    super('jump', entity);
    this.duration = 0.1;
    this.power = new Vector(0, -1000);
    this.ready = true;
    this.falling = false;
  }

  update(deltaTime) {
    if (this.entity.controller.isPressed('up')) {
      this.handleJump();
    } else {
      this.cancel();
      this.charge();
    }

    this.checkCollisions();
    this.perform(deltaTime);
  }

  handleJump() {
    if (this.ready && !this.entity.component('falling').state) {
      this.start();
    }
  }

  start() {
    this.ready = false;
    this.leftTime = this.duration;
  }

  cancel() {
    this.leftTime = 0;
  }

  charge() {
    if (!this.ready) {
      if (this.entity.component('collisions').isCollideBottom()) {
        this.ready = true;
      }
    }
  }

  checkCollisions() {
    if (this.entity.component('collisions').isCollideTop()) {
      this.cancel();
    }
  }

  perform(deltaTime) {
    if (this.leftTime > 0) {
      this.entity.velocity.set(
        this.entity.velocity.plus(this.power.scale(deltaTime)),
      );

      this.leftTime -= deltaTime;
    }
  }
}
