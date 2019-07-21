/* eslint-disable import/extensions */
import Tile from './Tile.js';
import Matrix from '../Utils/Matrix.js';
import Position from '../Utils/Position.js';

export default class TileMap {
  constructor(tileSize) {
    this.tileSize = tileSize;
    this.tiles = new Matrix();
  }

  add(x, y, image) {
    this.tiles.set(x, y, new Tile(image, this.toPosition(x, y), this.tileSize));
  }

  toPosition(x, y) {
    return new Position(
      Math.floor(x) * this.tileSize.width,
      Math.floor(y) * this.tileSize.height,
    );
  }

  toIndices(position) {
    // TODO: feature method
  }

  forEach(callback) {
    this.tiles.forEach(callback);
  }
}
