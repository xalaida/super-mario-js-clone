export default class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static zero() {
    return new Vector(0, 0);
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

  set(vector) {
    this.x = vector.x;
    this.y = vector.y;
    return this;
  }

  setX(x) {
    this.x = x;
    return this;
  }

  setY(y) {
    this.y = y;
    return this;
  }

  /**
   *
   * Below comes only with immutable methods
   *
   */

  plus(vector) {
    return new Vector(
      vector.x === null ? this.x : this.x + vector.x,
      vector.y === null ? this.y : this.y + vector.y,
    );
  }

  plusX(x) {
    return new Vector(
      this.x + x,
      this.y,
    );
  }

  plusY(y) {
    return new Vector(
      this.x,
      this.y + y,
    );
  }

  minus(vector) {
    return new Vector(
      vector.x === null ? this.x : this.x - vector.x,
      vector.y === null ? this.y : this.y - vector.y,
    );
  }

  minusX(x) {
    return new Vector(
      this.x - x,
      this.y,
    );
  }

  minusY(y) {
    return new Vector(
      this.x,
      this.y - y,
    );
  }

  multiply(vector) {
    return new Vector(
      vector.x === null ? this.x : this.x * vector.x,
      vector.y === null ? this.y : this.y * vector.y,
    );
  }

  scale(times) {
    return new Vector(
      this.x * times,
      this.y * times,
    );
  }
}
