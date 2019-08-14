import Component from '../Component.js';

export default class Intersection extends Component {
  constructor(entity) {
    super('intersection', entity);
    this.intersected = null;
  }

  intersects(entity) {
    console.log('intersected');
    this.intersected = entity;
  }
}
