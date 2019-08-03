import Config from '../../Engine/Config/Config.js';

export default new Config({
  fps: 15,
  width: 640,
  height: 480,
  tiles: {
    size: {
      width: 16,
      height: 16,
    },
  },
  showFps: true,
  showTileGrid: true,
});
