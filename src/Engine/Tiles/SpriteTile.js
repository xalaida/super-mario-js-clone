import Tile from './Tile.js';

export default class SpriteTile extends Tile {
  /**
   * SpriteTile constructor
   *
   * @param {SpriteImage} image
   * @param options
   */
  constructor(image, options = {}) {
    super();
    this.image = image;
    this.options = options;
  }

  /**
   * Render the sprite tile
   *
   * @param {View} view
   * @param {Camera} camera
   */
  render(view, camera) {
    view.spriteImage(this.image, this.position.minus(camera.position), this.size);
  }
}
