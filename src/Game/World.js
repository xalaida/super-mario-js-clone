/* eslint-disable import/extensions */
import Vector from '../Utils/Vector.js';

export default class World {
  constructor() {
    this.friction = new Vector(100, 100);
    this.gravity = new Vector(0, 800);
  }
}
