export default class EntityCollider {
  constructor(entities) {
    this.entities = entities;
  }

  /**
   * Check entity intersection with another entities
   *
   * @param {Entity} entity
   */
  check(entity) {
    this.entities.forEach((e) => {
      if (e === entity) {
        return;
      }

      if (e.getBounds().intersects(entity.getBounds())) {
        console.log('intersects');
        e.component('intersection').intersects(entity);
        entity.component('intersection').intersects(e);
      }
    });
  }
}
