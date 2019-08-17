import Component from '../../Engine/Behaviour/Component.js';

export default class Killable extends Component {
  /**
   * Killable constructor
   *
   * @param {Entity} entity
   * @param {EntityManager} entityManager
   */
  constructor(entity, entityManager) {
    super('killable', entity);
    this.entityManager = entityManager;
    this.dead = false;
    this.dying = false;
    this.dyingTime = 0;
    this.dyingDuration = 2;
  }

  /**
   * Kill the entity
   */
  kill() {
    if (this.dying) {
      return;
    }

    this.dying = true;

    if (this.entity.hasComponent('stompable')) {
      this.entity.component('stompable').isStompable = false;
    }
  }

  /**
   * Revive the entity
   */
  revive() {
    this.dead = false;
    this.dying = false;
    this.dyingTime = 0;
  }

  /**
   * Update the killable component
   *
   * @param {Number} deltaTime
   */
  update(deltaTime) {
    if (this.dying) {
      this.dyingTime += deltaTime;
    }

    if (this.dyingTime >= this.dyingDuration) {
      this.dead = true;

      // TODO: try to refactor with more friendly api
      if (!this.entity.hasComponent('respawn')) {
        this.entityManager.remove(this.entity);
      }
    }
  }
}
