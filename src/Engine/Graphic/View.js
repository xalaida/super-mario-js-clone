export default class View {
  /**
   * Create a view for game rendering control
   *
   * @param context
   */
  constructor(context) {
    this.context = context;
  }

  /**
   * Clear view context
   */
  clear() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }

  /**
   * Draw a rectangle
   *
   * @param position
   * @param size
   * @param color
   */
  rectangle(position, size, color = 'blue') {
    this.context.save();
    this.context.fillStyle = color;
    this.context.fillRect(Math.floor(position.x), Math.floor(position.y), size.width, size.height);
    this.context.restore();
  }

  /**
   * Draw a text
   *
   * @param text
   * @param vector
   * @param color
   * @param size
   */
  text(text, vector, color = 'black', size = '14px') {
    this.context.save();
    this.context.font = size;
    this.context.fillStyle = color;
    this.context.fillText(text, vector.x, vector.y);
    this.context.restore();
  }

  /**
   * Draw a box outline
   *
   * @param position
   * @param size
   * @param color
   */
  outline(position, size, color = 'green') {
    this.context.save();
    this.context.strokeStyle = color;
    this.context.beginPath();
    this.context.rect(Math.floor(position.x), Math.floor(position.y), size.width, size.height);
    this.context.stroke();
    this.context.restore();
  }

  /**
   * Render image at the position with the given size
   *
   * @param image
   * @param position
   * @param size
   */
  spriteImage(image, position, size) {
    this.context.drawImage(
      image.source,
      image.position.x, image.position.y,
      image.size.width, image.size.height,
      Math.floor(position.x), Math.floor(position.y),
      size.width, size.height,
    );
  }
}
