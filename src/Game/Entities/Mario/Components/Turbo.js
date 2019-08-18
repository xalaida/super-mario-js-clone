import Component from '../../../../Engine/Behaviour/Component.js';
import Vector from '../../../../Engine/Math/Vector.js';

export default class Turbo extends Component {
  /**
   * Turbo constructor
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    super('turbo', entity);
  }

  /**
   * Update the turbo component
   */
  update() {
    if (this.entity.controller.isPressed('a')) {
      this.entity.component('movement').maxSpeed = game.config.player.turboMaxSpeed;
      this.entity.component('movement').accelaration = new Vector(game.config.player.turboMaxSpeed, 0);
    } else {
      this.entity.component('movement').maxSpeed = game.config.player.maxSpeed;
      this.entity.component('movement').accelaration = new Vector(game.config.player.acceleration, 0);
    }
  }
}
