import Vector from './Vector.js';

export default class Size {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toVector() {
    return new Vector(
      this.width,
      this.height,
    );
  }
}
