export default class Controller {
  constructor(controls) {
    this.controls = Object.assign(Controller.defaultControls(), controls);
    this.keys = new Map();
    this.state = new Map();
    this.init();
    this.listenKeys();
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
    Object.keys(this.controls).forEach((key) => {
      this.keys.set(key, this.controls[key]);
    });

    Object.keys(this.controls).forEach((key) => {
      this.state.set(this.controls[key], false);
    });
  }

  listenKeys() {
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
}
