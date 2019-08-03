import Vector from '../Math/Vector.js';
import Bounds from '../Math/Bounds.js';

export default class Camera {
  constructor(position, size) {
    this.position = position;
    this.size = size;
    this.bounds = new Bounds(this.position, this.size);
  }

  render(view) {
    view.outline(Vector.zero(), this.size, '#00d8ff');
  }
}
