/* eslint-disable import/no-cycle */

import State from './State.js';
import WalkingState from './WalkingState.js';
import PanicState from './PanicState.js';

export default class HidingState extends State {
  /**
   * HidingState constructor
   *
   * @param {Koopa} entity
   */
  constructor(entity) {
    super(entity);
    this.hideDuration = 5;
    this.hideTime = 0;
    this.init();
  }

  init() {
    // TODO: add possibility to turn off stomping on hiding state (should be just activated the PanicState with no bounce at Stomper)
    this.entity.velocity.setX(0);
  }

  update(deltaTime) {
    this.hideTime += deltaTime;

    if (this.hideTime > this.hideDuration) {
      this.entity.setState(new WalkingState(this.entity));
    }
  }

  /**
   * On stomp handler
   */
  onStomp() {
    this.entity.velocity.setX(0);
  }

  /**
   * On touch handler
   */
  onTouch() {
    this.entity.setState(new PanicState(this.entity));
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
