import Vector from '../Utils/Vector.js';

export default class Camera {
  constructor(position = null, size) {
    this.position = position;
    this.size = size;
  }

  render(view) {
    view.outline(Vector.zero(), this.size, '#00d8ff');
  }
}
