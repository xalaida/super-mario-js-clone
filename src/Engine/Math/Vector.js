export default class Vector {
  /**
   * Vector constructor
   * TODO: refactor all vectors with the NULL attribute (remove all checks to x/y === null in this class)
   *
   * @param {Number} x
   * @param {Number} y
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Zero vector factory
   *
   * @returns {Vector}
   */
  static zero() {
    return new Vector(0, 0);
  }

  /**
   * Set the vector values
   *
   * @param {Vector} vector
   * @returns {Vector}
   */
  set(vector) {
    this.x = vector.x;
    this.y = vector.y;
    return this;
  }

  /**
   * Set x value
   *
   * @param {Number} x
   * @returns {Vector}
   */
  setX(x) {
    this.x = x;
    return this;
  }

  /**
   * Set y value
   *
   * @param {Number} y
   * @returns {Vector}
   */
  setY(y) {
    this.y = y;
    return this;
  }

  /**
   * Add the vector
   *
   * @param {Vector} vector
   * @returns {Vector}
   */
  plus(vector) {
    return new Vector(
      vector.x === null || this.x === null ? this.x : this.x + vector.x,
      vector.y === null || this.y === null ? this.y : this.y + vector.y,
    );
  }

  /**
   * Plus x value to the vector
   *
   * @param {Vector} vector
   * @returns {Vector}
   */
  plusX(vector) {
    return new Vector(
      this.x + vector.x,
      this.y,
    );
  }

  /**
   * Plus y value to the vector
   *
   * @param {Vector} vector
   * @returns {Vector}
   */
  plusY(vector) {
    return new Vector(
      this.x,
      this.y + vector.y,
    );
  }

  /**
   * Minus the vector
   *
   * @param {Vector} vector
   * @returns {Vector}
   */
  minus(vector) {
    return new Vector(
      vector.x === null || this.x === null ? this.x : this.x - vector.x,
      vector.y === null || this.y === null ? this.y : this.y - vector.y,
    );
  }

  /**
   * Minus x value from the vector
   *
   * @param {Vector} vector
   * @returns {Vector}
   */
  minusX(vector) {
    return new Vector(
      this.x - vector.x,
      this.y,
    );
  }

  /**
   * Minus y value from the vector
   *
   * @param {Vector} vector
   * @returns {Vector}
   */
  minusY(vector) {
    return new Vector(
      this.x,
      this.y - vector.y,
    );
  }

  /**
   * Multiply the current vector with the given vector
   *
   * @param {Vector} vector
   * @returns {Vector}
   */
  multiply(vector) {
    return new Vector(
      vector.x === null || this.x === null ? this.x : this.x * vector.x,
      vector.y === null || this.y === null ? this.y : this.y * vector.y,
    );
  }

  /**
   * Divide the current vector with the given vector
   *
   * @param {Vector} vector
   * @returns {Vector}
   */
  divide(vector) {
    return new Vector(
      vector.x === null || this.x === null ? this.x : this.x / vector.x,
      vector.y === null || this.y === null ? this.y : this.y / vector.y,
    );
  }

  /**
   * Scale vector
   *
   * @param {Number} times
   * @returns {Vector}
   */
  scale(times) {
    return new Vector(
      this.x === null ? this.x : this.x * times,
      this.y === null ? this.y : this.y * times,
    );
  }

  /**
   * Floor the vector attributes
   *
   * @returns {Vector}
   */
  floor() {
    return new Vector(
      Math.floor(this.x),
      Math.floor(this.y),
    );
  }

  /**
   * Ceil the vector attributes
   *
   * @returns {Vector}
   */
  ceil() {
    return new Vector(
      Math.ceil(this.x),
      Math.ceil(this.y),
    );
  }

  /**
   * Get the absolute attributes of the vector
   *
   * @returns {Vector}
   */
  abs() {
    return new Vector(
      Math.abs(this.x),
      Math.abs(this.y),
    );
  }
}
