import Vector from '../Math/Vector.js';

const LEFT_BUTTON = 0;
const RIGHT_BUTTON = 2;

export default class MouseController {
  constructor(context) {
    this.context = context;
    this.state = new Map([[LEFT_BUTTON, false], [RIGHT_BUTTON, false]]);
    this.currentPosition = Vector.zero();
    this.previousPosition = Vector.zero();
    this.listenEvents();
    this.initListeners();
  }

  initListeners() {
    this.onRightButtonDragListeners = [];
    this.onLeftButtonDragListeners = [];
    this.onLeftClickListeners = [];
    this.onRightClickListeners = [];
  }

  listenEvents() {
    this.context.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.context.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
    this.context.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
  }

  handleMouseDown(event) {
    if (!this.state.has(event.button)) {
      return;
    }

    event.preventDefault();
    this.state.set(event.button, true);

    // fire click events
    // TODO: refactor with one function for both buttons
    if (this.state.get(LEFT_BUTTON)) {
      this.onLeftClickListeners.forEach((listener) => {
        listener(this.currentPosition);
      });
    }
    if (this.state.get(RIGHT_BUTTON)) {
      this.onRightClickListeners.forEach((listener) => {
        listener(this.currentPosition);
      });
    }
  }

  handleMouseUp(event) {
    if (!this.state.has(event.button)) {
      return;
    }

    event.preventDefault();
    this.state.set(event.button, false);
  }

  handleMouseMove(event) {
    this.previousPosition = this.currentPosition;
    this.currentPosition = new Vector(event.offsetX, event.offsetY);

    // fire drag event
    // TODO: refactor with one function for both buttons
    if (this.state.get(LEFT_BUTTON)) {
      this.onLeftButtonDragListeners.forEach((listener) => {
        listener(this.currentPosition, this.previousPosition);
      });
    }
    if (this.state.get(RIGHT_BUTTON)) {
      this.onRightButtonDragListeners.forEach((listener) => {
        listener(this.currentPosition, this.previousPosition);
      });
    }
  }

  onRightButtonDrag(listener) {
    this.onRightButtonDragListeners.push(listener);
  }

  onLeftButtonDrag(listener) {
    this.onLeftButtonDragListeners.push(listener);
  }

  onLeftClick(listener) {
    this.onLeftClickListeners.push(listener);
  }

  onRightClick(listener) {
    this.onRightClickListeners.push(listener);
  }
}
