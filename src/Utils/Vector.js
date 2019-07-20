/* eslint-disable import/extensions */
import Position from './Position.js';

export default class Vector extends Position {
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
