import Vector from '../../../Engine/Math/Vector.js';
import AnimationPlayer from '../../../Engine/Graphic/Animations/AnimationPlayer.js';
import Entity from '../../../Engine/Behaviour/Entity.js';

const DIRECTION_RIGHT = 'right';
const DIRECTION_LEFT = 'left';

export default class Mario extends Entity {
  constructor(controller, animationMap) {
    super();
    this.controller = controller;
    this.velocity = Vector.zero();
    this.deceleration = new Vector(100, 0);
    this.accelaration = new Vector(100, 0);
    this.maxSpeed = 100;
    this.direction = DIRECTION_RIGHT;
    this.animationPlayer = new AnimationPlayer(animationMap);
  }

  update(deltaTime) {
    super.update(deltaTime);

    if (this.controller.isPressed('left')) {
      this.moveLeft(deltaTime);
    } else if (this.controller.isPressed('right')) {
      this.moveRight(deltaTime);
    } else {
      this.decelerate(deltaTime);
    }
  }

  moveLeft(deltaTime) {
    this.velocity.set(this.velocity.minusX(this.accelaration.scale(deltaTime)));

    if (Math.abs(this.velocity.x) > this.maxSpeed) {
      this.velocity.setX(-this.maxSpeed);
    }

    this.direction = DIRECTION_LEFT;
  }

  moveRight(deltaTime) {
    this.velocity.set(this.velocity.plusX(this.accelaration.scale(deltaTime)));

    if (Math.abs(this.velocity.x) > this.maxSpeed) {
      this.velocity.setX(this.maxSpeed);
    }

    this.direction = DIRECTION_RIGHT;
  }

  decelerate(deltaTime) {
    const deceleration = Math.min(Math.abs(this.velocity.x), this.deceleration.x * deltaTime);
    this.velocity.x += this.velocity.x > 0 ? -deceleration : deceleration;
  }

  render(view, camera) {
    view.spriteImage(this.animationFrame(), camera.getProjection(this.position), this.size);
  }

  animationFrame() {
    if (!this.component('jump').ready) {
      if (this.direction === DIRECTION_LEFT) {
        return this.animationPlayer.play('jumpLeft');
      }

      return this.animationPlayer.play('jumpRight');
    }

    if (this.velocity.x > 0) {
      if (this.direction === DIRECTION_LEFT) {
        return this.animationPlayer.play('breakLeft');
      }

      return this.animationPlayer.play('moveRight');
    }

    if (this.velocity.x < 0) {
      if (this.direction === DIRECTION_RIGHT) {
        return this.animationPlayer.play('breakRight');
      }

      return this.animationPlayer.play('moveLeft');
    }

    if (this.direction === DIRECTION_RIGHT) {
      return this.animationPlayer.play('idleRight');
    }

    return this.animationPlayer.play('idleLeft');
  }

  debug(view, camera) {
    this.renderJumpDebug(view);
    this.renderHitBox(view, camera);
    this.renderDebug(view);
  }

  renderDebug(view) {
    view.text(`Velocity X: ${this.velocity.x}`, new Vector(200, 20));
    view.text(`Velocity Y: ${this.velocity.y}`, new Vector(200, 40));
    view.text(`Position X: ${this.position.x}`, new Vector(200, 60));
    view.text(`Position Y: ${this.position.y}`, new Vector(200, 80));
  }

  renderHitBox(view, camera) {
    view.outline(camera.getProjection(this.position), this.size, game.config.debug.colors.hitBox);
  }

  renderJumpDebug(view) {
    view.text(`Jump ready: ${this.component('jump').ready}`, new Vector(200, 100));
    view.text(`Jump left time: ${this.component('jump').leftTime}`, new Vector(200, 120));
    view.text(`Jump request time: ${this.component('jump').requestTime}`, new Vector(200, 140));
    view.text(`Jump grace time: ${this.component('jump').graceTime}`, new Vector(200, 160));
  }
}
