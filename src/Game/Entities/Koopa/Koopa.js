import Vector from '../../../Engine/Math/Vector.js';
import Size from '../../../Engine/Math/Size.js';
import AnimationPlayer from '../../../Engine/Graphic/Animations/AnimationPlayer.js';
import Entity from '../../../Engine/Behaviour/Entity.js';
import WalkingState from './States/WalkingState.js';

export default class Koopa extends Entity {
  /**
   * Koopa constructor
   *
   * @param animations
   */
  constructor(animations) {
    super();
    this.velocity = new Vector(-20, 0);
    this.drawBox = new Size(16, 24);
    this.offset = new Vector(1, 8);
    this.animationPlayer = new AnimationPlayer(animations);
    this.state = new WalkingState(this);
  }

  /**
   * Set a new entity state
   *
   * @param {State} state
   */
  setState(state) {
    this.state = state;
  }

  /**
   * On stomped handler
   *
   * @param {Entity} stomper
   */
  onStomp(stomper) {
    this.state.onStomp(stomper);
  }

  /**
   * On touch handler
   *
   * @param {Entity} stomper
   */
  onTouch(stomper) {
    this.state.onTouch(stomper);
  }

  /**
   * Update the entity
   *
   * @param {Number} deltaTime
   */
  update(deltaTime) {
    this.state.update(deltaTime);
    super.update(deltaTime);
  }

  /**
   * Render the entity
   *
   * @param {View} view
   * @param {Camera} camera
   */
  render(view, camera) {
    view.spriteImage(this.state.getAnimationFrame(), this.getDrawPosition(camera), this.drawBox);
  }

  /**
   * Get a draw position of the entity
   *
   * @param {Camera} camera
   */
  getDrawPosition(camera) {
    return camera.getProjection(this.position.minus(this.offset));
  }

  /**
   * Render the debug information of the entity
   *
   * @param {View} view
   * @param {Camera} camera
   */
  debug(view, camera) {
    this.debugDrawBox(view, camera);
    this.debugHitBox(view, camera);
  }

  /**
   * Render the draw box debug information of the entity
   *
   * @param {View} view
   * @param {Camera} camera
   */
  debugDrawBox(view, camera) {
    view.outline(this.getDrawPosition(camera), this.drawBox, game.config.debug.colors.drawBox);
  }

  /**
   * Render the hix box of the entity
   *
   * @param {View} view
   * @param {Camera} camera
   */
  debugHitBox(view, camera) {
    view.outline(camera.getProjection(this.position), this.size, game.config.debug.colors.hitBox);
  }
}
