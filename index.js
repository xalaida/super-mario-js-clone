/* eslint-disable import/extensions */
import Game from './src/Core/Game.js';
import Engine from './src/Core/Engine.js';
import Controller from './src/Core/Controller.js';
import View from './src/Graphic/View.js';
import CanvasFactory from './src/Graphic/CanvasFactory.js';
import Fps from './src/Fps.js';
import Player from './src/Player.js';
import Ground from './src/Entities/Ground.js';
import Vector from './src/Utils/Vector.js';
import Size from './src/Utils/Size.js';
import Position from './src/Utils/Position.js';
import Sprite from './src/Graphic/Sprite.js';

// View init
const view = new View(CanvasFactory.generate(new Size(640, 480), document.body));

// TODO: resolve with promise loader (add Promise.all([spriteLoader, levelBuilder]).then(game.start()))
const sprite = new Sprite('src/Resources/world-sprite.png');
sprite.define('world-ground', new Position(0, 0), new Size(16, 16));

// Controller
const controller = new Controller();

// Game init
const game = new Game(controller, view);
const engine = new Engine(game);

// Game scene
// TODO: ground building (extract into level builder)
game.add(new Ground(new Vector(100, 100), new Size(50, 50), sprite.get('world-ground')));
game.add(new Ground(new Vector(150, 100), new Size(50, 50), sprite.get('world-ground')));
game.add(new Ground(new Vector(200, 100), new Size(50, 50), sprite.get('world-ground')));
game.add(new Ground(new Vector(250, 100), new Size(20, 20), sprite.get('world-ground')));

game.add(new Fps());
game.add(new Player(controller, game.friction, game.gravity));

// Events registering
// TODO: Probably extract this event into their own classes
window.addEventListener('keydown', controller.handleKeyDown.bind(controller));
window.addEventListener('keyup', controller.handleKeyUp.bind(controller));
window.addEventListener('load', engine.run.bind(engine));
