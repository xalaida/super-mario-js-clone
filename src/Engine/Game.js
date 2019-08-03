import Loop from './Loop/Loop.js';
import SceneManager from './Scenes/SceneManager.js';
import Fps from './Debug/Fps.js';

export default class Game {
  /**
   * Create game with all dependencies
   *
   * @param config
   * @param view
   */
  constructor(config, view) {
    this.config = config;
    this.view = view;
    this.sceneManager = new SceneManager();
    this.fps = new Fps(config);
  }

  /**
   * Add scene to game
   *
   * @param name
   * @param scene
   */
  addScene(name, scene) {
    this.sceneManager.add(name, scene);
  }

  /**
   * Start game scene
   *
   * @param sceneName
   */
  start(sceneName) {
    this.sceneManager.setCurrent(sceneName);
    this.sceneManager.load()
      .then(() => {
        this.startLoop();
      });
  }

  /**
   * Start game loop
   */
  startLoop() {
    const loop = new Loop(this, this.config.fps);
    loop.run();
  }

  /**
   * Update the game state
   *
   * @param deltaTime
   */
  update(deltaTime) {
    this.sceneManager.scene.update(deltaTime);

    if (this.config.debug.fps) {
      this.fps.update();
    }
  }

  /**
   * Render the game state
   *
   * @param interpolation
   */
  render(interpolation) {
    this.sceneManager.scene.render(this.view, interpolation);

    if (this.config.debug.fps) {
      this.fps.render(this.view);
    }
  }
}
