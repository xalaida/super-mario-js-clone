export default class FallOutSystem {
  /**
   * FallOutSystem constructor
   *
   * @param {Array|Map} entities
   */
  constructor(entities) {
    this.entities = entities;
    this.height = game.config.world.height;
  }

  /**
   * Update the system
   */
  update() {
    this.entities.forEach((entity) => {
      if (entity.position.y > this.height) {
        entity.component('killable').kill();
      }
    });
  }
}
