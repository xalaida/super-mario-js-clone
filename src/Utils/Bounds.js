/* eslint-disable import/extensions */
import Vector from './Vector.js';

export default class Bounds {
  constructor(position, size) {
    this.position = position;
    this.size = size;
  }

  left() {
    return this.position.x;
  }

  top() {
    return this.position.y;
  }

  right() {
    return this.position.x + this.size.width;
  }

  bottom() {
    return this.position.y + this.size.height;
  }

  topLeft() {
    return this.position;
  }

  bottomRight() {
    return this.position.plus(new Vector(this.size.width, this.size.height));
  }
}
