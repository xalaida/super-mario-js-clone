/* eslint-disable import/extensions */

import TileCollider from '../Game/TileCollider.js';

export default class Game {
  constructor(view, tileMap, camera) {
    // TODO: add World object
    // TODO: add layers to allow draw entities at the correct layer
    this.view = view;
    this.entities = [];
    this.friction = 0.9;
    this.gravity = 0.5;
    this.tileMap = tileMap;
    this.tileCollider = new TileCollider(tileMap);
    this.camera = camera;
  }

  update(delta) {
    this.entities.forEach((entity) => {
      entity.update(delta);

      // TODO: THINK HOW TO RETURN MOVEMENT THEN COLLISION CHECKING FOR BOTH AXISES

      // this.tileCollider.check(entity);
      entity.velocity = entity.velocity.plus(entity.gravity.times(delta));

      entity.position.x += entity.velocity.x * delta;
      this.tileCollider.fullCheckX(entity);

      entity.position.y += entity.velocity.y * delta;
      this.tileCollider.fullCheckY(entity);

    });
  }

  render() {
    // TODO: remove it after all world render will be called
    this.view.clear();

    // TODO: feature game layers (UI layer, Background layer, Entities Layer, etc)
    this.tileMap.forEach((tile) => {
      tile.render(this.view, this.camera);
    });

    // TODO: debug layer
    this.tileCollider.render(this.view, this.camera);

    // TODO: feature game layers (UI layer, Background layer, Entities Layer, etc)
    this.entities.forEach((entity) => {
      entity.render(this.view, this.camera);
    });
  }

  add(entity) {
    this.entities.push(entity);
  }
}
