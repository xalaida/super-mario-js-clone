export default class Animation {
  /**
   * Animation constructor
   *
   * @param {Array<SpriteImage>} frameSet
   * @param {Number} ticksPerFrame
   */
  constructor(frameSet, ticksPerFrame = 8) {
    this.frameSet = frameSet;
    this.ticksPerFrame = ticksPerFrame;
    this.frameIndex = 0;
    this.ticksCount = 0;
  }

  /**
   * Get the current animation frame
   *
   * @returns {SpriteImage}
   */
  get frame() {
    return this.frameSet[this.frameIndex];
  }

  /**
   * Update the animation
   */
  update() {
    this.ticksCount += 1;

    if (this.ticksCount > this.ticksPerFrame) {
      this.nextFrame();
      this.ticksCount = 0;
    }
  }

  /**
   * Go to the next frame
   */
  nextFrame() {
    this.frameIndex = (this.frameIndex + 1) % this.frameSet.length;
  }

  /**
   * Reset the animation
   */
  reset() {
    this.frameIndex = 0;
    this.ticksCount = 0;
  }
}
