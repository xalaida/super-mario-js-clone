/* eslint-disable import/extensions */
import Vector from '../Utils/Vector.js';

export default class Game {
  constructor(controller, view) {
    // TODO: add World object
    // TODO: add layers to allow draw entities at the correct layer
    // Probably remove controller from here and left only with player
    this.controller = controller;
    this.view = view;
    this.entities = [];
    this.friction = 0.9;
    this.gravity = 0.5;
  }

  update(delta) {
    this.entities.forEach((entity) => {
      entity.update(delta);
    });
  }

  render() {
    this.view.clear();

    this.entities.forEach((entity) => {
      entity.render(this.view);
    });

    this.renderControllerStatus();
  }

  add(entity) {
    this.entities.push(entity);
  }

  renderControllerStatus() {
    this.view.text(`UP: ${this.controller.state.up ? 'PRESSED' : 'NO'}`, new Vector(10, 20));
    this.view.text(`LEFT: ${this.controller.state.left ? 'PRESSED' : 'NO'}`, new Vector(10, 40));
    this.view.text(`RIGHT: ${this.controller.state.right ? 'PRESSED' : 'NO'}`, new Vector(10, 60));
    this.view.text(`DOWN: ${this.controller.state.down ? 'PRESSED' : 'NO'}`, new Vector(10, 80));
  }
}
