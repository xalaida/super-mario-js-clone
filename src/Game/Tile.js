export default class Tile {
  constructor(image, position, size) {
    this.image = image;
    this.position = position;
    this.size = size;
  }

  render(view) {
    view.image(this.image, this.position, this.size);
  }
}
