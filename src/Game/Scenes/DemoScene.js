import Scene from '../../Engine/Scenes/Scene.js';
import Vector from '../../Engine/Math/Vector.js';

export default class DemoScene extends Scene {
  /**
   * DemoScene constructor
   */
  constructor() {
    super();
    this.text = 'Demo scene';
  }

  /**
   * Render the scene
   *
   * @param {View} view
   */
  render(view) {
    view.clear();
    view.text(this.text, new Vector(10, 10));
  }
}
