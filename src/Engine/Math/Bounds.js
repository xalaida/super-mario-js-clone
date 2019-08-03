import Vector from './Vector.js';

export default class Bounds {
  constructor(position, size) {
    this.position = position;
    this.size = size;
  }

  get left() {
    return this.position.x;
  }

  get top() {
    return this.position.y;
  }

  get right() {
    return this.position.x + this.size.width;
  }

  get bottom() {
    return this.position.y + this.size.height;
  }

  get start() {
    return this.position;
  }

  get end() {
    return this.position.plus(new Vector(this.size.width, this.size.height));
  }
}
