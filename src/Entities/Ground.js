export default class Ground {
  constructor(position, rect, image) {
    this.position = position;
    this.rect = rect;
    this.image = image;
  }

  update() {
    // Update ground logic...
  }

  render(view) {
    view.image(this.image, this.position, this.rect);
  }
}
