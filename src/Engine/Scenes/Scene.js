export default class Scene {
  /**
   * Load game scene
   * Used for loading all scene resources, e.g. textures, sounds, etc.
   * Must must return the Promise
   *
   * @returns {Promise}
   */
  load() {
    return new Promise((resolve) => {
      console.log(`Scene ${this.constructor.name} is loaded`);
      resolve();
    });
  }

  /**
   * Update game scene every tick
   * Used for calculation all entities behaviour, system updates, etc.
   */
  update() {
    console.log(`Override the default update() scene ${this.constructor.name} method.`);
  }

  /**
   * Render game scene.
   * Used for rendering the game state to the context
   */
  render() {
    console.log(`Override the default render() scene ${this.constructor.name} method.`);
  }
}
