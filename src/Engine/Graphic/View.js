export default class View {
  /**
   * View constructor
   * TODO: remove all floor methods from vector
   * TODO: pass from outside prepared vector with .floor() method
   *
   * @param {CanvasRenderingContext2D} context
   */
  constructor(context) {
    this.context = context;
  }

  /**
   * Clear the view context
   */
  clear() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }

  /**
   * Fill the view context with color
   *
   * @param {String} color
   */
  fill(color) {
    this.context.save();
    this.context.fillStyle = color;
    this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.context.restore();
  }

  /**
   * Draw a rectangle
   *
   * @param {Vector} position
   * @param {Size} size
   * @param {String} color
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
   * @param {String} text
   * @param {Vector} position
   * @param {String} color
   * @param {String} fontSize
   */
  text(text, position, color = 'black', fontSize = '14px') {
    this.context.save();
    this.context.font = fontSize;
    this.context.fillStyle = color;
    this.context.fillText(text, position.x, position.y);
    this.context.restore();
  }

  /**
   * Draw a box outline
   *
   * @param {Vector} position
   * @param {Size} size
   * @param {String} color
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
   * Render an image at the position with the given size
   *
   * @param {SpriteImage} image
   * @param {Vector} position
   * @param {Size} size
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
