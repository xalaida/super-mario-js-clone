/* eslint-disable no-param-reassign,import/extensions */
import Vector from './Utils/Vector.js';
import Size from './Utils/Size.js';

const FLOOR = 200;

export default class Player {
  constructor(controller, friction, gravity, image) {
    this.controller = controller;
    this.friction = friction;
    this.gravity = 5;
    this.image = image;
    this.color = '#718096';
    this.size = new Size(20, 20);
    this.position = new Vector(100, 300);
    this.velocity = new Vector(0, -50);
    this.jumping = false;
    this.tracks = [];
  }

  update(delta) {
    console.log(delta);
    // this.position.x += this.velocity.x * delta;
    this.position.y += this.velocity.y * delta;
    this.velocity.y += this.gravity * delta;

    // if (this.controller.state.left) {
    //   this.moveLeft();
    // }
    //
    // // TODO: add two functions: isPressed('right'),
    // // TODO: maybe add events to controller object, bind all move functions to them and listen keyUpOn('up') which set isJumpAllowed = true;
    // if (this.controller.state.right) {
    //   this.moveRight();
    // }
    //
    // // TODO: try to implement with pressed function which deletes status until second keydown event (from invadors.js)
    // if (this.controller.state.up) {
    //   this.jump();
    // }

    // this.track();

    // this.position = this.position.plus(this.velocity.multiply(new Vector(delta, delta)));
    //
    // // TODO: round parameter on low values
    // // TODO: add Vector function to plus only x or y (e.g. plusX(15), plusY(20))
    // this.velocity = this.velocity.plus(new Vector(null, this.gravity));

    // this.velocity = this.velocity.multiply(new Vector(this.friction, null)); // TODO: probably add friction also to Y

    // TODO: create World class and add to it collide(player) method which Game class will handle inside update loop
    // TODO: also add isCollidable prop to check if it is not Fps, Background or any other not
    //  colidable entity (in the future will be fixed with grid and availability of location vector)
    // if (this.position.y >= FLOOR) {
    //   this.velocity = this.velocity.multiply(new Vector(null, 0));
    //   this.position = new Vector(this.position.x, FLOOR);
    //   this.jumping = false;
    // }
    //
    // if (this.position.x <= 0) {
    //   this.velocity = this.velocity.multiply(new Vector(0, null));
    //   this.position = new Vector(0, this.position.y);
    // }
    //
    // if (this.position.x >= 500) {
    //   this.velocity = this.velocity.multiply(new Vector(0, null));
    //   this.position = new Vector(500, this.position.y);
    // }
  }

  moveLeft() {
    // TODO: check max speed with another vectors
    this.velocity = this.velocity.plus(new Vector(-0.05, null));
  }

  moveRight() {
    // TODO: check max speed with another vectors
    // TODO: probably dont return a new vector instance and just change the current (and to save possibility just add clone() method to Vector)
    this.velocity = this.velocity.plus(new Vector(0.05, null));
  }

  track() {
    if (this.currentFrame === undefined) {
      this.currentFrame = 2;
    }

    this.currentFrame -= 1;

    if (this.currentFrame < 1) {
      this.tracks.unshift(this.position);
      this.tracks = this.tracks.splice(0, 5);
      // console.log('unshifted');
      // console.log(this.position);
      // console.log(this.tracks);
      this.currentFrame = 2;
    }
  }

  jump() {
    if (this.jumping) {
      return;
    }

    this.velocity = this.velocity.plus(new Vector(null, -3));
    this.jumping = true;
  }

  render(view) {
    this.renderEntity(view);
    // this.renderTrack(view);
    this.renderDebug(view);
  }

  renderEntity(view) {
    view.image(this.image, this.position, this.size);
  }

  renderTrack(view) {
    // TODO: extract into util class
    const color = [113, 127, 150, 0.9];

    this.tracks.forEach((track) => {
      view.rectangle(track, this.size, `rgba(${color[0]},${color[1]},${color[2]},${color[3]})`);
      color[3] -= 0.2;
    });
  }

  renderDebug(view) {
    view.text(`Velocity X: ${this.velocity.x}`, new Vector(200, 20));
    view.text(`Velocity Y: ${this.velocity.y}`, new Vector(200, 40));
    view.text(`Position X: ${this.position.x}`, new Vector(200, 60));
    view.text(`Position Y: ${this.position.y}`, new Vector(200, 80));
  }
}
