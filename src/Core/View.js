export default class View {
  // TODO: add height, width

  constructor(context) {
    this.context = context;
  }

  clear() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }

  rectangle(vector, rect, color = '#1A202C') {
    this.context.save();
    this.context.fillStyle = color;
    this.context.fillRect(Math.floor(vector.x), Math.floor(vector.y), rect.width, rect.height);
    this.context.restore();
  }

  text(text, vector, color = '#1A202C', size = '14px') {
    this.context.save();
    this.context.font = size;
    this.context.fillStyle = color;
    this.context.fillText(text, vector.x, vector.y);
    this.context.restore();
  }
}
