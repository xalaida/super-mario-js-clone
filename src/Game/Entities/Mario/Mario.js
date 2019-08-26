import Entity from '../../../Engine/Behaviour/Entity.js';
import Vector from '../../../Engine/Math/Vector.js';
import AnimationPlayer from '../../../Engine/Graphic/Animations/AnimationPlayer.js';

export default class Mario extends Entity {
  /**
   * Mario constructor
   *
   * @param {Controller} controller
   * @param {Map<String, Animation>} animationsMap
   */
  constructor(controller, animationsMap) {
    super();
    this.controller = controller;
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
    if (this.component('jump').active) {
      if (this.component('direction').isLeft()) {
        return this.animationPlayer.play('jumpLeft');
      }

      return this.animationPlayer.play('jumpRight');
    }

    if (this.velocity.x > 0) {
      if (this.component('direction').isLeft()) {
        return this.animationPlayer.play('breakLeft');
      }

      return this.animationPlayer.play('moveRight');
    }

    if (this.velocity.x < 0) {
      if (this.component('direction').isRight()) {
        return this.animationPlayer.play('breakRight');
      }

      return this.animationPlayer.play('moveLeft');
    }

    if (this.component('direction').isRight()) {
      return this.animationPlayer.play('idleRight');
    }

    return this.animationPlayer.play('idleLeft');
  }

  /**
   * Render the debug information
   *
   * @param {View} view
   * @param {Camera} camera
   */
  debug(view, camera) {
    if (game.config.shouldDebug('entities')) {
      this.debugHitBox(view, camera);
      this.debugCoordinates(view);
    }
  }

  /**
   * Render the debug information about velocity
   *
   * @param {View} view
   */
  debugCoordinates(view) {
    view.text(`Velocity X: ${this.velocity.x}`, new Vector(200, 20));
    view.text(`Velocity Y: ${this.velocity.y}`, new Vector(200, 40));
    view.text(`Position X: ${this.position.x}`, new Vector(200, 60));
    view.text(`Position Y: ${this.position.y}`, new Vector(200, 80));
  }

  /**
   * Render the hit box
   *
   * @param {View} view
   * @param {Camera} camera
   */
  debugHitBox(view, camera) {
    view.outline(camera.getProjection(this.position), this.size, game.config.debug.colors.hitBox);
  }
}
