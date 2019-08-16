import Vector from '../../../Engine/Math/Vector.js';
import Size from '../../../Engine/Math/Size.js';
import AnimationPlayer from '../../../Engine/Graphic/Animations/AnimationPlayer.js';
import Entity from '../../../Engine/Behaviour/Entity.js';

export default class Koopa extends Entity {
  constructor(animations) {
    super();
    this.velocity = new Vector(-20, 0);
    this.animationPlayer = new AnimationPlayer(animations);
    this.drawBox = new Size(16, 24);
    this.offset = new Vector(1, 8);
  }

  update(deltaTime) {
    super.update(deltaTime);
  }

  render(view, camera) {
    view.spriteImage(
      this.animationFrame(),
      this.getDrawPosition(camera),
      this.drawBox,
    );
  }

  animationFrame() {
    this.routeAnimation();
    return this.animationPlayer.pull();
  }

  routeAnimation() {
    if (this.component('behaviour').state === 'hiding' || this.component('behaviour').state === 'panic') {
      return this.animationPlayer.play('hiding');
    }

    if (this.velocity.x > 0) {
      return this.animationPlayer.play('moveRight');
    }

    return this.animationPlayer.play('moveLeft');
  }

  debug(view, camera) {
    this.debugDrawBox(view, camera);
    this.debugHitBox(view, camera);
  }

  debugDrawBox(view, camera) {
    view.outline(this.getDrawPosition(camera), this.drawBox, game.config.debug.colors.drawBox);
  }

  getDrawPosition(camera) {
    return this.position.minus(this.offset).minus(camera.position);
  }

  debugHitBox(view, camera) {
    view.outline(
      this.position.minus(camera.position),
      this.size,
      game.config.debug.colors.hitBox,
    );
  }
}
