import Scene from '../../Engine/Scenes/Scene.js';

export default class DemoScene extends Scene {
  constructor() {
    super();
    this.text = 'Demo scene';
  }

  render(view) {
    view.clear();
    view.text(this.text, { x: 10, y: 10 });
  }
}
