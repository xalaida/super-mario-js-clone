export default class DebugLayer {
  /**
   * DebugLayer constructor
   */
  constructor() {
    this.debuggable = [];
  }

  /**
   * Render the debug layer
   *
   * @param {*} debuggable
   */
  add(debuggable) {
    DebugLayer.guardDebuggable(debuggable);
    this.debuggable.push(debuggable);
  }

  /**
   * Guard not debuggable objects
   *
   * @param debuggable
   */
  static guardDebuggable(debuggable) {
    if (typeof debuggable.debug !== 'function') {
      throw new Error(`Object ${debuggable.constructor.name} does not have a debug function`);
    }
  }

  /**
   * Render the debug layer
   *
   * @param {View} view
   * @param {Camera} camera
   */
  render(view, camera) {
    this.debuggable.forEach(debuggable => debuggable.debug(view, camera));
  }
}
