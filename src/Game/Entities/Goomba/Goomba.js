import AnimationPlayer from '../../../Engine/Graphic/Animations/AnimationPlayer.js';
import Entity from '../../../Engine/Behaviour/Entity.js';

export default class Goomba extends Entity {
  /**
   * Goomba constructor
   *
   * @param {Map<String, Animation>} animationsMap
   */
  constructor(animationsMap) {
    super();
    this.animationPlayer = new AnimationPlayer(animationsMap);
  }

  /**
   * On stomped handler
   */
  onStomp() {
    this.component('killable').kill();
    this.velocity.setX(0);
  }

  /**
   * On touch handler
   *
   * @param {Entity} stomper
   */
  onTouch(stomper) {
    stomper.component('killable').kill();
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
