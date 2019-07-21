/* eslint-disable import/extensions */
import Matrix from '../Utils/Matrix.js';

export default class Level {
  // TODO: introduce layers
  // TODO: introduce game scene class
  constructor() {
    this.tiles = new Matrix();
    this.entities = [];
  }

  addTile(x, y, tile) {
    this.tiles.set(x, y, tile);
  }

  addEntity(entity) {
    this.entities.push(entity);
  }

  update(delta) {
    this.entities.forEach((entity) => {
      entity.update(delta);
    });
  }

  render(view) {
    this.tiles.forEach((tile) => {
      tile.render(view);
    });

    this.entities.forEach((entity) => {
      entity.render(view);
    });
  }
}
