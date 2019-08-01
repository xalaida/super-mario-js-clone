import Game from './src/Core/Game.js';
import Engine from './src/Core/Engine.js';
import Controller from './src/Core/Controller.js';
import View from './src/Graphic/View.js';
import CanvasFactory from './src/Graphic/CanvasFactory.js';
import Player from './src/Player.js';
import Size from './src/Utils/Size.js';
import Vector from './src/Utils/Vector.js';
import SpriteMap from './src/Graphic/SpriteMap.js';
import TileMap from './src/Game/TileMap.js';
import ImageLoader from './src/Loaders/ImageLoader.js';
import TileMapLoader from './src/Loaders/TileMapLoader.js';
import Camera from './src/Graphic/Camera.js';
import MouseController from './src/Core/MouseController.js';

// TODO: left all hard-coded logic here and extract independent logic into classes

// TODO: separate engine from mario code

window.addEventListener('load', () => {
  Promise.all([
    ImageLoader.load('src/Resources/world-sprite.png')
      .then((image) => {
        const sprite = new SpriteMap(image);

        sprite.define('sky', new Vector(48, 361), new Size(16, 16));
        sprite.define('ground', new Vector(0, 0), new Size(16, 16));
        sprite.define('bricks', new Vector(16, 0), new Size(16, 16));

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
        const spriteMap = new SpriteMap(image);

        spriteMap.define('mario-idle', new Vector(276, 44), new Size(16, 16));
        spriteMap.define('mario-run-1', new Vector(290, 44), new Size(16, 16));
        spriteMap.define('mario-run-2', new Vector(304, 44), new Size(16, 16));
        spriteMap.define('mario-run-3', new Vector(321, 44), new Size(16, 16));

        return new Player(new Controller(), spriteMap);
      }),
  ]).then(([tileMap, player]) => {
    // View init
    const view = new View(CanvasFactory.create(new Size(640, 480), document.body));

    // Add camera for scrolling view
    const camera = new Camera(Vector.zero(), new Size(600, 400));

    // Game init
    const game = new Game(view, tileMap, camera);
    const engine = new Engine(game);

    const mouseController = new MouseController(view.context);

    // Camera simple mouse scroll
    mouseController.onRightButtonDrag((currentPosition, previousPosition) => {
      camera.position = camera.position.minusX(currentPosition.minus(previousPosition));
    });

    // player mouse control debugger
    mouseController.onLeftClick((position) => {
      player.velocity = Vector.zero();
      // player.position = position;
      player.position = camera.position.plus(position);
    });

    // Add base entities
    game.add(player);
    // game.add(new Fps());

    engine.run();
  });
});
