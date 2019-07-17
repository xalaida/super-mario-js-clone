/* eslint-disable import/extensions */
import Game from './src/Core/Game.js';
import Engine from './src/Core/Engine.js';
import Controller from './src/Core/Controller.js';
import View from './src/Core/View.js';
import ContextFactory from './src/Core/ContextFactory.js';
import Fps from './src/Fps.js';
import Player from './src/Player.js';

// Core init
const view = new View(ContextFactory.generate(640, 480, document.body));
const controller = new Controller();
const game = new Game(controller, view);
const engine = new Engine(game);

// Game scene
game.add(new Fps());
game.add(new Player(controller, game.friction, game.gravity));

// Probably extract this event into their own classes
window.addEventListener('keydown', controller.handleKeyDown.bind(controller));
window.addEventListener('keyup', controller.handleKeyUp.bind(controller));
window.addEventListener('load', engine.run.bind(engine));
