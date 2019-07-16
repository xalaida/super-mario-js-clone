export default class Controller {
  constructor(controls) {
    this.state = {
      up: false,
      down: false,
      left: false,
      right: false,
    };

    this.controls = Object.assign(Controller.getDefaultControls(), controls)
  }

  static getDefaultControls() {
    return {
      left: 'ArrowLeft',
      up: 'ArrowUp',
      right: 'ArrowRight',
      down: 'ArrowDown',
    };
  }

  handleKeyUp(event) {
    this.toggleKey(event.key, false);
  }

  handleKeyDown(event) {
    this.toggleKey(event.key, true);
  }

  toggleKey(code, status) {
    for (let key in this.controls) {
      if (code === this.controls[key]) {
        this.state[key] = status;
      }
    }
  }
}
