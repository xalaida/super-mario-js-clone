export default class AnimationPlayer {
  /**
   * AnimationPlayer constructor
   *
   * @param {Map<String, Animation>} animationsMap
   */
  constructor(animationsMap = null) {
    this.animations = animationsMap || new Map();
    this.current = null;
  }

  /**
   * Add the animation to the player
   *
   * @param {String} name
   * @param {Animation} animation
   */
  add(name, animation) {
    this.animations.set(name, animation);
  }

  /**
   * Get the animation by the name
   *
   * @param {String} name
   * @returns {Animation}
   */
  get(name) {
    return this.animations.get(name);
  }

  /**
   * Continue playing the animation or switch to the new one if currently playing another animation
   *
   * @param {String} name
   * @returns {SpriteImage}
   */
  play(name) {
    this.switch(name);
    return this.pull();
  }

  /**
   * Switch the current animation to the new one
   *
   * @param {String} name
   */
  switch(name) {
    this.guardUndefinedAnimation(name);

    if (this.current === name) {
      return;
    }

    this.current = name;
  }

  /**
   * Pull the currently playing animation frame
   *
   * @returns {SpriteImage}
   */
  pull() {
    const animation = this.get(this.current);

    const animationFrame = animation.frame;

    animation.update();

    return animationFrame;
  }

  /**
   * Guard against undefined animation
   *
   * @param {String} name
   */
  guardUndefinedAnimation(name) {
    if (!this.animations.has(name)) {
      throw new Error(`Undefined animation ${name}`);
    }
  }
}
