export default class AnimationManager {
  /**
   * AnimationManager constructor
   */
  constructor() {
    this.animations = new Map();
  }

  /**
   * Add the new animation
   *
   * @param {String} name
   * @param {Animation} animation
   */
  add(name, animation) {
    this.animations.set(name, animation);
  }

  /**
   * Get an animation by name
   *
   * @param {String} name
   * @returns {Animation}
   */
  get(name) {
    return this.animations.get(name);
  }

  /**
   * Update all animations
   */
  update() {
    this.animations.forEach((animation) => {
      animation.update();
    });
  }
}
