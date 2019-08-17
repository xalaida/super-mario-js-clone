export default class EntitiesSystem {
  /**
   * EntitiesSystem constructor
   *
   * @param {EntityManager} entityManager
   */
  constructor(entityManager) {
    this.entityManager = entityManager;
  }

  /**
   * Update the system
   *
   * @param {Number} deltaTime
   */
  update(deltaTime) {
    this.entityManager.getEntities().forEach((entity) => {
      entity.update(deltaTime);
    });
  }
}
