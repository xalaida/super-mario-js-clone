export default class View {
  constructor(context) {
    this.context = context;
  }

  clear() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }

  rectangle(position, size, color = '#1A202C') {
    this.context.save();
    this.context.fillStyle = color;
    this.context.fillRect(Math.floor(position.x), Math.floor(position.y), size.width, size.height);
    this.context.restore();
  }

  text(text, vector, color = '#1A202C', size = '14px') {
    this.context.save();
    this.context.font = size;
    this.context.fillStyle = color;
    this.context.fillText(text, vector.x, vector.y);
    this.context.restore();
  }

  /**
   * Render image at the position with the given size
   *
   * @param image
   * @param position
   * @param size
   */
  image(image, position, size) {
    this.context.drawImage(
      image.source,
      image.position.x, image.position.y, image.size.width, image.size.height,
      position.x, position.y, size.width, size.height,
    );
  }
}
