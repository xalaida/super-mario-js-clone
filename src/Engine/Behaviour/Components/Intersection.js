import Component from '../Component.js';

export default class Intersection extends Component {
  constructor(entity) {
    super('intersection', entity);
    this.entity = null;
  }

  intersects(entity) {
    this.entity = entity;
  }

  reset() {
    this.entity = null;
  }

  update() {
    this.reset();
  }
}
