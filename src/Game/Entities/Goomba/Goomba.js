import Vector from '../../../Engine/Math/Vector.js';
import AnimationPlayer from '../../../Engine/Graphic/Animations/AnimationPlayer.js';
import Entity from '../../../Engine/Behaviour/Entity.js';

export default class Goomba extends Entity {
  /**
   * Goomba constructor
   *
   * @param {Map} animationsMap
   */
  constructor(animationsMap) {
    super();
    this.velocity = new Vector(-20, 0);
    this.animationPlayer = new AnimationPlayer(animationsMap);
  }

  /**
   * Render the entity
   *
   * @param {View} view
   * @param {Camera} camera
   */
  render(view, camera) {
    view.spriteImage(this.getAnimationFrame(), camera.getProjection(this.position), this.size);
  }

  /**
   * Get the animation frame of the entity
   *
   * @returns {SpriteImage}
   */
  getAnimationFrame() {
    if (this.component('killable').dying) {
      return this.animationPlayer.play('flat');
    }

    return this.animationPlayer.play('move');
  }

  /**
   * Render the debug information of the entity
   *
   * @param {View} view
   * @param {Camera} camera
   */
  debug(view, camera) {
    this.debugHitBox(view, camera);
  }

  /**
   * Render the hitbox of the entity
   *
   * @param {View} view
   * @param {Camera} camera
   */
  debugHitBox(view, camera) {
    view.outline(camera.getProjection(this.position), this.size, game.config.debug.colors.hitBox);
  }
}
