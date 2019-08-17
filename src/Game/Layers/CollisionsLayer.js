export default class CollisionsLayer {
  /**
   * CollisionsLayer constructor
   *
   * @param {TileMap} tileMap
   * @param {Map} entities
   */
  constructor(tileMap, entities) {
    this.tileMap = tileMap;
    this.entities = entities;
  }

  /**
   * Render the collisions layer
   *
   * @param {View} view
   * @param {Camera} camera
   */
  render(view, camera) {
    this.tileMap.render(view, camera);
    this.entities.forEach(entity => entity.render(view, camera));
  }
}
