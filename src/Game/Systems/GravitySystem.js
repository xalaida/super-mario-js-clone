import Vector from '../../Engine/Math/Vector.js';

export default class GravitySystem {
  /**
   * GravitySystem constructor
   *
   * @param {EntityManager} entityManager
   */
  constructor(entityManager) {
    this.entityManager = entityManager;
    this.gravity = new Vector(0, game.config.physics.gravity);
  }

  /**
   * Update the system
   *
   * @param {Number} deltaTime
   */
  update(deltaTime) {
    this.entityManager.getEntities().forEach((entity) => {
      entity.velocity.set(
        entity.velocity.plus(this.gravity.scale(deltaTime)),
      );
    });
  }
}
