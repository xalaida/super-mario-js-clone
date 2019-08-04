export default class Entity {
  constructor() {
    this.components = [];
  }

  /**
   * Add a component to the entity
   *
   * @param {Component} component
   */
  addComponent(component) {
    this.components.push(component);
    this[component.name] = component;
  }

  /**
   * Get the component from the entity
   *
   * @param {string} name
   * @returns {Component}
   */
  component(name) {
    this.guardUndefinedComponent(name);
    return this[name];
  }

  /**
   * Guard undefined component
   *
   * @param {string} name
   */
  guardUndefinedComponent(name) {
    if (this[name] === undefined) {
      throw new Error(`Component ${name} is not defined for the entity ${this.constructor.name}`);
    }
  }

  /**
   * Update the entity
   *
   * @param {Number} deltaTime
   */
  update(deltaTime) {
    this.components.forEach(component => component.update(deltaTime));
  }

  /**
   * Render the entity
   */
  render() {
    console.log(`Override the entity ${this.constructor.name} render method`);
  }
}
