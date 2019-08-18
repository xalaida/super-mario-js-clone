import ImageLoader from './ImageLoader.js';
import SpriteMap from '../Graphic/Sprites/SpriteMap.js';
import Vector from '../Math/Vector.js';
import Size from '../Math/Size.js';

export default class SpriteLoader {
  /**
   * Load a sprite from a specification by the url
   *
   * @param {String} url
   * @returns {Promise<Image>}
   */
  static load(url) {
    return fetch(url)
      .then(response => response.json())
      .then(spec => SpriteLoader.createMap(spec));
  }

  /**
   * Create a sprite map by the specification
   *
   * @param spec
   * @returns {Promise<SpriteMap>}
   */
  static createMap({ url, sprites }) {
    return ImageLoader.load(url)
      .then((image) => {
        const spriteMap = new SpriteMap(image);

        sprites.forEach(({ name, position: [x, y], size: [width, height] }) => {
          spriteMap.define(name, new Vector(x, y), new Size(width, height));
        });

        return spriteMap;
      });
  }
}
