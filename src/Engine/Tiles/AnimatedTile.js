import Tile from './Tile.js';

export default class AnimatedTile extends Tile {
  /**
   * AnimatedTile constructor
   *
   * @param {Animation} animation
   * @param {Object} options
   */
  constructor(animation, options = {}) {
    super();
    this.animation = animation;
    this.options = options;
  }

  /**
   * Render the animated tile
   *
   * @param {View} view
   * @param {Camera} camera
   */
  render(view, camera) {
    view.spriteImage(this.animation.frame, camera.getProjection(this.position), this.size);
  }
}
