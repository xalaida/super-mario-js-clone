import Animation from '../../../Engine/Graphic/Animations/Animation.js';
import Mario from './Mario.js';
import Falling from './Components/Falling.js';
import Jump from './Components/Jump.js';
import Movement from './Components/Movement.js';
import Direction from '../../Components/Direction.js';
import Turbo from './Components/Turbo.js';
import Stomper from './Components/Stomper.js';
import Solid from '../../../Engine/Behaviour/Components/Solid.js';
import Collisions from '../../../Engine/Behaviour/Components/Collisions.js';
import Intersection from '../../../Engine/Behaviour/Components/Intersection.js';
import Killable from '../../Components/Killable.js';
import Respawn from './Components/Respawn.js';

export default class MarioFactory {
  /**
   * MarioFactory constructor
   *
   * @param spriteMap
   */
  constructor(spriteMap) {
    this.spriteMap = spriteMap;
  }

  /**
   * Create animations map
   *
   * @returns {Map<String, Animation>}
   */
  createAnimationsMap() {
    const animationMap = new Map();

    animationMap.set('moveRight', new Animation([
      this.spriteMap.get('mario-move-right-1'),
      this.spriteMap.get('mario-move-right-2'),
      this.spriteMap.get('mario-move-right-3'),
    ]));

    animationMap.set('moveLeft', new Animation([
      this.spriteMap.get('mario-move-left-1'),
      this.spriteMap.get('mario-move-left-2'),
      this.spriteMap.get('mario-move-left-3'),
    ]));

    animationMap.set('breakLeft', new Animation([
      this.spriteMap.get('mario-break-left'),
    ]));

    animationMap.set('breakRight', new Animation([
      this.spriteMap.get('mario-break-right'),
    ]));

    animationMap.set('idleLeft', new Animation([
      this.spriteMap.get('mario-idle-left'),
    ]));

    animationMap.set('idleRight', new Animation([
      this.spriteMap.get('mario-idle-right'),
    ]));

    animationMap.set('jumpLeft', new Animation([
      this.spriteMap.get('mario-jump-left'),
    ]));

    animationMap.set('jumpRight', new Animation([
      this.spriteMap.get('mario-jump-right'),
    ]));

    return animationMap;
  }

  /**
   * Create a mario
   *
   * @param {Controller} controller
   * @param {EntityManager} entityManager
   * @param {Camera} camera
   * @returns {Mario}
   */
  create(controller, entityManager, camera) {
    const mario = new Mario(controller, this.createAnimationsMap());

    mario.addComponent(new Falling(mario));
    mario.addComponent(new Jump(mario));
    mario.addComponent(new Movement(mario));
    mario.addComponent(Direction.right(mario));
    mario.addComponent(new Turbo(mario));
    mario.addComponent(new Stomper(mario));
    mario.addComponent(new Solid(mario));
    mario.addComponent(new Collisions(mario));
    mario.addComponent(new Intersection(mario));
    mario.addComponent(new Killable(mario, entityManager));
    mario.addComponent(new Respawn(mario, camera));

    mario.size.setWidth(14).setHeight(16);

    return mario;
  }
}
