import Tile from './Tile.js';

export default class AnimatedTile extends Tile {
  /**
   * AnimatedTile constructor
   *
   * @param animation
   * @param options
   */
  constructor(animation, options = {}) {
    super();
    this.animation = animation;
    this.options = options;
  }

  /**
   * Render the animated tile
   *
   * @param view
   * @param camera
   */
  render(view, camera) {
    view.spriteImage(this.animation.frame, this.position.minus(camera.position), this.size);
  }
}
