export default class Grid {
  /**
   * Grid constructor
   */
  constructor() {
    this.items = [];
  }

  /**
   * Set the value to the grid
   *
   * @param {Number} xIndex
   * @param {Number} yIndex
   * @param {*} value
   */
  set(xIndex, yIndex, value) {
    if (!this.items[xIndex]) {
      this.items[xIndex] = [];
    }

    this.items[xIndex][yIndex] = value;
  }

  /**
   * Get a value by coordinates
   *
   * @param {Number} xIndex
   * @param {Number} yIndex
   * @returns {*|undefined}
   */
  get(xIndex, yIndex) {
    if (this.items[xIndex] === undefined || this.items[xIndex][yIndex] === undefined) {
      return undefined;
    }

    return this.items[xIndex][yIndex];
  }

  /**
   * Iterate through a grid
   *
   * @param {Function} callback
   */
  forEach(callback) {
    this.items.forEach((row) => {
      row.forEach((cell) => {
        callback(cell);
      });
    });
  }
}
