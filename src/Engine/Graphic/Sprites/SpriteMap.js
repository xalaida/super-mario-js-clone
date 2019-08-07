import SpriteImage from './SpriteImage.js';

export default class SpriteMap {
  /**
   * SpriteMap constructor
   *
   * @param {String} source
   */
  constructor(source) {
    this.source = source;
    this.definitions = new Map();
  }

  /**
   * Define a sprite image
   *
   * @param {String} name
   * @param {Vector} position
   * @param {Size} size
   */
  define(name, position, size) {
    this.definitions.set(name, new SpriteImage(this.source, position, size));
  }

  /**
   * Get a defined sprite image
   *
   * @param {String} name
   */
  get(name) {
    return this.definitions.get(name);
  }
}
