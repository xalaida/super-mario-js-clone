export default class Game {
  constructor(controller, view) {
    this.controller = controller;
    this.view = view;
  }

  update() {
    console.log('TICK');
  }

  render() {
    this.view.clear();
    this.renderControllerStatus();
    this.renderFps();
  }

  fps() {
    const lastTimestamp = this.timestamp || 0;

    this.timestamp = performance.now();

    const diff = this.timestamp - lastTimestamp;

    return Math.round(1 / (diff / 1000));
  }

  renderFps() {
    this.view.context.font = '16px';
    this.view.context.fillText(`FPS: ${this.fps()}`, 120, 10);
  }

  renderControllerStatus() {
    this.view.context.font = '16px';
    this.view.context.fillText(`UP: ${this.controller.state.up ? 'PRESSED' : 'NO'}`, 10, 10);
    this.view.context.fillText(`LEFT: ${this.controller.state.left ? 'PRESSED' : 'NO'}`, 10, 30);
    this.view.context.fillText(`RIGHT: ${this.controller.state.right ? 'PRESSED' : 'NO'}`, 10, 50);
    this.view.context.fillText(`DOWN: ${this.controller.state.down ? 'PRESSED' : 'NO'}`, 10, 70);
  }
}
