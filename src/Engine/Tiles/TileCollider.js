export default class TileCollider {
  /**
   * TileCollider constructor
   *
   * @param {TileMap} tileMap
   */
  constructor(tileMap) {
    this.tileMap = tileMap;
    this.checkableTile = [];
    this.colladableTiles = [];
  }

  // TODO: extract all entity updating outside (use only collisions component with collideTop(), collideBottom(), etc. )

  /**
   * Check horizontal entity collisions
   *
   * @param {Entity} entity
   */
  checkX(entity) {
    const tiles = this.tileMap.findInBounds(entity.getBounds());
    this.checkableTile.push(...tiles);

    tiles.forEach((tile) => {
      if (!tile.options.ground) {
        return;
      }

      this.checkCollisionX(entity, tile);
    });
  }

  /**
   * Check vertical entity collisions
   *
   * @param {Entity} entity
   */
  checkY(entity) {
    const tiles = this.tileMap.findInBounds(entity.getBounds());
    this.checkableTile.push(...tiles);

    tiles.forEach((tile) => {
      if (!tile.options.ground) {
        return;
      }

      this.checkCollisionY(entity, tile);
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
      this.checkToRight(entity, tile);
    }

    if (entity.velocity.x < 0) {
      this.checkToLeft(entity, tile);
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
      this.checkToBottom(entity, tile);
    }

    if (entity.velocity.y < 0) {
      this.checkToTop(entity, tile);
    }
  }

  /**
   * Check entity collision from the right side with the tile
   *
   * @param {Entity} entity
   * @param {Tile} tile
   */
  checkToRight(entity, tile) {
    if (entity.getBounds().right > tile.getBounds().left) {
      entity.position.setX(tile.position.x - entity.size.width);
      entity.velocity.setX(0);
      entity.component('collisions').collideRight();
      this.colladableTiles.push(tile);
    }
  }

  /**
   * Check entity collision from the left side with the tile
   *
   * @param {Entity} entity
   * @param {Tile} tile
   */
  checkToLeft(entity, tile) {
    if (entity.getBounds().left < tile.getBounds().right) {
      entity.position.setX(tile.getBounds().right);
      entity.velocity.setX(0);
      entity.component('collisions').collideLeft();
      this.colladableTiles.push(tile);
    }
  }

  /**
   * Check entity collision from the top side with the tile
   *
   * @param {Entity} entity
   * @param {Tile} tile
   */
  checkToTop(entity, tile) {
    if (entity.getBounds().top < tile.getBounds().bottom) {
      entity.position.setY(tile.getBounds().bottom);
      entity.velocity.setY(0);
      entity.component('collisions').collideTop();
      this.colladableTiles.push(tile);
    }
  }

  /**
   * Check entity collision from the bottom side with the tile
   *
   * @param {Entity} entity
   * @param {Tile} tile
   */
  checkToBottom(entity, tile) {
    if (entity.getBounds().bottom > tile.getBounds().top) {
      entity.position.setY(tile.position.y - entity.size.height);
      entity.velocity.setY(0);
      entity.component('collisions').collideBottom();
      this.colladableTiles.push(tile);
    }
  }

  /**
   * Reset debuggable tiles
   * TODO: refactor this
   */
  reset() {
    this.colladableTiles = [];
    this.checkableTile = [];
  }

  /**
   * Debug the collider
   *
   * @param {View} view
   * @param {Camera} camera
   */
  debug(view, camera) {
    this.checkableTile.forEach((tile) => {
      view.outline(camera.getProjection(tile.position), tile.size, 'red');
    });

    this.colladableTiles.forEach((tile) => {
      view.outline(camera.getProjection(tile.position), tile.size, 'yellow');
    });

    this.reset();
  }
}
