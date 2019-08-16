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

  // TODO: probably add QUEUE method and run all queues after all entity components have been updated
  // TODO: this allows to use components in any order
  kill() {
    if (this.dying) {
      return;
    }

    this.dying = true;

    if (this.entity.hasComponent('stompable')) {
      this.entity.component('stompable').isStompable = false;
    }
  }

  revive() {
    this.dead = false;
    this.dying = false;
    this.dyingTime = 0;
  }

  /**
   * Update the killable component
   */
  update(deltaTime) {
    if (this.dying) {
      this.dyingTime += deltaTime;
    }

    if (this.dyingTime >= this.dyingDuration) {
      this.dead = true;

      // TODO: refactor this (probably use event bus)
      if (!this.entity.hasComponent('respawn')) {
        this.entityManager.remove(this.entity);
      }
    }
  }
}
