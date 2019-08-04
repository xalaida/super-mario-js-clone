import Grid from '../Math/Grid.js';
import Vector from '../Math/Vector.js';
import Tile from './Tile.js';

export default class TileMap {
  constructor(config, tileSize) {
    this.config = config;
    this.tileSize = tileSize;
    this.tiles = new Grid();
  }

  add(xIndex, yIndex, image, options = {}) {
    const tile = new Tile(this.toPosition(xIndex, yIndex), this.tileSize, image, options);
    this.tiles.set(xIndex, yIndex, tile);
  }

  get(xIndex, yIndex) {
    // TODO: fix if matrix has undefined coordinates
    return this.tiles.get(xIndex, yIndex);
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
    const { x: x1, y: y1 } = bounds.start.divide(this.tileSize.toVector()).floor();
    const { x: x2, y: y2 } = bounds.end.divide(this.tileSize.toVector()).ceil();

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

  render(view, camera) {
    this.findInBounds(camera.getBounds())
      .forEach((tile) => {
        tile.render(view, camera);

        if (this.config.debug.tiles) {
          view.outline(tile.position.minus(camera.position), tile.size, '#5993ab61');
        }
      });
  }

  toPosition(x, y) {
    return new Vector(
      x * this.tileSize.width,
      y * this.tileSize.height,
    );
  }

  toIndices(position) {
    const { x, y } = position.divide(this.tileSize.toVector()).floor();
    return [x, y];
  }
}
