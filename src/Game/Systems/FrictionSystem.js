export default class FrictionSystem {
  /**
   * FrictionSystem constructor
   *
   * @param {Array|Map} entities
   */
  constructor(entities) {
    this.entities = entities;
    this.friction = game.config.physics.friction;
  }

  /**
   * Update the system
   *
   * @param {Number} deltaTime
   */
  update(deltaTime) {
    this.entities.forEach((entity) => {
      const entityFriction = Math.min(entity.velocity.abs().x, this.friction * deltaTime);

      entity.velocity.setX(
        entity.velocity.x - (Math.sign(entity.velocity.x) * entityFriction),
      );
    });
  }
}
