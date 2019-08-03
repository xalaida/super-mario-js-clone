import Bounds from '../Math/Bounds.js';

export default class Tile {
  constructor(position, size, image, options = {}) {
    this.position = position;
    this.size = size;
    this.image = image;
    this.options = options;
  }

  getBounds() {
    return new Bounds(this.position, this.size);
  }

  render(view, camera) {
    view.spriteImage(this.image, this.position.minus(camera.position), this.size);
  }
}
