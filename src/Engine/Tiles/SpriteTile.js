import Tile from './Tile.js';

export default class SpriteTile extends Tile {
  /**
   * SpriteTile constructor
   *
   * @param image
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
   * @param view
   * @param camera
   */
  render(view, camera) {
    view.spriteImage(this.image, this.position.minus(camera.position), this.size);
  }
}
