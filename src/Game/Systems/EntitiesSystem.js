export default class EntitiesSystem {
  /**
   * EntitiesSystem constructor
   *
   * @param {Array|Map} entities
   */
  constructor(entities) {
    this.entities = entities;
  }

  /**
   * Update the system
   *
   * @param {Number} deltaTime
   */
  update(deltaTime) {
    this.entities.forEach((entity) => {
      entity.update(deltaTime);
    });
  }
}
