/* eslint-disable no-param-reassign,import/extensions */
import Vector from './Utils/Vector.js';
import Rect from './Utils/Rect.js';

export default class Player {
  constructor(controller, friction, gravity) {
    this.controller = controller;
    this.friction = friction;
    this.gravity = gravity;
    this.color = '#718096';
    this.size = new Rect(10, 20);
    this.position = new Vector(100, 100);
    this.velocity = new Vector(0, 0);
    this.jumping = false;
  }

  update() {
    if (this.controller.state.left) {
      this.moveLeft();
    }

    if (this.controller.state.right) {
      this.moveRight();
    }

    this.position = this.position.plus(this.velocity);
    this.velocity = this.velocity.multiply(new Vector(this.friction, null));
  }

  moveLeft() {
    this.velocity = this.velocity.plus(new Vector(-0.5, null));
  }

  moveRight() {
    this.velocity = this.velocity.plus(new Vector(0.5, null));
  }

  render(view) {
    this.renderEntity(view);
    this.renderDebug(view);
  }

  renderEntity(view) {
    view.rectangle(this.position, this.size, this.color);
  }

  renderDebug(view) {
    view.text(`Velocity X: ${this.velocity.x}`, new Vector(200, 20));
    view.text(`Velocity Y: ${this.velocity.y}`, new Vector(200, 40));
  }
}
