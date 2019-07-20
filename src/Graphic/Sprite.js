/* eslint-disable no-param-reassign,import/extensions */
import GameImage from './Image.js';

export default class Sprite {
  constructor(source) {
    this.source = new Image();
    this.source.src = source;
    this.definitions = new Map();
  }

  define(name, position, size) {
    this.definitions.set(name, new GameImage(this.source, position, size));
  }

  get(name) {
    return this.definitions.get(name);
  }
}
