import Vector from '../Math/Vector.js';

export default class Controller {
  /**
   * Controller constructor
   *
   * @param {Object} keyBinds
   */
  constructor(keyBinds) {
    this.keyBinds = Object.assign(Controller.defaultControls(), keyBinds);
    this.keys = new Map();
    this.state = new Map();
    this.init();
    this.listenEvents();
  }

  /**
   * Get default key bindings
   *
   * @returns {Object}
   */
  static defaultControls() {
    return {
      ArrowLeft: 'left',
      ArrowUp: 'up',
      ArrowRight: 'right',
      ArrowDown: 'down',
    };
  }

  /**
   * Enable the controller logging
   */
  enableLogging() {
    this.logging = true;
  }

  init() {
    Object.keys(this.keyBinds).forEach((key) => {
      this.keys.set(key, this.keyBinds[key]);
    });

    Object.keys(this.keyBinds).forEach((key) => {
      this.state.set(this.keyBinds[key], false);
    });
  }

  /**
   * Listen to key events
   *
   * @param context
   */
  listenEvents(context = null) {
    (context || window).addEventListener('keydown', this.handleKeyDownEvent.bind(this));
    (context || window).addEventListener('keyup', this.handleKeyUpEvent.bind(this));
  }

  /**
   * Handle the key up controller event
   *
   * @param {KeyboardEvent} event
   */
  handleKeyUpEvent(event) {
    this.handleKeyEvent(event, false);
  }

  /**
   * Handle the key down controller event
   *
   * @param {KeyboardEvent} event
   */
  handleKeyDownEvent(event) {
    this.handleKeyEvent(event, true);
  }

  /**
   * Handle a key controller event
   *
   * @param {KeyboardEvent} event
   * @param {Boolean} state
   */
  handleKeyEvent(event, state) {
    if (this.logging) {
      console.log(`Pressed the key: ${event.key}`);
    }

    if (!this.keys.has(event.key)) {
      return;
    }

    event.preventDefault();

    this.state.set(this.keys.get(event.key), state);
  }

  /**
   * Determine if the key is pressed
   *
   * @param {String} id
   * @returns {Boolean}
   */
  isPressed(id) {
    return !!this.state.get(id);
  }

  /**
   * Render the controller debug status
   *
   * @param {View} view
   */
  debug(view) {
    Object.values(this.keyBinds).forEach((action, index) => {
      const debugString = `${action.toUpperCase()}: ${this.isPressed(action) ? 'Pressed' : 'Released'}`;
      view.text(debugString, new Vector(10, 40 + (index * 20)));
    });
  }
}
