import Size from '../Math/Size.js';
import Vector from '../Math/Vector.js';
import Bounds from '../Math/Bounds.js';

export default class Entity {
  /**
   * Entity constructor
   */
  constructor() {
    this.components = new Map();
    this.id = Symbol('id');
    this.size = Size.pixel();
    this.position = Vector.zero();
  }

  /**
   * Get the entity bounds
   *
   * @returns {Bounds}
   */
  getBounds() {
    return new Bounds(this.position, this.size);
  }

  /**
   * Add a component to the entity
   *
   * @param {Component} component
   */
  addComponent(component) {
    this.components.set(component.name, component);
  }

  /**
   * Get the component from the entity
   *
   * @param {String} name
   * @returns {Component}
   */
  component(name) {
    this.guardUndefinedComponent(name);
    return this.components.get(name);
  }

  /**
   * Determine if the entity has the specified component
   *
   * @param {String} name
   * @returns {boolean}
   */
  hasComponent(name) {
    return this.components.has(name);
  }

  /**
   * Guard undefined component
   *
   * @param {String} name
   */
  guardUndefinedComponent(name) {
    if (!this.components.has(name)) {
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
