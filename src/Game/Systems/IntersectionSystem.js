export default class IntersectionSystem {
  /**
   * IntersectionSystem constructor
   *
   * @param {EntityManager} entityManager
   */
  constructor(entityManager) {
    this.entityManager = entityManager;
  }

  /**
   * Update the system
   */
  update() {
    this.entityManager.checkIntersections();
  }
}
