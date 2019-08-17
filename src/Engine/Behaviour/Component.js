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
  update() {
    console.log(`Override the component ${this.constructor.name} update method`);
  }
}
