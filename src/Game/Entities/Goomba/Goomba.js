import Vector from '../../../Engine/Math/Vector.js';
import Size from '../../../Engine/Math/Size.js';
import Bounds from '../../../Engine/Math/Bounds.js';
import AnimationSwitcher from '../../../Engine/Graphic/Animations/AnimationSwitcher.js';
import Entity from '../../../Engine/Behaviour/Entity.js';

export default class Goomba extends Entity {
  constructor(animations) {
    super();
    this.velocity = new Vector(-20, 0);
    this.animationSwitcher = new AnimationSwitcher(animations);
  }

  update(deltaTime) {
    super.update(deltaTime);
  }

  render(view, camera) {
    view.spriteImage(this.animationFrame(), this.position.minus(camera.position), this.size);
  }

  animationFrame() {
    this.routeAnimation();

    return this.animationSwitcher.pull();
  }

  routeAnimation() {
    if (this.component('killable').dying) {
      return this.animationSwitcher.switch('flat');
    }

    return this.animationSwitcher.switch('move');
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
