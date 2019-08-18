export default class EnemySpawner {
  /**
   * EnemySpawner constructor
   *
   * @param {TileMap} spawnMap
   * @param {EntityManager} entityManager
   * @param {Camera} camera
   */
  constructor(spawnMap, entityManager, camera) {
    this.spawnMap = spawnMap;
    this.entityManager = entityManager;
    this.camera = camera;
    this.factories = {};
  }

  /**
   * Add the enemy factory
   *
   * @param {String} name
   * @param factory
   */
  addFactory(name, factory) {
    this.factories[name] = factory;
  }

  /**
   * Get an enemy factory by the name
   *
   * @param {String} name
   * @returns {*}
   */
  getFactory(name) {
    return this.factories[name];
  }

  /**
   * Update the enemy spawner
   */
  update() {
    this.spawnMap.findInBounds(this.camera.getBounds())
      .forEach((spawn) => {
        const enemy = this.getFactory(spawn.enemy).create(spawn.position);

        this.entityManager.add(enemy);

        this.spawnMap.removeByPosition(spawn.position);
      });
  }
}
