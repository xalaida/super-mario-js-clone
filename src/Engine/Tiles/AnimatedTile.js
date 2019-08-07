import Tile from './Tile.js';

export default class AnimatedTile extends Tile {
  constructor(animation, options = {}) {
    super();
    this.animation = animation;
    this.options = options;
  }

  render(view, camera) {
    view.spriteImage(this.animation.frame, this.position.minus(camera.position), this.size);
  }
}
