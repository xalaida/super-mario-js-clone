import Vector from '../../../Engine/Math/Vector.js';
import Size from '../../../Engine/Math/Size.js';
import Bounds from '../../../Engine/Math/Bounds.js';
import AnimationSwitcher from '../../../Engine/Graphic/Animations/AnimationSwitcher.js';
import Entity from '../../../Engine/Behaviour/Entity.js';

export default class Goomba extends Entity {
  constructor(animations) {
    super();
    this.size = new Size(14, 16);
    this.position = new Vector(400, 200);
    this.velocity = new Vector(-20, 0);
    this.animationSwitcher = new AnimationSwitcher(animations);
  }

  getBounds() {
    return new Bounds(this.position, this.size);
  }

  update(deltaTime) {
    super.update(deltaTime);
  }

  render(view, camera) {
    view.spriteImage(this.animationFrame(), this.position.minus(camera.position), this.size);
  }

  animationFrame() {
    this.animationSwitcher.switch('move');
    return this.animationSwitcher.pull();
  }
}
