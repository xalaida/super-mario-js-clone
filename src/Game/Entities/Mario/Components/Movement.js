import Component from '../../../../Engine/Behaviour/Component.js';
import Vector from '../../../../Engine/Math/Vector.js';

export default class Movement extends Component {
  /**
   * Movement constructor
   *
   * @param {Mario} entity
   */
  constructor(entity) {
    super('movement', entity);
    this.accelaration = new Vector(100, 0);
    this.maxSpeed = 100;
  }

  /**
   * Update the movement component
   *
   * @param {Number} deltaTime
   */
  update(deltaTime) {
    if (this.entity.controller.isPressed('left')) {
      this.moveLeft(deltaTime);
    }

    if (this.entity.controller.isPressed('right')) {
      this.moveRight(deltaTime);
    }
  }

  /**
   * Move the entity to the left
   *
   * @param {Number} deltaTime
   */
  moveLeft(deltaTime) {
    this.entity.velocity.set(this.entity.velocity.minusX(this.accelaration.scale(deltaTime)));

    if (Math.abs(this.entity.velocity.x) > this.maxSpeed) {
      this.entity.velocity.setX(-this.maxSpeed);
    }

    this.entity.component('direction').turnLeft();
  }

  /**
   * Move the entity to the right
   *
   * @param {Number} deltaTime
   */
  moveRight(deltaTime) {
    this.entity.velocity.set(this.entity.velocity.plusX(this.accelaration.scale(deltaTime)));

    if (Math.abs(this.entity.velocity.x) > this.maxSpeed) {
      this.entity.velocity.setX(this.maxSpeed);
    }

    this.entity.component('direction').turnRight();
  }
}
