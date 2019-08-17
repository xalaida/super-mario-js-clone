import Component from '../Component.js';

export default class Intersection extends Component {
  /**
   * Intersection constructor
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    super('intersection', entity);
    this.entity = null;
  }

  /**
   * Set the intersected entity
   *
   * @param {Entity} entity
   */
  setIntersection(entity) {
    this.entity = entity;
  }

  /**
   * Reset the intersected entity
   */
  reset() {
    this.entity = null;
  }

  /**
   * Update the intersection component
   */
  update() {
    this.reset();
  }
}
