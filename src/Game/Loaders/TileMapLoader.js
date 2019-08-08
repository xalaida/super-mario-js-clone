import FileLoader from '../../Engine/Loaders/FileLoader.js';
import SpriteTile from '../../Engine/Tiles/SpriteTile.js';
import AnimatedTile from '../../Engine/Tiles/AnimatedTile.js';

export default class TileMapLoader {
  constructor(spriteMap, animationManager = null) {
    this.spriteMap = spriteMap;
    this.animationManager = animationManager;
  }

  setTileMaps(collisionTileMap, backgroundTileMap) {
    this.collisionTileMap = collisionTileMap;
    this.backgroundTileMap = backgroundTileMap;

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
    if (mapping.options.layer && mapping.options.layer === 'background') {
      return this.backgroundTileMap.add(x, y, this.createTile(mapping));
    }

    return this.collisionTileMap.add(x, y, this.createTile(mapping));
  }

  createTile(mapping) {
    if (mapping.type === 'animation') {
      return new AnimatedTile(this.animationManager.get(mapping.sprite), mapping.options);
    }

    return new SpriteTile(this.spriteMap.get(mapping.sprite), mapping.options);
  }
}
