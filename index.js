/* eslint-disable import/extensions */
import Game from './src/Core/Game.js';
import Engine from './src/Core/Engine.js';
import Controller from './src/Core/Controller.js';
import View from './src/Graphic/View.js';
import CanvasFactory from './src/Graphic/CanvasFactory.js';
import Fps from './src/Fps.js';
import Player from './src/Player.js';
import Size from './src/Utils/Size.js';
import Position from './src/Utils/Position.js';
import SpriteMap from './src/Graphic/SpriteMap.js';
import TileMap from './src/Game/TileMap.js';
import ImageLoader from './src/Loaders/ImageLoader.js';
import TileMapLoader from './src/Loaders/TileMapLoader.js';

// TODO: left all hard-coded logic here and extract independent logic into classes

window.addEventListener('load', () => {
  Promise.all([
    ImageLoader.load('src/Resources/world-sprite.png')
      .then((image) => {
        const sprite = new SpriteMap(image);

        sprite.define('sky', new Position(48, 361), new Size(16, 16));
        sprite.define('ground', new Position(0, 0), new Size(16, 16));
        sprite.define('bricks', new Position(16, 0), new Size(16, 16));

        return sprite;
      })
      .then((sprite) => {
        const tileMap = new TileMap(new Size(16, 16));

        const mapping = {
          '.': 'sky',
          '#': 'ground',
          '%': 'bricks',
        };

        return TileMapLoader.fromTxt('src/Resources/1-1.txt', tileMap, mapping, sprite);
      }),

    ImageLoader.load('src/Resources/characters-sprite.gif')
      .then((image) => {
        const sprite = new SpriteMap(image);

        sprite.define('little-mario', new Position(276, 44), new Size(16, 16));

        return new Player(new Controller(), sprite.get('little-mario'));
      }),
  ]).then(([tileMap, player]) => {
    console.log(tileMap);

    // View init
    const view = new View(CanvasFactory.create(new Size(640, 480), document.body));

    // Game init
    const game = new Game(view, tileMap);
    const engine = new Engine(game);

    // Add base entities
    game.add(player);
    game.add(new Fps());

    engine.run();
  });
});
