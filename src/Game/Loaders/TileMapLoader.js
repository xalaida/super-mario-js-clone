import FileLoader from '../../Engine/Loaders/FileLoader.js';

export default class TileMapLoader {
  static fromTxt(url, tileMap, mapping, sprite) {
    return FileLoader.load(url)
      .then((content) => {
        const lines = content.split(/[\n]+/g);

        for (let y = 0, height = lines.length; y < height; y += 1) {
          const line = lines[y].split('');

          for (let x = 0, width = line.length; x < width; x += 1) {
            const char = line[x];

            if (mapping[char]) {
              tileMap.add(x, y, sprite.get(mapping[char].image), mapping[char].options);
            }
          }
        }
      });
  }
}
