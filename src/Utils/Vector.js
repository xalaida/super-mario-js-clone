export default class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static zero() {
    return new Vector(0, 0);
  }

  setX(x) {
    this.x = x;
  }

  setY(y) {
    this.y = y;
  }

  plus(vector) {
    return new Vector(
      vector.x === null ? this.x : this.x + vector.x,
      vector.y === null ? this.y : this.y + vector.y,
    );
  }

  minus(vector) {
    return new Vector(
      vector.x === null ? this.x : this.x - vector.x,
      vector.y === null ? this.y : this.y - vector.y,
    );
  }

  minusX(vector) {
    return new Vector(this.x - vector.x, this.y);
  }

  multiply(vector) {
    return new Vector(
      vector.x === null ? this.x : this.x * vector.x,
      vector.y === null ? this.y : this.y * vector.y,
    );
  }

  times(times) {
    return new Vector(
      this.x * times,
      this.y * times,
    );
  }

  round() {
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
}
