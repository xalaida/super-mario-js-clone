import View from './src/Engine/Graphic/View.js';
import CanvasFactory from './src/Engine/Graphic/CanvasFactory.js';
import Config from './src/Engine/Config/Config.js';
import Game from './src/Engine/Game.js';
import DemoScene from './src/Game/Scenes/DemoScene.js';
import PlayScene from './src/Game/Scenes/PlayScene.js';

window.addEventListener('load', () => {
  const config = new Config({
    fps: 15,
    showFps: true,
    width: 640,
    height: 480,
  });

  const view = new View(CanvasFactory.createContext(config.width, config.height, document.body));

  const game = new Game(config, view);

  game.addScene('demo', new DemoScene());
  game.addScene('play', new PlayScene());

  game.start('play');

  window.game = game;
});
