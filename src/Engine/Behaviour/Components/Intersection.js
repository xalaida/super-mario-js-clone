import Component from '../Component.js';

export default class Intersection extends Component {
  constructor(entity) {
    super('intersection', entity);
    this.intersected = null;
  }

  intersects(entity) {
    this.intersected = entity;
  }

  reset() {
    this.intersected = null;
  }

  update() {
    this.reset();
  }
}
