import Vector from '../Math/Vector.js';

const LEFT_BUTTON = 0;
const RIGHT_BUTTON = 2;

export default class MouseController {
  /**
   * MouseController constructor
   *
   * @param {CanvasRenderingContext2D} context
   */
  constructor(context) {
    this.context = context;
    this.state = new Map([[LEFT_BUTTON, false], [RIGHT_BUTTON, false]]);
    this.currentPosition = Vector.zero();
    this.previousPosition = Vector.zero();
    this.listenEvents();
    this.initListeners();
  }

  /**
   * Init mouse listeners
   */
  initListeners() {
    this.onRightButtonDragListeners = [];
    this.onLeftButtonDragListeners = [];
    this.onLeftClickListeners = [];
    this.onRightClickListeners = [];
  }

  /**
   * Listen to mouse events
   * TODO: refactor with context passing as DOMNode
   */
  listenEvents() {
    this.context.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.context.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
    this.context.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
  }

  /**
   * Handle the mouse down event
   *
   * @param {MouseEvent} event
   */
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

  /**
   * Handle the mouse up event
   *
   * @param {MouseEvent} event
   */
  handleMouseUp(event) {
    if (!this.state.has(event.button)) {
      return;
    }

    event.preventDefault();
    this.state.set(event.button, false);
  }

  /**
   * Handle the mouse move event
   *
   * @param {MouseEvent} event
   */
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

  /**
   * Attach the right mouse button drag listener
   *
   * @param {Function} listener
   */
  onRightButtonDrag(listener) {
    this.onRightButtonDragListeners.push(listener);
  }

  /**
   * Attach the left mouse button drag listener
   *
   * @param {Function} listener
   */
  onLeftButtonDrag(listener) {
    this.onLeftButtonDragListeners.push(listener);
  }

  /**
   * Attach the left mouse button click listener
   *
   * @param {Function} listener
   */
  onLeftClick(listener) {
    this.onLeftClickListeners.push(listener);
  }

  /**
   * Attach the right mouse button click listener
   *
   * @param {Function} listener
   */
  onRightClick(listener) {
    this.onRightClickListeners.push(listener);
  }
}
