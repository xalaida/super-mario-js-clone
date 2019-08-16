import EntityCollider from './EntityCollider.js';

export default class EntityManager {
  /**
   * EntityManager constructor
   */
  constructor() {
    this.entities = new Map();
    this.collider = new EntityCollider(this.entities);
  }
}
