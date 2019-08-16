import Component from '../../../../Engine/Behaviour/Component.js';

export default class Stompable extends Component {
  /**
   * Stompable constructor
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    super('stompable', entity);
  }

  /**
   * Determine if the entity is currently stompable
   *
   * @returns {boolean}
   */
  isStompable() {
    return !this.entity.component('killable').dying;
  }

  /**
   * Update the stompable component
   */
  update() {
    const stomper = this.findStomper();

    if (!stomper || !this.isStompable()) {
      return;
    }

    if (stomper.component('falling').state) {
      stomper.component('stomp').bounce();
      this.stomp();
    } else {
      stomper.component('killable').kill();
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

  /**
   * Stomp the entity
   */
  stomp() {
    this.entity.component('killable').kill();
    this.entity.velocity.setX(0);
  }
}
