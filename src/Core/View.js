export default class View {
  // TODO: add height, width

  // TODO: add clear method

  constructor(context) {
    this.context = context;
  }

  render() {
    this.context.save();
    this.context.fillStyle = 'pink';
    this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.context.restore();
  }

  clear() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }
}
