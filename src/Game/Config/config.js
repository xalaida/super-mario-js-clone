import Config from '../../Engine/Config/Config.js';

const config = new Config({
  fps: 60,
  width: 640,
  height: 240,
  tiles: {
    size: {
      width: 16,
      height: 16,
    },
  },
  physics: {
    gravity: 600,
    friction: 50,
  },
  player: {
    maxSpeed: 80,
    acceleration: 120,
    turboMaxSpeed: 120,
    turboAcceleration: 120,
  },
  enemies: {
    goomba: {
      speed: 20,
    },
    koopa: {
      speed: 20,
      panicSpeed: 200,
    },
  },
  components: {
    jump: {
      power: 150,
      graceTime: 0.4,
      speedBoost: 0.3,
    },
  },
  debug: {
    fps: true,
    memory: true,
    tiles: true,
    collisions: true,
    camera: true,
    controller: true,
    entities: true,
    colors: {
      hitBox: 'blue',
      drawBox: 'red',
      tile: 'green',
    },
  },
});

export default config;
