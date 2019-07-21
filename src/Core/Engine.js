export default class Engine {
  /**
   * 60 fps = 60 frames / 1000 ms = 1 frame / 16.666 ms
   *
   * @param game
   * @param fps
   */
  constructor(game, fps = 60) {
    this.game = game;
    this.fps = fps;

    this.deltaTime = 1000 / fps;
    this.previousTimestamp = 0;
    this.accumulatedTime = 0;
    this.maxStepTicks = 255;
  }

  /**
   * Run the game loop
   */
  run() {
    this.previousTimestamp = performance.now();
    this.loop(this.previousTimestamp);
  }

  /**
   * Game loop tick
   */
  tick() {
    this.game.update(this.getDeltaTime());
    this.game.render(this.getInterpolation());
  }

  /**
   * Get loop delta time
   * Can be used in update function for no fps dependent game experience:
   * this.position = this.position + (this.velocity * delta)
   *
   * @returns {number}
   */
  getDeltaTime() {
    return this.accumulatedTime / 1000;
  }

  /**
   * Get the interpolation value
   * Can be used inside render function this for smooth render:
   * let drawPosition = this.lastPosition + ((this.position - this.lastPosition) * interpolation)
   *
   * @returns {number}
   */
  getInterpolation() {
    return this.accumulatedTime / this.deltaTime;
  }

  /**
   * Game loop function
   *
   * @param timestamp
   */
  loop(timestamp) {
    // A difference with the previous timestamp
    this.accumulatedTime += (timestamp - this.previousTimestamp);

    // Update the previous timestamp for the next tick
    this.previousTimestamp = timestamp;

    // Run loop only while accumulated time is enough for next tick (bigger then delta frames time)
    this.currentStepTicks = 0;
    while (this.accumulatedTime > this.deltaTime) {
      this.tick();
      this.accumulatedTime -= this.deltaTime;
      this.currentStepTicks += 1;

      if (this.currentStepTicks > this.maxStepTicks) {
        this.stop();
      }
    }

    requestAnimationFrame(() => this.loop(performance.now()));
  }

  stop() {
    this.accumulatedTime = 0;
    throw new Error('Game loop reach max tick iterations per step');
  }
}
