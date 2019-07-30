export default class CanvasFactory {
  static create(size, appendTo = null, disableContextMenu = true) {
    const canvas = document.createElement('canvas');

    canvas.width = size.width;
    canvas.height = size.height;

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
