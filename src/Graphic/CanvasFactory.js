export default class CanvasFactory {
  static create(size, appendTo = null) {
    const canvas = document.createElement('canvas');

    canvas.width = size.width;
    canvas.height = size.height;

    if (appendTo) {
      appendTo.appendChild(canvas);
    }

    return canvas.getContext('2d');
  }
}
