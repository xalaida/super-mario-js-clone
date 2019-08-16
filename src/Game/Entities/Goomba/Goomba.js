import Vector from '../../../Engine/Math/Vector.js';
import AnimationPlayer from '../../../Engine/Graphic/Animations/AnimationPlayer.js';
import Entity from '../../../Engine/Behaviour/Entity.js';

export default class Goomba extends Entity {
  constructor(animations) {
    super();
    this.velocity = new Vector(-20, 0);
    this.animationPlayer = new AnimationPlayer(animations);
  }

  update(deltaTime) {
    super.update(deltaTime);
  }

  render(view, camera) {
    view.spriteImage(this.animationFrame(), this.position.minus(camera.position), this.size);
  }

  animationFrame() {
    this.routeAnimation();

    return this.animationPlayer.pull();
  }

  routeAnimation() {
    if (this.component('killable').dying) {
      return this.animationPlayer.play('flat');
    }

    return this.animationPlayer.play('move');
  }

  debug(view, camera) {
    this.debugHitBox(view, camera);
  }

  debugHitBox(view, camera) {
    view.outline(
      this.position.minus(camera.position),
      this.size,
      game.config.debug.colors.hitBox,
    );
  }
}
