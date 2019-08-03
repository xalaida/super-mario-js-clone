import Vector from '../Math/Vector.js';

export default class Controller {
  constructor(keyBinds) {
    this.keyBinds = Object.assign(Controller.defaultControls(), keyBinds);
    this.keys = new Map();
    this.state = new Map();
    this.init();
    this.listenEvents();
  }

  static defaultControls() {
    return {
      ArrowLeft: 'left',
      ArrowUp: 'up',
      ArrowRight: 'right',
      ArrowDown: 'down',
    };
  }

  init() {
    Object.keys(this.keyBinds).forEach((key) => {
      this.keys.set(key, this.keyBinds[key]);
    });

    Object.keys(this.keyBinds).forEach((key) => {
      this.state.set(this.keyBinds[key], false);
    });
  }

  listenEvents() {
    // TODO: maybe swap with context instead of window
    window.addEventListener('keydown', this.handleKeyDownEvent.bind(this));
    window.addEventListener('keyup', this.handleKeyUpEvent.bind(this));
  }

  handleKeyUpEvent(event) {
    this.handleKeyEvent(event, false);
  }

  handleKeyDownEvent(event) {
    this.handleKeyEvent(event, true);
  }

  handleKeyEvent(event, state) {
    if (!this.keys.has(event.key)) {
      return;
    }

    event.preventDefault();

    this.state.set(this.keys.get(event.key), state);
  }

  isPressed(id) {
    return this.state.get(id);
  }

  render(view) {
    Object.values(this.keyBinds).forEach((action, index) => {
      const debugString = `${action.toUpperCase()}: ${this.isPressed(action) ? 'Pressed' : 'Released'}`;
      view.text(debugString, new Vector(10, 20 + (index * 20)));
    });
  }
}
