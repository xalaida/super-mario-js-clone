/* eslint-disable import/no-cycle */

import State from './State.js';
import HidingState from './HidingState.js';

export default class PanicState extends State {
  /**
   * PanicState constructor
   *
   * @param {Koopa} entity
   * @param {Number} speed
   */
  constructor(entity, speed = 200) {
    super(entity);
    this.speed = speed;
    this.init(speed);
  }

  /**
   * Init the panic state
   */
  init() {
    this.entity.velocity.setX(this.speed * this.entity.component('direction').toSign());
    this.entity.component('walking').setSpeed(this.speed);
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
    return this.entity.animationPlayer.play('hiding');
  }
}
