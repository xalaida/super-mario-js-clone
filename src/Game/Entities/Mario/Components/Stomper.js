import Component from '../../../../Engine/Behaviour/Component.js';

export default class Stomper extends Component {
  /**
   * Stomper constructor
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    super('stomp', entity);
    this.bounceSpeed = 300;
  }

  /**
   * Bounce from stompable entity
   *
   * @param {Entity} stompable
   */
  bounce(stompable) {
    this.entity.position.setY(stompable.getBounds().top - this.entity.size.height);
    this.entity.velocity.setY(-this.bounceSpeed);
  }
}
