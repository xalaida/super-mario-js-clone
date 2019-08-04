export default class Component {
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
