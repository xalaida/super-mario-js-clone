import Grid from '../Math/Grid.js';
import Vector from '../Math/Vector.js';

export default class TileMap {
  /**
   * TileMap constructor
   *
   * @param config
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
   * Get a tile by coordinates
   *
   * @param {Number} xIndex
   * @param {Number} yIndex
   * @returns {Tile|undefined}
   */
  get(xIndex, yIndex) {
    return this.tiles.get(xIndex, yIndex);
  }

  /**
   * Find a tile by the position
   *
   * @param {Vector} position
   * @returns {Tile|undefined}
   */
  findByPosition(position) {
    const [x, y] = this.toIndices(position);
    return this.get(x, y);
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
   * Render the tilemap
   *
   * @param {View} view
   * @param {Camera} camera
   */
  render(view, camera) {
    this.findInBounds(camera.getBounds())
      .forEach((tile) => {
        tile.render(view, camera);

        if (this.config.debug.tiles) {
          view.outline(tile.position.minus(camera.position), tile.size, '#5993ab61');
        }
      });
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
}
