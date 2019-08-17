export default class SceneManager {
  /**
   * SceneManager constructor
   */
  constructor() {
    this.scenes = new Map();
    this.current = null;
  }

  /**
   * Get the current scene
   *
   * @returns {Scene}
   */
  get scene() {
    return this.get(this.current);
  }

  /**
   * Add the new scene
   *
   * @param {String} name
   * @param {Scene} scene
   */
  add(name, scene) {
    this.scenes.set(name, scene);
  }

  /**
   * Get a scene by name
   *
   * @param {String} name
   * @returns {Scene}
   */
  get(name) {
    return this.scenes.get(name);
  }

  /**
   * Set current scene
   *
   * @param {String} name
   */
  setCurrent(name) {
    this.guardUndefinedScene(name);
    this.current = name;
  }

  /**
   * Load the current scene
   *
   * @returns {Promise}
   */
  load() {
    return this.scene.load();
  }

  /**
   * Load all scenes
   *
   * @returns {Promise}
   */
  loadAll() {
    const loads = [];

    this.scenes.forEach((scene) => {
      loads.push(scene.load());
    });

    return Promise.all(loads);
  }

  /**
   * Guard against undefined scene
   *
   * @param {String} name
   */
  guardUndefinedScene(name) {
    if (!this.scenes.has(name)) {
      throw new Error(`Scene ${name} is not defined`);
    }
  }
}
