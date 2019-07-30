export default class TileCollider {
  constructor(tileMap) {
    this.tileMap = tileMap;
    this.checkingTiles = [];
    this.colladableTiles = [];
  }

  // TODO: Probably just add position
  check(entity) {
    this.checkingTiles = this.tileMap.findInBounds(entity.getBounds());

    // TODO: probably extract into player some logic
    this.checkingTiles.forEach((tile) => {
      if (!tile) {
        return;
      }

      // TODO: add colladable tiles type (maybe use for this separate layer)
      if (tile.type === 'sky') {
        return;
      }

      this.checkY(entity, tile);

      this.checkX(entity, tile);
    });
  }

  fullCheckX(entity) {
    this.checkingTiles = this.tileMap.findInBounds(entity.getBounds());

    // TODO: probably extract into player some logic
    this.checkingTiles.forEach((tile) => {
      // TODO: add colladable tiles type (maybe use for this separate layer)
      if (tile.type === 'sky') {
        return;
      }

      this.checkX(entity, tile);
    });
  }

  fullCheckY(entity) {
    this.checkingTiles = this.tileMap.findInBounds(entity.getBounds());

    // TODO: probably extract into player some logic
    this.checkingTiles.forEach((tile) => {
      // TODO: add colladable tiles type (maybe use for this separate layer)
      if (tile.type === 'sky') {
        return;
      }

      this.checkY(entity, tile);
    });
  }

  checkX(entity, tile) {
    if (entity.velocity.x > 0) {
      this.checkToRight(entity, tile);
    }

    if (entity.velocity.x < 0) {
      this.checkToLeft(entity, tile);
    }
  }

  checkY(entity, tile) {
    if (entity.velocity.y > 0) {
      this.checkToBottom(entity, tile);
    }

    if (entity.velocity.y < 0) {
      this.checkToTop(entity, tile);
    }
  }

  checkToRight(entity, tile) {
    if (entity.getBounds().right() > tile.bounds.left()) {
      entity.position.setX(tile.position.x - entity.size.width);
      entity.velocity.setX(0);

      this.colladableTiles.push(tile);
      console.log('collide on movement to right');
    }
  }

  checkToLeft(entity, tile) {
    if (entity.getBounds().left() < tile.bounds.right()) {
      entity.position.setX(tile.bounds.right());
      entity.velocity.setX(0);

      this.colladableTiles.push(tile);
      console.log('collide on movement to left');
    }
  }

  checkToTop(entity, tile) {
    if (entity.getBounds().top() < tile.bounds.bottom()) {
      entity.position.setY(tile.bounds.bottom());
      entity.velocity.setY(0);

      // this.colladableTiles.push(tile);
      // console.log('collide on movement to top');

      return true;
    }

    return false;
  }

  checkToBottom(entity, tile) {
    if (entity.getBounds().bottom() > tile.bounds.top()) {
      entity.position.setY(tile.position.y - entity.size.height);
      entity.velocity.setY(0);

      // this.colladableTiles.push(tile);
      // console.log('collide on movement to bottom');
      // console.log(entity.getBounds().bottom(), tile.bounds.top());

      return true;
    }

    return false;
  }

  // TODO: Extract into some layer, idk, dont left it here
  render(view, camera) {
    this.checkingTiles.forEach((tile) => {
      view.outline(tile.position.minus(camera.position), tile.size);
    });
    this.checkingTiles = [];

    this.colladableTiles.forEach((tile) => {
      view.outline(tile.position.minus(camera.position), tile.size, '#ff0088');
    });
    this.colladableTiles = [];
  }
}
