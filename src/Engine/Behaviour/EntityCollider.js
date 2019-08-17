export default class EntityCollider {
  /**
   * EntityCollider constructor
   *
   * @param {Map<String, Entity>} entities
   */
  constructor(entities) {
    this.entities = entities;
  }

  /**
   * Check the entity intersection with entities
   *
   * @param {Entity} entity
   */
  check(entity) {
    this.entities.forEach((e) => {
      if (e === entity) {
        return;
      }

      if (e.getBounds().intersects(entity.getBounds())) {
        entity.component('intersection').setIntersection(e);
      }
    });
  }
}
