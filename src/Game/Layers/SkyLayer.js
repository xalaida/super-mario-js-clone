export default class SkyLayer {
  /**
   * SkyLayer constructor
   *
   * @param {String} color
   */
  constructor(color) {
    this.color = color;
  }

  /**
   * Render the sky layer
   *
   * @param {View} view
   */
  render(view) {
    view.fill(this.color);
  }
}
