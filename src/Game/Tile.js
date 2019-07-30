/* eslint-disable import/extensions */
import Bounds from '../Utils/Bounds.js';

export default class Tile {
  constructor(type, image, position, size) {
    this.type = type;
    this.image = image;
    this.position = position;
    this.size = size;
    this.bounds = new Bounds(this.position, this.size);
  }

  render(view, camera) {
    view.image(this.image, this.position.minus(camera.position), this.size);
  }
}
