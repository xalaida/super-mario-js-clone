import SpriteImage from './SpriteImage.js';

export default class SpriteMap {
  constructor(source) {
    this.source = source;
    this.definitions = new Map();
  }

  define(name, position, size) {
    this.definitions.set(name, new SpriteImage(this.source, position, size));
  }

  get(name) {
    return this.definitions.get(name);
  }
}
