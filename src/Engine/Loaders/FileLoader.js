export default class FileLoader {
  /**
   * Load a file by url
   *
   * @param {String} url
   * @returns {Promise<String>}
   */
  static load(url) {
    return new Promise((resolve, reject) => {
      const rawFile = new XMLHttpRequest();
      rawFile.open('GET', `${url}?${Date.now()}`, false);

      rawFile.onreadystatechange = () => {
        if (rawFile.readyState === 4) {
          if (rawFile.status === 200 || rawFile.status === 0) {
            return resolve(rawFile.responseText);
          }
        }

        return reject();
      };

      rawFile.send(null);
    });
  }
}
