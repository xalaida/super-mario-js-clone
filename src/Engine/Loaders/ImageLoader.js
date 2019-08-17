export default class ImageLoader {
  /**
   * Load an image by url
   *
   * @param {String} url
   * @returns {Promise<Image>}
   */
  static load(url) {
    return new Promise((resolve) => {
      const image = new Image();

      image.addEventListener('load', () => {
        resolve(image);
      });

      image.src = url;
    });
  }
}
