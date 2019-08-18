/* eslint-disable quote-props */

import ImageLoader from '../../Engine/Loaders/ImageLoader.js';
import Scene from '../../Engine/Scenes/Scene.js';
import SpriteMap from '../../Engine/Graphic/Sprites/SpriteMap.js';
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

export default class PlayScene extends Scene {
  /**
   * PlayScene constructor
   */
  constructor() {
    super();
    this.systems = new Map();
    this.layers = new Map();
    this.entityManager = new EntityManager();
    this.camera = new Camera(Vector.zero(), new Size(500, 400));
    this.animationManager = new AnimationManager();
  }

  /**
   * Load the scene
   *
   * @returns {Promise}
   */
  load() {
    return Promise.all([
      this.loadTiles(),
      this.loadEntities(),
    ])
      .then(() => this.loadDebug())
      .then(() => this.loadSystems());
  }

  loadTiles() {
    // TODO: refactor loading level with JSON specification
    return ImageLoader.load('/resources/sprites/world-sprite.png')
      .then((image) => {
        const sprite = new SpriteMap(image);

        sprite.define('ground', new Vector(0, 0), new Size(16, 16));
        sprite.define('bricks', new Vector(16, 0), new Size(16, 16));

        sprite.define('chance-1', new Vector(384, 0), new Size(16, 16));
        sprite.define('chance-2', new Vector(400, 0), new Size(16, 16));
        sprite.define('chance-3', new Vector(416, 0), new Size(16, 16));

        // Sprite groups
        sprite.define('pipe-vertical-top-left', new Vector(0, 128), new Size(16, 16));
        sprite.define('pipe-vertical-top-right', new Vector(16, 128), new Size(16, 16));
        sprite.define('pipe-vertical-left', new Vector(0, 144), new Size(16, 16));
        sprite.define('pipe-vertical-right', new Vector(16, 144), new Size(16, 16));

        sprite.define('cloud-1-1', new Vector(0, 320), new Size(16, 16));
        sprite.define('cloud-1-2', new Vector(16, 320), new Size(16, 16));
        sprite.define('cloud-1-3', new Vector(32, 320), new Size(16, 16));
        sprite.define('cloud-2-1', new Vector(0, 336), new Size(16, 16));
        sprite.define('cloud-2-2', new Vector(16, 336), new Size(16, 16));
        sprite.define('cloud-2-3', new Vector(32, 336), new Size(16, 16));

        return sprite;
      })
      .then((sprite) => {
        this.animationManager.add('chance', new Animation([
          sprite.get('chance-1'),
          sprite.get('chance-1'),
          sprite.get('chance-2'),
          sprite.get('chance-3'),
          sprite.get('chance-2'),
        ], 8));

        const mapping = {
          // Blocks
          '#': { sprite: 'ground', type: 'image', options: { solid: true } },
          '%': { sprite: 'bricks', type: 'image', options: { solid: true } },
          'O': { sprite: 'chance', type: 'animation', options: { solid: true } },

          // Vertical Pipe
          '╗': { sprite: 'pipe-vertical-top-left', type: 'image', options: { solid: true } },
          '╔': { sprite: 'pipe-vertical-top-right', type: 'image', options: { solid: true } },
          '⎜': { sprite: 'pipe-vertical-left', type: 'image', options: { solid: true } },
          '⎥': { sprite: 'pipe-vertical-right', type: 'image', options: { solid: true } },

          // Structures
          '╭': { sprite: 'cloud-1-1', type: 'image', options: { solid: false, layer: 'background' } },
          '╌': { sprite: 'cloud-1-2', type: 'image', options: { solid: false, layer: 'background' } },
          '╮': { sprite: 'cloud-1-3', type: 'image', options: { solid: false, layer: 'background' } },
          '╰': { sprite: 'cloud-2-1', type: 'image', options: { solid: false, layer: 'background' } },
          '━': { sprite: 'cloud-2-2', type: 'image', options: { solid: false, layer: 'background' } },
          '╯': { sprite: 'cloud-2-3', type: 'image', options: { solid: false, layer: 'background' } },
        };

        const tileSize = new Size(game.config.tiles.size.width, game.config.tiles.size.height);
        const collisionsTileMap = new TileMap(game.config, tileSize);
        const backgroundTileMap = new TileMap(game.config, tileSize);


        this.tileCollider = new TileCollider(collisionsTileMap);

        const debugLayer = new DebugLayer();

        if (game.config.debug.tiles) {
          debugLayer.add(backgroundTileMap);
          debugLayer.add(collisionsTileMap);
        }

        if (game.config.debug.collisions) {
          debugLayer.add(this.tileCollider);
        }

        if (game.config.debug.camera) {
          debugLayer.add(this.camera);
        }

        this.layers.set('sky', new SkyLayer('#64abfa'));
        this.layers.set('background', new BackgroundLayer(backgroundTileMap));
        this.layers.set('collisions', new CollisionsLayer(collisionsTileMap, this.entityManager.getEntities()));
        this.layers.set('debug', debugLayer);

        return (new TileMapLoader(sprite, this.animationManager))
          .setTileMaps(collisionsTileMap, backgroundTileMap)
          .loadLvl('/resources/levels/1-1.lvl', mapping);
      });
  }

  loadEntities() {
    return SpriteLoader.load('/resources/specs/characters.json')
      .then(spriteMap => this.loadGoomba(spriteMap))
      .then(spriteMap => this.loadKoopa(spriteMap))
      .then(spriteMap => this.loadController(spriteMap))
      .then(spriteMap => this.loadMario(spriteMap));
  }

  loadController(spriteMap) {
    const keyBinds = {
      'ArrowLeft': 'left',
      'ArrowUp': 'up',
      'ArrowRight': 'right',
      'ArrowDown': 'down',
      ' ': 'a',
    };

    this.controller = new Controller(keyBinds);
    this.controller.enableLogging();

    return spriteMap;
  }

  loadGoomba(spriteMap) {
    const goombaFactory = new GoombaFactory(spriteMap);
    const goomba = goombaFactory.create(this.entityManager);
    goomba.position.setX(400).setY(200);
    goomba.velocity.setX(-game.config.enemies.goomba.speed);

    this.entityManager.add(goomba);

    return spriteMap;
  }

  loadKoopa(spriteMap) {
    const koopaFactory = new KoopaFactory(spriteMap);
    const koopa = koopaFactory.create(this.entityManager);
    koopa.position.setX(350).setY(200);

    this.entityManager.add(koopa);

    return spriteMap;
  }

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

  loadDebug() {
    this.layers.get('debug').add(this.entityManager);

    // TODO: refactor
    if (game.config.debug.controller) {
      this.layers.get('debug').add(this.controller);
    }
  }

  loadSystems() {
    this.systems.set('entities', new EntitiesSystem(this.entityManager.getEntities()));
    this.systems.set('gravity', new GravitySystem(this.entityManager.getEntities()));
    this.systems.set('friction', new FrictionSystem([this.mario]));
    this.systems.set('intersection', new IntersectionSystem(this.entityManager));
    this.systems.set('collision', new CollisionSystem(this.entityManager.getEntities(), this.tileCollider));
    this.systems.set('animation', this.animationManager);
    this.systems.set('camera', this.camera);
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
