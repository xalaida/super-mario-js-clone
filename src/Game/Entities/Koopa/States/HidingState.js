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
    this.wakeUpDelay = 3;
    this.init();
  }

  /**
   * Init the hiding state
   */
  init() {
    this.entity.component('direction').setFromVelocity();
    this.entity.velocity.setX(0);
  }

  /**
   * Update the hiding state
   *
   * @param {Number} deltaTime
   */
  update(deltaTime) {
    this.hideTime += deltaTime;

    if (this.hideTime > this.hideDuration) {
      this.entity.setState(new WalkingState(this.entity, game.config.enemies.koopa.speed));
    }
  }

  /**
   * On stomp handler
   *
   * @param {Entity} stomper
   */
  onStomp(stomper) {
    // TODO: disable bounce effect on this state (which called in the Stomp component)
    this.panic(stomper);
  }

  /**
   * On touch handler
   *
   * @param {Entity} stomper
   */
  onTouch(stomper) {
    this.panic(stomper);
  }

  /**
   * Set the PanicState
   *
   * @param {Entity} stomper
   */
  panic(stomper) {
    if (stomper.position.x > this.entity.position.x) {
      this.entity.component('direction').turnLeft();
    } else {
      this.entity.component('direction').turnRight();
    }

    this.entity.setState(new PanicState(this.entity, game.config.enemies.koopa.panicSpeed));
  }

  /**
   * Get animation frame for the entity in the state
   *
   * @returns {SpriteImage}
   */
  getAnimationFrame() {
    if (this.hideTime > this.wakeUpDelay) {
      return this.entity.animationPlayer.play('wakingUp');
    }

    return this.entity.animationPlayer.play('hiding');
  }
}
