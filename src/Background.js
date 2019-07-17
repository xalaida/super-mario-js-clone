/* eslint-disable no-param-reassign */

export default class Background {
  constructor() {
    this.colors = [0, 0, 0];
    this.shifts = [1, 1, 1];
  }

  update() {
    for (let index = 0, size = this.colors.length; index < size; index += 1) {
      let color = this.colors[index];
      let shift = this.shifts[index];

      if (color + shift > 255 || color + shift < 0) {
        shift = Background.generateShift(shift);
      }

      color += shift;

      this.colors[index] = color;
      this.shifts[index] = shift;
    }
  }

  static generateShift(lastShift) {
    if (lastShift < 0) {
      return Math.floor(Math.random() * 2) + 1;
    }

    return Math.floor(Math.random() * -2) - 1;
  }

  render(context) {
    context.save();
    context.fillStyle = `rgb(${this.colors[0]},${this.colors[1]},${this.colors[2]})`;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.restore();
  }
}
