/* eslint-disable class-methods-use-this */

export default class Component {
  /**
   * Component constructor
   *
   * @param {String} name
   * @param {Entity} entity
   */
  constructor(name, entity) {
    this.name = name;
    this.entity = entity;
  }

  /**
   * Update the component
   */
  update() {}
}
