export default class Loop {
  /**
   * For 60 fps - it's 60 frames / 1000 ms and it is 1 frame / 16.666 ms
   *
   * @param game
   * @param fps
   */
  constructor(game, fps = 60) {
    this.game = game;
    this.fps = fps;
    this.frameStep = 1000 / fps;
    this.previousTimestamp = 0;
    this.accumulation = 0;
  }

  /**
   * Run the game loop
   */
  run() {
    this.previousTimestamp = performance.now();
    this.loop(this.previousTimestamp);
  }

  /**
   * Game loop function
   *
   * @param timestamp
   */
  loop(timestamp) {
    const deltaTime = this.calculateDeltaTime(timestamp);
    this.accumulation += deltaTime;
    this.previousTimestamp = timestamp;

    while (this.accumulation > this.frameStep) {
      this.game.update(this.getDeltaTimeInSeconds());

      this.accumulation -= this.frameStep;
    }

    this.game.render(this.getInterpolation());

    requestAnimationFrame(this.loop.bind(this));
  }

  /**
   * Calculates delta time in milliseconds with previous timestamp
   * Allows to make a fps-independent game
   * Min 1000 is used for Chrome Dead Tabs fix (not active tabs)
   *
   * @param timestamp
   * @returns {number}
   */
  calculateDeltaTime(timestamp) {
    return Math.min(1000, timestamp - this.previousTimestamp);
  }

  /**
   * Get the loop delta time in seconds
   * Can be used in update function for a fps independent the game experience:
   * this.position = this.position + (this.velocity * delta)
   *
   * @returns {number}
   */
  getDeltaTimeInSeconds() {
    return this.accumulation / 1000;
  }

  /**
   * Get an interpolation value
   * Can be used inside render function this for smooth render:
   * let drawPosition = this.lastPosition + ((this.position - this.lastPosition) * interpolation)
   *
   * @returns {number}
   */
  getInterpolation() {
    return this.accumulation / this.frameStep;
  }
}
