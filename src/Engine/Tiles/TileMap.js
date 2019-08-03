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
    // TODO: try to use always CEIL for current game model

    // TODO: use toIndices()
    const x1 = Math.floor(bounds.left / this.tileSize.width);
    const y1 = Math.floor(bounds.top / this.tileSize.height);

    // TODO: add method for toIndices but with ceiling
    const x2 = Math.ceil(bounds.right / this.tileSize.width);
    const y2 = Math.ceil(bounds.bottom / this.tileSize.height);

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

    this.findInBounds(camera.bounds)
      .forEach((tile) => {
        tile.render(view, camera);

        if (this.config.debug.tiles) {
          view.outline(tile.position, tile.size, '#5993ab61');
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
    return [
      Math.ceil(position.x / this.tileSize.width),
      Math.ceil(position.y / this.tileSize.height),
    ];
  }
}
