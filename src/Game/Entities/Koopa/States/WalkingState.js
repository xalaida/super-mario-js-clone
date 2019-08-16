/* eslint-disable import/no-cycle */
import State from './State.js';
import HidingState from './HidingState.js';

export default class WalkingState extends State {
  /**
   * WalkingState constructor
   *
   * @param {Koopa} entity
   */
  constructor(entity) {
    super(entity);
    this.init();
  }

  /**
   * Init the state
   */
  init() {
    this.entity.velocity.setX(-20);
  }

  /**
   * On stomp handler
   */
  onStomp() {
    this.entity.setState(new HidingState(this.entity));
  }

  /**
   * On touch handler
   *
   * @param stomper
   */
  onTouch(stomper) {
    stomper.component('killable').kill(this.entity);
  }

  /**
   * Get animation frame for the entity in the state
   *
   * @returns {SpriteImage}
   */
  getAnimationFrame() {
    if (this.entity.velocity.x > 0) {
      return this.entity.animationPlayer.play('moveRight');
    }

    return this.entity.animationPlayer.play('moveLeft');
  }
}
