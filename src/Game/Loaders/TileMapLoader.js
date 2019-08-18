import FileLoader from '../../Engine/Loaders/FileLoader.js';
import SpriteTile from '../../Engine/Tiles/SpriteTile.js';
import AnimatedTile from '../../Engine/Tiles/AnimatedTile.js';
import SpawnTile from '../Spawner/SpawnTile.js';

export default class TileMapLoader {
  // TODO: refactor as level loader
  constructor(spriteMap, animationManager) {
    this.spriteMap = spriteMap;
    this.animationManager = animationManager;
  }

  setTileMaps(collisionTileMap, backgroundTileMap, enemiesTileMap) {
    this.collisionTileMap = collisionTileMap;
    this.backgroundTileMap = backgroundTileMap;
    this.enemiesTileMap = enemiesTileMap;

    return this;
  }

  loadLvl(url, mapping) {
    return FileLoader.load(url)
      .then((content) => {
        const lines = content.split(/[\n]+/g);

        for (let y = 0, height = lines.length; y < height; y += 1) {
          const line = lines[y].split('');

          for (let x = 0, width = line.length; x < width; x += 1) {
            if (mapping[line[x]]) {
              this.addTile(x, y, mapping[line[x]]);
            }
          }
        }
      });
  }

  addTile(x, y, mapping) {
    if (mapping.type === 'enemy') {
      return this.enemiesTileMap.add(x, y, this.createTile(mapping));
    }

    if (mapping.options.layer && mapping.options.layer === 'background') {
      return this.backgroundTileMap.add(x, y, this.createTile(mapping));
    }

    return this.collisionTileMap.add(x, y, this.createTile(mapping));
  }

  createTile(mapping) {
    if (mapping.type === 'enemy') {
      return new SpawnTile(mapping.name);
    }

    if (mapping.type === 'animation') {
      return new AnimatedTile(this.animationManager.get(mapping.name), mapping.options);
    }

    return new SpriteTile(this.spriteMap.get(mapping.name), mapping.options);
  }
}
