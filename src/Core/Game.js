/* eslint-disable import/extensions */

export default class Game {
  constructor(view, tileMap) {
    // TODO: add World object
    // TODO: add layers to allow draw entities at the correct layer
    this.view = view;
    this.tileMap = tileMap;
    this.entities = [];
    this.friction = 0.9;
    this.gravity = 0.5;
  }

  update(delta) {
    this.entities.forEach((entity) => {
      entity.update(delta);
    });
  }

  render() {
    // TODO: remove it after all world render will be called
    this.view.clear();

    this.tileMap.forEach((tile) => {
      tile.render(this.view);
    });

    this.entities.forEach((entity) => {
      entity.render(this.view);
    });
  }

  add(entity) {
    this.entities.push(entity);
  }
}
