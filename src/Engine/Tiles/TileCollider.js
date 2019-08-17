export default class TileCollider {
  /**
   * TileCollider constructor
   *
   * @param {TileMap} tileMap
   */
  constructor(tileMap) {
    this.tileMap = tileMap;
    this.initDebugProperties();
  }

  /**
   * Init debug properties for the collider
   */
  initDebugProperties() {
    this.tilesInBounds = [];
    this.tilesCollided = [];
  }

  /**
   * Check horizontal entity collisions
   *
   * @param {Entity} entity
   */
  checkX(entity) {
    this.tileMap.findInBounds(entity.getBounds())
      .forEach((tile) => {
        if (tile.options.solid) {
          this.checkCollisionX(entity, tile);
        }

        this.tilesInBounds.push(tile);
      });
  }

  /**
   * Check vertical entity collisions
   *
   * @param {Entity} entity
   */
  checkY(entity) {
    this.tileMap.findInBounds(entity.getBounds())
      .forEach((tile) => {
        if (tile.options.solid) {
          this.checkCollisionY(entity, tile);
        }

        this.tilesInBounds.push(tile);
      });
  }

  /**
   * Check horizontal entity collision with the tile
   *
   * @param {Entity} entity
   * @param {Tile} tile
   */
  checkCollisionX(entity, tile) {
    if (entity.velocity.x > 0) {
      this.checkFromRight(entity, tile);
    }

    if (entity.velocity.x < 0) {
      this.checkFromLeft(entity, tile);
    }
  }

  /**
   * Check vertical entity collision with the tile
   *
   * @param {Entity} entity
   * @param {Tile} tile
   */
  checkCollisionY(entity, tile) {
    if (entity.velocity.y > 0) {
      this.checkFromBottom(entity, tile);
    }

    if (entity.velocity.y < 0) {
      this.checkFromTop(entity, tile);
    }
  }

  /**
   * Check the entity collision from the right side with the tile
   *
   * @param {Entity} entity
   * @param {Tile} tile
   */
  checkFromRight(entity, tile) {
    if (entity.getBounds().right > tile.getBounds().left) {
      entity.component('collisions').setFromRight(tile);

      if (entity.hasComponent('solid')) {
        entity.component('solid').onRightCollision(tile);
      }

      this.tilesCollided.push(tile);
    }
  }

  /**
   * Check the entity collision from the left side with the tile
   *
   * @param {Entity} entity
   * @param {Tile} tile
   */
  checkFromLeft(entity, tile) {
    if (entity.getBounds().left < tile.getBounds().right) {
      entity.component('collisions').setFromLeft(tile);

      if (entity.hasComponent('solid')) {
        entity.component('solid').onLeftCollision(tile);
      }

      this.tilesCollided.push(tile);
    }
  }

  /**
   * Check the entity collision from the top side with the tile
   *
   * @param {Entity} entity
   * @param {Tile} tile
   */
  checkFromTop(entity, tile) {
    if (entity.getBounds().top < tile.getBounds().bottom) {
      entity.component('collisions').setFromTop(tile);

      if (entity.hasComponent('solid')) {
        entity.component('solid').onTopCollision(tile);
      }

      this.tilesCollided.push(tile);
    }
  }

  /**
   * Check the entity collision from the bottom side with the tile
   *
   * @param {Entity} entity
   * @param {Tile} tile
   */
  checkFromBottom(entity, tile) {
    if (entity.getBounds().bottom > tile.getBounds().top) {
      entity.component('collisions').setFromBottom(tile);

      if (entity.hasComponent('solid')) {
        entity.component('solid').onBottomCollision(tile);
      }

      this.tilesCollided.push(tile);
    }
  }

  /**
   * Debug the collider
   *
   * @param {View} view
   * @param {Camera} camera
   */
  debug(view, camera) {
    this.tilesInBounds.forEach((tile) => {
      view.outline(camera.getProjection(tile.position), tile.size, 'red');
    });

    this.tilesCollided.forEach((tile) => {
      view.outline(camera.getProjection(tile.position), tile.size, 'yellow');
    });

    this.reset();
  }

  /**
   * Reset debuggable tiles
   */
  reset() {
    this.tilesCollided = [];
    this.tilesInBounds = [];
  }
}
