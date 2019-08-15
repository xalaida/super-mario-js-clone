import Component from '../../Engine/Behaviour/Component.js';

export default class Killable extends Component {
  constructor(entity) {
    super('killable', entity);
    this.dead = false;
    this.dying = false;
    this.dyingTime = 0;
    this.dyingDuration = 2;
  }

  kill() {
    this.dying = true;
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
        game.sceneManager.scene.entities.delete('goomba');
      }
    }
  }
}
