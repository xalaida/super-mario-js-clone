export default class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(vector) {
    return new Vector(
      vector.x === null ? this.x : this.x + vector.x,
      vector.y === null ? this.y : this.y + vector.y,
    );
  }

  multiply(vector) {
    return new Vector(
      vector.x === null ? this.x : this.x * vector.x,
      vector.y === null ? this.y : this.y * vector.y,
    );
  }
}
