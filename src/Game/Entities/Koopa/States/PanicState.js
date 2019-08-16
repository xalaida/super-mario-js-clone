/* eslint-disable import/no-cycle */

import State from './State.js';
import Vector from '../../../../Engine/Math/Vector.js';
import HidingState from './HidingState.js';

export default class PanicState extends State {
  /**
   * PanicState constructor
   *
   * @param {Koopa} entity
   */
  constructor(entity) {
    super(entity);
    this.init();
  }

  /**
   * Init the state
   * TODO: try to refactor with no duplication
   * probably just use flipX() method inside a Walking component
   */
  init() {
    this.entity.velocity.set(new Vector(-200, 0));
    this.entity.component('walking').setSpeed(200);
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
    stomper.component('killable').kill();
  }

  /**
   * Get animation frame for the entity in the state
   *
   * @returns {SpriteImage}
   */
  getAnimationFrame() {
    return this.entity.animationPlayer.play('hiding');
  }
}
