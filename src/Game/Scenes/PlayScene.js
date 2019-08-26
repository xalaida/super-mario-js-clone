/* eslint-disable quote-props */

import Scene from '../../Engine/Scenes/Scene.js';
import Vector from '../../Engine/Math/Vector.js';
import Size from '../../Engine/Math/Size.js';
import TileMap from '../../Engine/Tiles/TileMap.js';
import TileMapLoader from '../Loaders/TileMapLoader.js';
import Camera from '../../Engine/Camera/Camera.js';
import Animation from '../../Engine/Graphic/Animations/Animation.js';
import Controller from '../../Engine/Input/Controller.js';
import TileCollider from '../../Engine/Tiles/TileCollider.js';
import MouseController from '../../Engine/Input/MouseController.js';
import AnimationManager from '../../Engine/Graphic/Animations/AnimationManager.js';
import BackgroundLayer from '../Layers/BackgroundLayer.js';
import SkyLayer from '../Layers/SkyLayer.js';
import CollisionsLayer from '../Layers/CollisionsLayer.js';
import DebugLayer from '../Layers/DebugLayer.js';
import EntityManager from '../../Engine/Behaviour/EntityManager.js';
import GravitySystem from '../Systems/GravitySystem.js';
import CollisionSystem from '../Systems/CollisionSystem.js';
import EntitiesSystem from '../Systems/EntitiesSystem.js';
import IntersectionSystem from '../Systems/IntersectionSystem.js';
import FrictionSystem from '../Systems/FrictionSystem.js';
import MarioFactory from '../Entities/Mario/MarioFactory.js';
import KoopaFactory from '../Entities/Koopa/KoopaFactory.js';
import GoombaFactory from '../Entities/Goomba/GoombaFactory.js';
import SpriteLoader from '../../Engine/Loaders/SpriteLoader.js';
import EnemySpawner from '../Spawner/EnemySpawner.js';
import FallOutSystem from '../Systems/FallOutSystem.js';

export default class PlayScene extends Scene {
  /**
   * PlayScene constructor
   */
  constructor() {
    super();
    this.systems = new Map();
    this.layers = new Map();
    this.entityManager = new EntityManager();
    this.camera = new Camera(Vector.zero(), new Size(game.config.width, game.config.height));
    this.animationManager = new AnimationManager();
  }

  /**
   * Load the scene
   *
   * @returns {Promise}
   */
  load() {
    return this.loadTiles()
      .then(() => this.loadEntities())
      .then(() => this.loadSystems())
      .then(() => this.loadLayers())
      .then(() => this.loadDebug());
  }

  /**
   * Load entities of the scene
   *
   * @returns {Promise<SpriteMap>}
   */
  loadEntities() {
    this.enemySpawner = new EnemySpawner(this.enemiesSpawnMap, this.entityManager, this.camera);

    return SpriteLoader.load('/resources/specs/characters.json')
      .then(spriteMap => this.loadGoomba(spriteMap))
      .then(spriteMap => this.loadKoopa(spriteMap))
      .then(spriteMap => this.loadController(spriteMap))
      .then(spriteMap => this.loadMario(spriteMap));
  }

  /**
   * Load level tiles
   * TODO: refactor with LevelLoader
   *
   * @returns {Promise}
   */
  loadTiles() {
    return SpriteLoader.load('/resources/specs/world.json')
      .then(spriteMap => this.loadAnimations(spriteMap))
      .then((sprite) => {
        const tileSize = new Size(game.config.tiles.size.width, game.config.tiles.size.height);
        this.collisionsTileMap = new TileMap(game.config, tileSize);
        this.backgroundTileMap = new TileMap(game.config, tileSize);
        this.enemiesSpawnMap = new TileMap(game.config, tileSize);

        this.tileCollider = new TileCollider(this.collisionsTileMap);

        const mapping = {
          // Blocks
          '▓': { name: 'ground', type: 'image', options: { solid: true } },
          '%': { name: 'bricks', type: 'image', options: { solid: true } },
          '#': { name: 'solid', type: 'image', options: { solid: true } },
          'O': { name: 'chance', type: 'animation', options: { solid: true } },

          // Vertical Pipe
          '╗': { name: 'pipe-vertical-top-left', type: 'image', options: { solid: true } },
          '╔': { name: 'pipe-vertical-top-right', type: 'image', options: { solid: true } },
          '⎜': { name: 'pipe-vertical-left', type: 'image', options: { solid: true } },
          '⎥': { name: 'pipe-vertical-right', type: 'image', options: { solid: true } },

          // Structures
          '╭': { name: 'cloud-1-1', type: 'image', options: { solid: false, layer: 'background' } },
          '╌': { name: 'cloud-1-2', type: 'image', options: { solid: false, layer: 'background' } },
          '╮': { name: 'cloud-1-3', type: 'image', options: { solid: false, layer: 'background' } },
          '╰': { name: 'cloud-2-1', type: 'image', options: { solid: false, layer: 'background' } },
          '━': { name: 'cloud-2-2', type: 'image', options: { solid: false, layer: 'background' } },
          '╯': { name: 'cloud-2-3', type: 'image', options: { solid: false, layer: 'background' } },

          // Structures
          '◞': { name: 'bush-1-1', type: 'image', options: { solid: false, layer: 'background' } },
          '⌒': { name: 'bush-1-2', type: 'image', options: { solid: false, layer: 'background' } },
          '◟': { name: 'bush-1-3', type: 'image', options: { solid: false, layer: 'background' } },

          // Enemy spawns
          '⚆': { name: 'goomba', type: 'enemy', options: {} },
          '⚇': { name: 'koopa', type: 'enemy', options: {} },
        };

        return (new TileMapLoader(sprite, this.animationManager))
          .setTileMaps(this.collisionsTileMap, this.backgroundTileMap, this.enemiesSpawnMap)
          .loadLvl('/resources/levels/1-1.lvl', mapping);
      });
  }

