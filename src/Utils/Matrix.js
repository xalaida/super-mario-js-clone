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
