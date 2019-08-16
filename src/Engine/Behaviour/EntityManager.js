import EntityCollider from './EntityCollider.js';

export default class EntityManager {
  /**
   * EntityManager constructor
   */
  constructor() {
    this.entities = new Map();
    this.collider = new EntityCollider(this.entities);
  }

  /**
   * Get entities collection
   *
   * @returns {Map<String, Entity>}
   */
  getEntities() {
    return this.entities;
  }

  /**
   * Add the new entity to collection
   *
   * @param {Entity} entity
   */
  add(entity) {
    this.entities.set(entity.id, entity);
  }

  /**
   * Remove the entity
   *
   * @param entity
   */
  remove(entity) {
    this.entities.delete(entity.id);
  }

  /**
   * Check entities intersection
   */
  checkIntersections() {
    this.entities.forEach(entity => this.collider.check(entity));
  }

  /**
   * Debug the entities
   *
   * @param {View} view
   * @param {Camera} camera
   */
  debug(view, camera) {
    this.entities.forEach(entity => entity.debug(view, camera));
  }
}
