import Component from '../../Engine/Behaviour/Component.js';

/**
 * Jump supports the next things:
 * - Supports different height jumping with holding jump key
 * - Disable double jump in the air
 * - Disable infinity jump when key is pressed
 * - Disable jumping when entity just starts falling and tries to return back with jump
 * - Jump when the entity is falling last seconds (not when the entity already stay on the ground)
 */
export default class Jump extends Component {
  /**
   * Jump constructor
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    super('jump', entity);
    /**
     * Allow to jump higher when jump button is held
     */
    this.duration = 0.3;

    /**
     * Set up jump power (vector which will be applied to the entity velocity)
     */
    this.power = game.config.components.jump.power;

    /**
     * An interval which allows to press jump before the entity grounds
     */
    this.graceTime = game.config.components.jump.graceTime;

    /**
     * Speed boost factor which allows to jump the higher when a horizontal speed the bigger
     */
    this.speedBoost = game.config.components.jump.speedBoost;

    /**
     * Time that defines how long jump button can be pressed else
     */
    this.leftTime = 0;

    /**
     * A timer for the graceTime calculation with the delta time
     */
    this.requestTime = 0;

    /**
     * A flag that determines if the jump is allowed right now
     */
    this.ready = true;

    /**
     * A flag that determines if the jump can be requested right now
     */
    this.canRequest = true;
  }

  /**
   * Update the jump component
   *
   * @param {Number} deltaTime
   */
  update(deltaTime) {
    this.handleInput();
    this.checkCollisions();
    this.perform(deltaTime);
  }

  /**
   * Handle input for jumping control
   */
  handleInput() {
    if (this.entity.controller.isPressed('up')) {
      this.request();
    } else {
      this.cancel();
    }
  }

  /**
   * Request to jump when it will be possible
   */
  request() {
    if (this.canRequest) {
      this.requestTime = this.graceTime;
      this.canRequest = false;
    }
  }

  /**
   * Cancel the jump process
   */
  cancel() {
    this.stop();
    this.reset();
  }

  /**
   * Start the jump process
   */
  start() {
    this.leftTime = this.duration;
    this.ready = false;
    this.requestTime = 0;
  }

  /**
   * Stop the jump process
   */
  stop() {
    this.leftTime = 0;
    this.requestTime = 0;
  }

  /**
   * Reset the jump status
   */
  reset() {
    this.canRequest = true;
  }

  /**
   * Charge the next jump
   */
  charge() {
    this.ready = true;
  }

  /**
   * Check entity collisions
   */
  checkCollisions() {
    if (this.entity.component('collisions').getFromBottom()) {
      this.charge();
    }

    if (this.entity.component('collisions').getFromTop()) {
      this.stop();
    }
  }

  /**
   * Perform entity jumping
   *
   * @param deltaTime
   */
  perform(deltaTime) {
    this.attempt(deltaTime);
    this.apply(deltaTime);
  }

  /**
   * Attempt to jump if it possible
   *
   * @param deltaTime
   */
  attempt(deltaTime) {
    if (this.requestTime > 0) {
      if (this.ready && !this.entity.component('falling').state) {
        this.start();
      }

      this.requestTime -= deltaTime;
    }
  }

  /**
   * Apply jump attributes to entity
   *
   * @param deltaTime
   */
  apply(deltaTime) {
    // TODO: fix case when mario jumps higher when goes to the right side than goes to the left

    if (this.leftTime > 0) {
      this.entity.velocity.setY(
        -(this.power + this.entity.velocity.scale(this.speedBoost).x),
      );

      this.leftTime -= deltaTime;
    }
  }
}
