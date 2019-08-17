import Loop from './Loop/Loop.js';
import SceneManager from './Scenes/SceneManager.js';
import Fps from './Debug/Fps.js';
import Memory from './Debug/Memory.js';

export default class Game {
  /**
   * Create game with all dependencies
   *
   * @param {Config} config
   * @param {View} view
   */
  constructor(config, view) {
    this.config = config;
    this.view = view;
    this.sceneManager = new SceneManager();
    this.fps = new Fps(config);
    this.memory = new Memory(config);
  }

  /**
   * Add a scene to the game
   *
   * @param {String} name
   * @param {Scene} scene
   */
  addScene(name, scene) {
    this.sceneManager.add(name, scene);
  }

  /**
   * Start the game scene
   *
   * @param {String} sceneName
   */
  start(sceneName) {
    this.sceneManager.setCurrent(sceneName);
    this.sceneManager.load()
      .then(() => {
        this.startLoop();
      });
  }

  /**
   * Start the game loop
   */
  startLoop() {
    const loop = new Loop(this, this.config.fps);
    loop.run();
  }

  /**
   * Update the game state
   *
   * @param {Number} deltaTime
   */
  update(deltaTime) {
    this.sceneManager.scene.update(deltaTime);
  }

  /**
   * Render the game state
   *
   * @param {Number} interpolation
   */
  render(interpolation) {
    this.sceneManager.scene.render(this.view, interpolation);

    if (this.config.debug.fps) {
      this.fps.render(this.view);
    }

    if (this.config.debug.memory) {
      this.memory.render(this.view);
    }
  }
}
