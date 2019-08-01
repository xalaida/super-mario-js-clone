/* eslint-disable import/extensions */
import Tile from './Tile.js';
import Matrix from '../Utils/Matrix.js';
import Vector from '../Utils/Vector.js';
import Bounds from '../Utils/Bounds.js';

export default class TileMap {
  // TODO: add rule if checking outside the matrix

  constructor(tileSize) {
    this.tileSize = tileSize;
    this.tiles = new Matrix();
  }

  // TODO: probably extract x, y into Coordinates class (or use the existing Vector)
  add(x, y, type, image) {
    this.tiles.set(x, y, new Tile(type, image, this.toPosition(x, y), this.tileSize));
  }

  get(x, y) {
    // TODO: fix if matrix has undefined coordinates
    return this.tiles.get(x, y);
  }

  findByPosition(position) {
    const [x, y] = this.toIndices(position);
    return this.get(x, y);
  }

  /**
   * NOTICE! Method includes left and top side of the current tile
   * and does not include right and bottom side of the next tile
   *
   * @param bounds
   * @returns {Array}
   */
  findInBounds(bounds) {
    // TODO: use toIndices()
    const x1 = Math.floor(bounds.left() / this.tileSize.width);
    const y1 = Math.floor(bounds.top() / this.tileSize.height);

    // TODO: add method for toIndices but with ceiling
    const x2 = Math.ceil(bounds.right() / this.tileSize.width);
    const y2 = Math.ceil(bounds.bottom() / this.tileSize.height);

    const tiles = [];

    for (let x = x1; x < x2; x += 1) {
      for (let y = y1; y < y2; y += 1) {
        const tile = this.get(x, y);

        if (tile) {
          tiles.push(tile);
        }
      }
    }

    return tiles;
  }

  // TODO: check usage
  forEach(callback) {
    this.tiles.forEach(callback);
  }

  render(view, camera) {
    // TODO: add buffer supports
    // TODO: if camera position does not change, do not rerender buffer and background at all

    this.findInBounds(new Bounds(camera.position, camera.size))
      .forEach((tile) => {
        tile.render(view, camera);
      });
  }

  toPosition(x, y) {
    return new Vector(
      x * this.tileSize.width,
      y * this.tileSize.height,
    );
  }

  toIndices(position) {
    return [
      Math.floor(position.x / this.tileSize.width),
      Math.floor(position.y / this.tileSize.height),
    ];
  }
}
