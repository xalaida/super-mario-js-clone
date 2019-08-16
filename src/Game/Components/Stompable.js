import Component from '../../Engine/Behaviour/Component.js';

export default class Stompable extends Component {
  /**
   * Stompable constructor
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    super('stompable', entity);
    this.isStompable = true;
  }

  /**
   * Update the stompable component
   */
  update() {
    const stomper = this.findStomper();

    if (!stomper || !this.isStompable) {
      return;
    }

    if (stomper.component('falling').state) {
      stomper.component('stomp').bounce();
      this.entity.onStomp(stomper);
    } else {
      this.entity.onTouch(stomper);
    }
  }

  /**
   * Find the currently intersected stomper
   *
   * @returns {Entity|null}
   */
  findStomper() {
    const stomper = this.entity.component('intersection').entity;

    if (stomper && stomper.hasComponent('stomp')) {
      return stomper;
    }

    return null;
  }
}
