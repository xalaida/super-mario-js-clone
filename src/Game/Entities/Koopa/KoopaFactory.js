import Animation from '../../../Engine/Graphic/Animations/Animation.js';
import Direction from '../../Components/Direction.js';
import Solid from '../../../Engine/Behaviour/Components/Solid.js';
import Collisions from '../../../Engine/Behaviour/Components/Collisions.js';
import Intersection from '../../../Engine/Behaviour/Components/Intersection.js';
import Killable from '../../Components/Killable.js';
import Koopa from './Koopa.js';
import Walking from '../../Components/Walking.js';
import Stompable from '../../Components/Stompable.js';
import WalkingState from './States/WalkingState.js';

export default class KoopaFactory {
  /**
   * KoopaFactory constructor
   *
   * @param {SpriteMap} spriteMap
   * @param {EntityManager} entityManager
   */
  constructor(spriteMap, entityManager) {
    this.spriteMap = spriteMap;
    this.entityManager = entityManager;
  }

  /**
   * Create animations map
   *
   * @returns {Map<String, Animation>}
   */
  createAnimationsMap() {
    const animationsMap = new Map();

    animationsMap.set('moveRight', new Animation([
      this.spriteMap.get('koopa-move-right-1'),
      this.spriteMap.get('koopa-move-right-2'),
    ]));

    animationsMap.set('moveLeft', new Animation([
      this.spriteMap.get('koopa-move-left-1'),
      this.spriteMap.get('koopa-move-left-2'),
    ]));

    animationsMap.set('hiding', new Animation([
      this.spriteMap.get('koopa-hiding'),
    ]));

    animationsMap.set('wakingUp', new Animation([
      this.spriteMap.get('koopa-hiding'),
      this.spriteMap.get('koopa-waking-up'),
    ]));

    return animationsMap;
  }

  /**
   * Create a koopa
   *
   * @param {Vector} position
   * @returns {Koopa}
   */
  create(position) {
    const koopa = new Koopa(this.createAnimationsMap());

    koopa.addComponent(Direction.left(koopa));
    koopa.addComponent(new Walking(koopa, game.config.enemies.koopa.speed));
    koopa.addComponent(new Solid(koopa));
    koopa.addComponent(new Killable(koopa, this.entityManager));
    koopa.addComponent(new Stompable(koopa));
    koopa.addComponent(new Collisions(koopa));
    koopa.addComponent(new Intersection(koopa));

    koopa.setState(new WalkingState(koopa));

    koopa.size.setWidth(14).setHeight(16);
    koopa.position.set(position);

    return koopa;
  }
}
