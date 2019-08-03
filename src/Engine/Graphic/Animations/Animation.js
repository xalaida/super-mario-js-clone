export default class Animation {
  constructor(frameSet, ticksPerFrame = 10) {
    this.frameSet = frameSet;
    this.ticksPerFrame = ticksPerFrame;
    this.frameIndex = 0;
    this.ticksCount = 0;
  }

  get frame() {
    return this.frameSet[this.frameIndex];
  }

  update() {
    this.ticksCount += 1;

    if (this.ticksCount > this.ticksPerFrame) {
      this.nextFrame();
      this.ticksCount = 0;
    }
  }

  nextFrame() {
    this.frameIndex = (this.frameIndex + 1) % this.frameSet.length;
  }

  reset() {
    this.frameIndex = 0;
    this.ticksCount = 0;
  }
}
