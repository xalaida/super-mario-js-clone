import Component from '../Component.js';

export default class Solid extends Component {
  /**
   * Solid constructor
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    super('solid', entity);
  }

  /**
   * On top collision callback
   *
   * @param {Tile} tile
   */
  onTopCollision(tile) {
    this.entity.position.setY(tile.getBounds().bottom);
    this.entity.velocity.setY(0);
  }

  /**
   * On right collision callback
   *
   * @param {Tile} tile
   */
  onRightCollision(tile) {
    this.entity.position.setX(tile.getBounds().left - this.entity.size.width);
    this.entity.velocity.setX(0);
  }

  /**
   * On bottom collision callback
   *
   * @param {Tile} tile
   */
  onBottomCollision(tile) {
    this.entity.position.setY(tile.getBounds().top - this.entity.size.height);
    this.entity.velocity.setY(0);
  }

  /**
   * On left collision callback
   *
   * @param {Tile} tile
   */
  onLeftCollision(tile) {
    this.entity.position.setX(tile.getBounds().right);
    this.entity.velocity.setX(0);
  }
}
