import Animation from '../../../Engine/Graphic/Animations/Animation.js';
import Solid from '../../../Engine/Behaviour/Components/Solid.js';
import Collisions from '../../../Engine/Behaviour/Components/Collisions.js';
import Intersection from '../../../Engine/Behaviour/Components/Intersection.js';
import Killable from '../../Components/Killable.js';
import Walking from '../../Components/Walking.js';
import Stompable from '../../Components/Stompable.js';
import Goomba from './Goomba.js';

export default class GoombaFactory {
  /**
   * GoombaFactory constructor
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
    const animationsMap = new Map();

    animationsMap.set('move', new Animation([
      this.spriteMap.get('goomba-move-1'),
      this.spriteMap.get('goomba-move-2'),
    ]));

    animationsMap.set('flat', new Animation([
      this.spriteMap.get('goomba-flat'),
    ]));

    return animationsMap;
  }

  /**
   * Create a goomba
   *
   * @param {EntityManager} entityManager
   * @returns {Goomba}
   */
  create(entityManager) {
    const goomba = new Goomba(this.createAnimationsMap());

    goomba.addComponent(new Stompable(goomba));
    goomba.addComponent(new Solid(goomba));
    goomba.addComponent(new Walking(goomba, game.config.enemies.goomba.speed));
    goomba.addComponent(new Killable(goomba, entityManager));
    goomba.addComponent(new Collisions(goomba));
    goomba.addComponent(new Intersection(goomba));

    goomba.size.setWidth(14).setHeight(16);

    return goomba;
  }
}
