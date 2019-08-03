import Config from '../../Engine/Config/Config.js';

const config = new Config({
  fps: 60,
  width: 640,
  height: 480,
  tiles: {
    size: {
      width: 16,
      height: 16,
    },
  },
});

config.debug.fps = true;
config.debug.tiles = true;

export default config;
