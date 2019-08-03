export default class AnimationManager {
  constructor() {
    this.animations = new Map();
  }

  add(name, animation) {
    this.animations.set(name, animation);
  }

  get(name) {
    return this.animations.get(name);
  }

  updateAll() {
    this.animations.forEach((animation) => {
      animation.update();
    });
  }
}
