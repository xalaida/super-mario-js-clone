export default class Grid {
  constructor() {
    this.items = [];
  }

  set(xIndex, yIndex, value) {
    if (!this.items[xIndex]) {
      this.items[xIndex] = [];
    }

    this.items[xIndex][yIndex] = value;
  }

  get(xIndex, yIndex) {
    if (this.items[xIndex] === undefined || this.items[xIndex][yIndex] === undefined) {
      return undefined;
    }

    return this.items[xIndex][yIndex];
  }

  forEach(callback) {
    this.items.forEach((row) => {
      row.forEach((cell) => {
        callback(cell);
      });
    });
  }
}
