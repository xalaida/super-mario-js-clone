/* eslint-disable no-param-reassign,import/extensions */
import Vector from './Utils/Vector.js';
import Rect from './Utils/Rect.js';

const FLOOR = 200;

export default class Player {
  constructor(controller, friction, gravity) {
    this.controller = controller;
    this.friction = friction;
    this.gravity = 0.5;
    this.color = '#718096';
    this.size = new Rect(10, 20);
    this.position = new Vector(100, 100);
    this.velocity = new Vector(0, 0);
    this.jumping = false;
    this.tracks = [];
  }

  update() {
    if (this.controller.state.left) {
      this.moveLeft();
    }

    if (this.controller.state.right) {
      this.moveRight();
    }

    // TODO: try to implement with pressed function which deletes status until second keydown event (from invadors.js)
    if (this.controller.state.up) {
      this.jump();
    }

    this.track();

    this.position = this.position.plus(this.velocity);

    // TODO: round parameter on low values
    this.velocity = this.velocity.plus(new Vector(null, this.gravity));
    this.velocity = this.velocity.multiply(new Vector(this.friction, null));

    if (this.position.y >= FLOOR) {
      this.velocity = this.velocity.multiply(new Vector(null, 0));
      this.position = new Vector(this.position.x, FLOOR);
      this.jumping = false;
    }

    if (this.position.x <= 0) {
      this.velocity = this.velocity.multiply(new Vector(0, null));
      this.position = new Vector(0, this.position.y);
    }

    if (this.position.x >= 500) {
      this.velocity = this.velocity.multiply(new Vector(0, null));
      this.position = new Vector(500, this.position.y);
    }
  }

  moveLeft() {
    // TODO: check max speed with another vectors
    this.velocity = this.velocity.plus(new Vector(-0.5, null));
  }

  moveRight() {
    // TODO: check max speed with another vectors
    this.velocity = this.velocity.plus(new Vector(0.5, null));
  }

  track() {
    if (this.currentFrame === undefined) {
      this.currentFrame = 3;
    }

    this.currentFrame -= 1;

    if (this.currentFrame < 1) {
      this.tracks.unshift(this.position);
      this.tracks = this.tracks.splice(0, 5);
      console.log('unshifted');
      console.log(this.position);
      console.log(this.tracks);
      this.currentFrame = 5;
    }
  }

  jump() {
    if (this.jumping) {
      return;
    }

    this.velocity = this.velocity.plus(new Vector(null, -8));
    this.jumping = true;
  }

  render(view) {
    this.renderEntity(view);
    this.renderTrack(view);
    this.renderDebug(view);
  }

  renderEntity(view) {
    view.rectangle(this.position, this.size, this.color);
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
  }
}