  /**
   * Load animations
   *
   * @param {SpriteMap} spriteMap
   * @returns {SpriteMap}
   */
  loadAnimations(spriteMap) {
    this.animationManager.add('chance', new Animation([
      spriteMap.get('chance-1'),
      spriteMap.get('chance-1'),
      spriteMap.get('chance-2'),
      spriteMap.get('chance-3'),
      spriteMap.get('chance-2'),
    ], 8));

    return spriteMap;
  }

  /**
   * Load the controller
   * TODO: refactor without spriteMap promise resolving
   *
   * @param {SpriteMap} spriteMap
   * @returns {SpriteMap}
   */
  loadController(spriteMap) {
    const keyBinds = {
      'ArrowLeft': 'left',
      'ArrowUp': 'up',
      'ArrowRight': 'right',
      'ArrowDown': 'down',
      ' ': 'a',
    };

    this.controller = new Controller(keyBinds);

    return spriteMap;
  }

  /**
   * Load goomba
   *
   * @param {SpriteMap} spriteMap
   * @returns {SpriteMap}
   */
  loadGoomba(spriteMap) {
    this.enemySpawner.addFactory('goomba', new GoombaFactory(spriteMap, this.entityManager));

    return spriteMap;
  }

  /**
   * Load koopa
   *
   * @param {SpriteMap} spriteMap
   * @returns {SpriteMap}
   */
  loadKoopa(spriteMap) {
    this.enemySpawner.addFactory('koopa', new KoopaFactory(spriteMap, this.entityManager));

    return spriteMap;
  }

  /**
   * Load mario
   *
   * @param {SpriteMap} spriteMap
   * @returns {SpriteMap}
   */
  loadMario(spriteMap) {
    const marioFactory = new MarioFactory(spriteMap);
    this.mario = marioFactory.create(this.controller, this.entityManager, this.camera);
    this.mario.position.setX(100).setY(200);

    this.entityManager.add(this.mario);

    this.camera.follow(this.mario);

    // Mario mouse controller
    const mouseController = new MouseController(game.view.context);

    // Camera simple mouse scroll
    mouseController.onRightButtonDrag((currentPosition, previousPosition) => {
      this.camera.position.set(
        this.camera.position.minusX(currentPosition.minus(previousPosition)),
      );
    });

    // Mario temporary mouse movement
    mouseController.onLeftClick((position) => {
      this.mario.velocity.set(Vector.zero());
      this.mario.position.set(this.camera.position.plus(position));
    });
  }

  /**
   * Load the debug layer
   */
  loadDebug() {
    if (game.config.debug.entities) {
      this.layers.get('debug').add(this.entityManager);
    }

    if (game.config.debug.controller) {
      this.layers.get('debug').add(this.controller);
    }

    if (game.config.debug.collisions) {
      this.layers.get('debug').add(this.tileCollider);
    }

    if (game.config.debug.camera) {
      this.layers.get('debug').add(this.camera);
    }

    if (game.config.debug.tiles) {
      this.layers.get('debug').add(this.layers.get('background').tileMap);
      this.layers.get('debug').add(this.layers.get('collisions').tileMap);
    }
  }

  /**
   * Load all game systems in the correct order:
   *
   * -> Entities intersection (allows to handle correctly all components based on intersection)
   * -> Entity components (process components behaviour for each entity)
   * -> Gravity (apply gravity for entities)
   * -> Friction (apply friction for entities)
   * -> Fall out (kill all fallen entities)
   * -> Collision (process collisions for entities)
   * -> Animation (update all animations)
   * -> Camera (update the camera)
   */
  loadSystems() {
    this.systems.set('intersection', new IntersectionSystem(this.entityManager));
    this.systems.set('entities', new EntitiesSystem(this.entityManager.getEntities()));
    this.systems.set('gravity', new GravitySystem(this.entityManager.getEntities()));
    this.systems.set('friction', new FrictionSystem([this.mario]));
    this.systems.set('fallOut', new FallOutSystem(this.entityManager.getEntities()));
    this.systems.set('collision', new CollisionSystem(this.entityManager.getEntities(), this.tileCollider));
    this.systems.set('animation', this.animationManager);
    this.systems.set('enemies', this.enemySpawner);
    this.systems.set('camera', this.camera);
  }

  /**
   * Load the scene layers in the correct order:
   *
   * -> Sky layer (blue sky as the first render layer)
   * -> Background layer (background tiles like clouds, trees, etc)
   * -> Collisions layer (entities and interactive tiles)
   * -> Debug layer (All debug information)
   * -> UI layer (Game score, current level, hud, game time, etc)
   */
  loadLayers() {
    this.layers.set('sky', new SkyLayer('#64abfa'));
    this.layers.set('background', new BackgroundLayer(this.backgroundTileMap));
    this.layers.set('collisions', new CollisionsLayer(this.collisionsTileMap, this.entityManager.getEntities()));
    this.layers.set('debug', new DebugLayer());
  }

  /**
   * Update the scene
   *
   * @param {Number} deltaTime
   */
  update(deltaTime) {
    this.systems.forEach(system => system.update(deltaTime));
  }

  /**
   * Render the scene
   *
   * @param {View} view
   */
  render(view) {
    this.layers.forEach(layer => layer.render(view, this.camera));
  }
}
