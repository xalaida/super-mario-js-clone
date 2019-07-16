export default class Engine {
  constructor(game) {
    this.game = game;
  }

  tick() {
    this.game.update();
    this.game.render();
  }

  run() {
    this.tick();

    requestAnimationFrame(() => this.run());
  }
}
