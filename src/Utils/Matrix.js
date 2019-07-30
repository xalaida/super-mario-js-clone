export default class Matrix {
  constructor() {
    this.grid = [];
  }

  set(x, y, value) {
    if (!this.grid[x]) {
      this.grid[x] = [];
    }

    this.grid[x][y] = value;
  }

  get(x, y) {
    if (this.grid[x] === undefined || this.grid[x][y] === undefined) {
      return undefined;
    }

    return this.grid[x][y];
  }

  forEach(callback) {
    this.grid.forEach((row) => {
      row.forEach((cell) => {
        callback(cell);
      });
    });
  }
}
