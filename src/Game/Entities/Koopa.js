import Vector from '../../Engine/Math/Vector.js';
import Size from '../../Engine/Math/Size.js';
import Bounds from '../../Engine/Math/Bounds.js';
import AnimationSwitcher from '../../Engine/Graphic/Animations/AnimationSwitcher.js';
import Entity from '../../Engine/Behaviour/Entity.js';

export default class Koopa extends Entity {
  constructor(animations) {
    super();
    this.size = new Size(14, 16);
    this.position = new Vector(350, 200);
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
    this.animationSwitcher.switch('move');
    return this.animationSwitcher.pull();
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