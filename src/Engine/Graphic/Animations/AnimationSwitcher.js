// TODO: rename to animation player (and main method play())
// TODO: probably use play() as merge result of method switch + pull and add separate switch to allow switching without pulling
export default class AnimationSwitcher {
  constructor(animationMap = null) {
    this.animations = animationMap || new Map();
    this.current = null;
  }

  add(name, animation) {
    this.animations.set(name, animation);
  }

  get(name) {
    return this.animations.get(name);
  }

  switch(name) {
    this.guardUndefinedAnimation(name);

    if (this.current === name) {
      return;
    }

    this.current = name;
  }

  pull() {
    const animation = this.get(this.current);

    const { frame } = animation;

    animation.update();

    return frame;
  }

  guardUndefinedAnimation(name) {
    if (!this.animations.has(name)) {
      throw new Error(`Undefined animation ${name}`);
    }
  }
}
