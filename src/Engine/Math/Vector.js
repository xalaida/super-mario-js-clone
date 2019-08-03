export default class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  copy() {
    return new Vector(this.x, this.y);
  }

  static zero() {
    return new Vector(0, 0);
  }

  setX(x) {
    this.x = x;
    return this;
  }

  setY(y) {
    this.y = y;
    return this;
  }

  plus(vector) {
    this.x = vector.x === null ? this.x : this.x + vector.x;
    this.y = vector.y === null ? this.y : this.y + vector.y;
    return this;
  }

  minus(vector) {
    this.x = vector.x === null ? this.x : this.x - vector.x;
    this.y = vector.y === null ? this.y : this.y - vector.y;
    return this;
  }

  multiply(vector) {
    this.x = vector.x === null ? this.x : this.x * vector.x;
    this.y = vector.y === null ? this.y : this.y * vector.y;
    return this;
  }

  scale(times) {
    this.x *= times;
    this.y *= times;
    return this;
  }

  floor() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this;
  }

  ceil() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this;
  }
}
