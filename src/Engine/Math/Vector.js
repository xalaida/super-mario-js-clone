export default class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static zero() {
    return new Vector(0, 0);
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

  plus(vector) {
    return new Vector(
      vector.x === null || this.x === null ? this.x : this.x + vector.x,
      vector.y === null || this.y === null ? this.y : this.y + vector.y,
    );
  }

  plusX(vector) {
    return new Vector(
      this.x + vector.x,
      this.y,
    );
  }

  plusY(vector) {
    return new Vector(
      this.x,
      this.y + vector.y,
    );
  }

  minus(vector) {
    return new Vector(
      vector.x === null || this.x === null ? this.x : this.x - vector.x,
      vector.y === null || this.y === null ? this.y : this.y - vector.y,
    );
  }

  minusX(vector) {
    return new Vector(
      this.x - vector.x,
      this.y,
    );
  }

  minusY(vector) {
    return new Vector(
      this.x,
      this.y - vector.y,
    );
  }

  multiply(vector) {
    return new Vector(
      vector.x === null || this.x === null ? this.x : this.x * vector.x,
      vector.y === null || this.y === null ? this.y : this.y * vector.y,
    );
  }

  divide(vector) {
    return new Vector(
      vector.x === null || this.x === null ? this.x : this.x / vector.x,
      vector.y === null || this.y === null ? this.y : this.y / vector.y,
    );
  }

  scale(times) {
    return new Vector(
      this.x === null ? this.x : this.x * times,
      this.y === null ? this.y : this.y * times,
    );
  }

  floor() {
    return new Vector(
      Math.floor(this.x),
      Math.floor(this.y),
    );
  }

  ceil() {
    return new Vector(
      Math.ceil(this.x),
      Math.ceil(this.y),
    );
  }

  abs() {
    return new Vector(
      Math.abs(this.x),
      Math.abs(this.y),
    );
  }
}
