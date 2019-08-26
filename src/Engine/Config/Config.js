export default class Config {
  /**
   * Config constructor
   *
   * @param {Object} options
   */
  constructor(options = {}) {
    Object.assign(this, this.merge(this, Config.defaults));
    Object.assign(this, this.merge(this, options));
  }

  /**
   * Default config options
   *
   * @returns {Object}
   */
  static get defaults() {
    return {
      fps: 60,
      width: 400,
      height: 400,
      debug: {
        enable: true,
        components: {
          fps: true,
          memory: true,
          tiles: true,
        },
      },
    };
  }

  /**
   * Determine if component should be debugged
   *
   * @param {String} component
   */
  shouldDebug(component) {
    return this.debug.enable && this.debug.components[component];
  }

  /**
   * Merge the configurations
   *
   * @param {Object} target
   * @param {Object} source
   * @returns {Object}
   */
  merge(target, source) {
    const output = Object.assign({}, target);

    if (typeof target === 'object' && typeof source === 'object') {
      Object.keys(source).forEach((key) => {
        if (typeof source[key] === 'object') {
          if (!(key in target)) {
            Object.assign(output, { [key]: source[key] });
          } else {
            output[key] = this.merge(target[key], source[key]);
          }
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }

    return output;
  }
}
