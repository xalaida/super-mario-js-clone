export default class CanvasFactory {
  /**
   * Create a canvas for game rendering
   *
   * @param width
   * @param height
   * @param appendTo
   * @param disableContextMenu
   * @returns {CanvasRenderingContext2D}
   */
  static createContext(width, height, appendTo = null, disableContextMenu = true) {
    const canvas = document.createElement('canvas');

    canvas.width = width;
    canvas.height = height;

    if (appendTo) {
      appendTo.appendChild(canvas);
    }

    if (disableContextMenu) {
      canvas.addEventListener('contextmenu', (event) => {
        event.preventDefault();
      });
    }

    return canvas.getContext('2d');
  }
}
