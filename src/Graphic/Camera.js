import Vector from '../Utils/Vector.js';

export default class Camera {
  constructor(position = null) {
    this.position = position || Vector.zero();
  }
}
