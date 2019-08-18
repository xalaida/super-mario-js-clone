import Grid from '../Math/Grid.js';
import Vector from '../Math/Vector.js';

export default class TileMap {
  /**
   * TileMap constructor
   *
   * @param {Config} config
   * @param {Size} tileSize
   */
  constructor(config, tileSize) {
    this.config = config;
    this.tileSize = tileSize;
    this.tiles = new Grid();
  }

  /**
   * Get the tile size of the tile map
   *
   * @returns {Size}
   */
  getTileSize() {
    return this.tileSize;
  }

  /**
   * Add a new tile to the tilemap
   *
   * @param {Number} xIndex
   * @param {Number} yIndex
   * @param {Tile} tile
   */
  add(xIndex, yIndex, tile) {
    tile.setPosition(this.toPosition(xIndex, yIndex));
    tile.setSize(this.getTileSize());
    this.tiles.set(xIndex, yIndex, tile);
  }

  /**
   * Get a tile by indices
   *
   * @param {Number} xIndex
   * @param {Number} yIndex
   * @returns {Tile|undefined}
   */
  get(xIndex, yIndex) {
    return this.tiles.get(xIndex, yIndex);
  }

  /**
   * Remove a tile by indices
   *
   * @param xIndex
   * @param yIndex
   */
  remove(xIndex, yIndex) {
    return this.tiles.remove(xIndex, yIndex);
  }

  /**
   * Remove a tile by position
   *
   * @param {Vector} position
   */
  removeByPosition(position) {
    const [xIndex, yIndex] = this.toIndices(position);
    return this.remove(xIndex, yIndex);
  }

  /**
   * Find a tile by the position
   *
   * @param {Vector} position
   * @returns {Tile|undefined}
   */
  findByPosition(position) {
    const [xIndex, yIndex] = this.toIndices(position);
    return this.get(xIndex, yIndex);
  }

  /**
   * Find tiles in the bounds area
   *
   * NOTICE! Method includes left and top side of the current tile
   * and does not include right and bottom side of the next tile
   *
   * @param {Bounds} bounds
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

  /**
   * Transform indices to the tilemap position
   *
   * @param {Number} xIndex
   * @param {Number} yIndex
   * @returns {Vector}
   */
  toPosition(xIndex, yIndex) {
    return new Vector(
      xIndex * this.tileSize.width,
      yIndex * this.tileSize.height,
    );
  }

  /**
   * Transform the position to the tilemap indices
   *
   * @param {Vector} position
   * @returns {Array}
   */
  toIndices(position) {
    const { x, y } = position.divide(this.tileSize.toVector()).floor();
    return [x, y];
  }

  /**
   * Render the tilemap
   *
   * @param {View} view
   * @param {Camera} camera
   */
  render(view, camera) {
    this.findInBounds(camera.getBounds())
      .forEach((tile) => {
        tile.render(view, camera);
      });
  }

  /**
   * Render the debug grid
   *
   * @param {View} view
   * @param {Camera} camera
   */
  debug(view, camera) {
    this.findInBounds(camera.getBounds())
      .forEach((tile) => {
        view.outline(camera.getProjection(tile.position), tile.size, game.config.debug.colors.tile);
      });
  }
}
