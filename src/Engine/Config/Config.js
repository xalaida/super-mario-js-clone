export default class Config {
  /**
   * Config constructor
   *
   * @param {Object} options
   */
  constructor(options = {}) {
    this.fps = 60;
    this.showFps = false;
    this.showTileGrid = false;
    this.width = 400;
    this.height = 400;

    this.debug = {
      fps: false,
      memory: false,
      tiles: false,
    };

    this.merge(options);
  }

  /**
   * Merge config options
   *
   * @param {Object} options
   */
  merge(options) {
    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });
  }
}
