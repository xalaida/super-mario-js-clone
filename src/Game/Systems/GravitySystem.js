import Vector from '../../Engine/Math/Vector.js';

export default class GravitySystem {
  /**
   * GravitySystem constructor
   *
   * @param {Array|Map} entities
   */
  constructor(entities) {
    this.entities = entities;
    this.gravity = new Vector(0, game.config.physics.gravity);
  }

  /**
   * Update the system
   *
   * @param {Number} deltaTime
   */
  update(deltaTime) {
    this.entities.forEach((entity) => {
      entity.velocity.set(
        entity.velocity.plus(this.gravity.scale(deltaTime)),
      );
    });
  }
}
