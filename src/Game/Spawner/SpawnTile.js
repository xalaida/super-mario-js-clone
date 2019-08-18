import Tile from '../../Engine/Tiles/Tile.js';

export default class SpawnTile extends Tile {
  /**
   * SpawnTile constructor
   *
   * @param {String} enemy
   */
  constructor(enemy) {
    super();
    this.enemy = enemy;
  }
}
