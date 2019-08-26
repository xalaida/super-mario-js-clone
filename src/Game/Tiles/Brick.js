import Tile from '../../Engine/Tiles/Tile.js';
import Vector from '../../Engine/Math/Vector.js';

export default class Brick extends Tile {
  /**
   * SpriteTile constructor
   *
   * @param {SpriteImage} image
   * @param {Object} options
   */
  constructor(image, options = {}) {
    super();
    this.image = image;
    this.options = options;
    this.offset = new Vector(0, 0);
    this.up = false;
    this.bumped = false;
  }

  // TODO: add to mario feature HitBlocks where it checks collidable from top block

  getRenderablePosition() {
    if (!this.bumped) {
      return;
    }

    if (this.up) {
      this.offset.y -= 0.5;
    } else {
      this.offset.y += 0.5;
    }

    if (this.offset.y <= -5) {
      this.up = false;
    } else if (this.offset.y === 0) {
      this.bumped = false;
    }
  }

  bump() {
    if (this.bumped) {
      this.up = true;
      this.bumped = true;
    }
  }

  /**
   * Render the sprite tile
   *
   * @param {View} view
   * @param {Camera} camera
   */
  render(view, camera) {
    view.spriteImage(this.image, camera.getProjection(this.position.plus(this.offset)), this.size);
  }
}
