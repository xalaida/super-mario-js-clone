import Vector from '../../../Engine/Math/Vector.js';
import Size from '../../../Engine/Math/Size.js';
import Bounds from '../../../Engine/Math/Bounds.js';
import AnimationSwitcher from '../../../Engine/Graphic/Animations/AnimationSwitcher.js';
import Entity from '../../../Engine/Behaviour/Entity.js';

export default class Koopa extends Entity {
  constructor(animations) {
    super();
    this.velocity = new Vector(-20, 0);
    this.animationSwitcher = new AnimationSwitcher(animations);
    this.drawBox = new Size(16, 24);
    this.offset = new Vector(1, 8);
  }

  getBounds() {
    return new Bounds(this.position, this.size);
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
    return this.animationSwitcher.pull();
  }

  routeAnimation() {
    if (this.component('behaviour').state === 'hiding' || this.component('behaviour').state === 'panic') {
      return this.animationSwitcher.switch('hiding');
    }

    if (this.velocity.x > 0) {
      return this.animationSwitcher.switch('moveRight');
    }

    return this.animationSwitcher.switch('moveLeft');
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
