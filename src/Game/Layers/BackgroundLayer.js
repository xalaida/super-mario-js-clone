export default class BackgroundLayer {
  /**
   * BackgroundLayer constructor
   *
   * @param {TileMap} tileMap
   */
  constructor(tileMap) {
    this.tileMap = tileMap;
  }

  /**
   * Render the background layer
   *
   * @param {View} view
   * @param {Camera} camera
   */
  render(view, camera) {
    this.tileMap.render(view, camera);
  }
}
