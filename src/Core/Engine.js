export default class Engine {
  constructor(game, fps = 60) {
    this.game = game;
    this.fps = fps;

    // 60 fps = 60 frames / 1000 ms = 1 frame / 16.666 ms
    this.deltaTime = 1000 / fps;
    this.lastTimestamp = 0;
    this.accumulatedTime = 0;
  }

  tick() {
    // this.game.update(delta);
    // this.game.render(interpolation);
    this.game.update(this.accumulatedTime / 1000);
    this.game.render();
  }

  loop(timestamp) {
    // A difference with the previous timestamp
    this.accumulatedTime += (timestamp - this.lastTimestamp);

    // Update the last timestamp for the next tick
    this.lastTimestamp = timestamp;

    // Run loop only while accumulated time is enough for next tick (bigger then delta frames time)
    while (this.accumulatedTime > this.deltaTime) {
      this.tick();
      this.accumulatedTime -= this.deltaTime;
    }

    // TODO: add dynamic resolved loop function
    // requestAnimationFrame(() => this.loop(performance.now()));
    setTimeout(() => {
      this.loop(performance.now());
    }, 1000 / this.fps);
  }

  run() {
    this.loop(0);
  }

  // TODO: add function to run simple loop
  simpleLoop() {
    this.game.update(fps);
    this.game.render(0);
  }
}
