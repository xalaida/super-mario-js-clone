import Vector from '../../Engine/Math/Vector.js';
import Size from '../../Engine/Math/Size.js';
import Bounds from '../../Engine/Math/Bounds.js';
import AnimationSwitcher from '../../Engine/Graphic/Animations/AnimationSwitcher.js';

const DIRECTION_RIGHT = 'right';
const DIRECTION_LEFT = 'left';

export default class Mario {
  constructor(controller, animationMap) {
    this.controller = controller;
    this.gravity = new Vector(0, 3000);
    this.size = new Size(14, 16);
    this.position = new Vector(100, 200);
    this.velocity = Vector.zero();
    this.maxSpeed = 1000;
    this.jumping = false;
    this.direction = DIRECTION_RIGHT;

    this.animationSwitcher = new AnimationSwitcher(animationMap);
  }

  getBounds() {
    return new Bounds(this.position, this.size);
  }

  update(deltaTime) {
    // TODO: correct feature orders: [go -> jump -> velocity]

    if (this.controller.isPressed('left')) {
      this.moveLeft(deltaTime);
    }

    if (this.controller.isPressed('right')) {
      this.moveRight(deltaTime);
    }

    if (this.controller.isPressed('up')) {
      this.jump(deltaTime);
    }

    // this.velocity = this.velocity.plus(this.gravity.times(deltaTime));
    // this.position = this.position.plus(this.velocity.times(deltaTime));

    // // TODO: round parameter on low values
    // // TODO: add Vector function to plus only x or y (e.g. plusX(15), plusY(20))
    // this.velocity = this.velocity.plus(new Vector(null, this.gravity));

    // this.velocity = this.velocity.multiply(new Vector(0.9, null)); // TODO: probably add friction also to Y

    // TODO: create World class and add to it collide(player) method which Game class will handle inside update loop
    // TODO: also add isCollidable prop to check if it is not Fps, Background or any other not
    //  colidable entity (in the future will be fixed with grid and availability of location vector)

    // if (this.position.y >= FLOOR) {
    //   this.velocity = this.velocity.multiply(new Vector(null, 0));
    //   this.position = new Vector(this.position.x, FLOOR);
    //   this.jumping = false;
    // }

    // //
    // // if (this.position.x <= 0) {
    // //   this.velocity = this.velocity.multiply(new Vector(0, null));
    // //   this.position = new Vector(0, this.position.y);
    // // }
    // //

    // if (this.position.x >= 500) {
    //   this.velocity = this.velocity.multiply(new Vector(0, null));
    //   this.position = new Vector(500, this.position.y);
    // }
  }

  moveLeft(deltaTime) {
    // TODO: check max speed with another vectors
    // this.velocity = this.velocity.plus(new Vector(-0.05, null));
    this.velocity = new Vector(-this.maxSpeed * deltaTime, this.velocity.y);
    this.direction = DIRECTION_LEFT;
  }

  moveRight(deltaTime) {
    // TODO: check max speed with another vectors
    // TODO: probably dont return a new vector instance and just change the current (and to save possibility just add clone() method to Vector)
    // this.velocity = this.velocity.plus(new Vector(0.05, null));
    this.velocity = new Vector(this.maxSpeed * deltaTime, this.velocity.y);
    this.direction = DIRECTION_RIGHT;
  }

  jump() {
    if (this.jumping) {
      return;
    }

    console.log('jumping');

    this.jumping = true;
    this.velocity = this.velocity.plus(new Vector(null, -400));
  }

  render(view, camera) {
    this.renderEntity(view, camera);
    this.renderDebug(view);
    this.renderHitBox(view, camera);
  }

  animationFrame() {
    if (this.velocity.x === 0) {
      if (this.direction === DIRECTION_RIGHT) {
        this.animationSwitcher.switch('idleRight');
      } else {
        this.animationSwitcher.switch('idleLeft');
      }
    }

    if (this.velocity.x > 0) {
      this.animationSwitcher.switch('moveRight');
    }

    if (this.velocity.x < 0) {
      this.animationSwitcher.switch('moveLeft');
    }

    return this.animationSwitcher.pull();
  }

  renderEntity(view, camera) {
    view.spriteImage(this.animationFrame(), this.position.minus(camera.position), this.size);
  }

  renderDebug(view) {
    view.text(`Velocity X: ${this.velocity.x}`, new Vector(200, 20));
    view.text(`Velocity Y: ${this.velocity.y}`, new Vector(200, 40));
    view.text(`Position X: ${this.position.x}`, new Vector(200, 60));
    view.text(`Position Y: ${this.position.y}`, new Vector(200, 80));
  }

  renderHitBox(view, camera) {
    view.outline(this.position.minus(camera.position), this.size, 'blue');
  }
}
