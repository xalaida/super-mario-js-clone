export default class SceneManager {
  constructor() {
    this.scenes = new Map();
    this.current = null;
  }

  get scene() {
    return this.get(this.current);
  }

  add(name, scene) {
    this.scenes.set(name, scene);
  }

  get(name) {
    return this.scenes.get(name);
  }

  setCurrent(name) {
    this.guardUndefinedScene(name);
    this.current = name;
  }

  load() {
    return this.scene.load();
  }

  loadAll() {
    const loads = [];

    this.scenes.forEach((scene) => {
      loads.push(scene.load());
    });

    return Promise.all(loads);
  }

  guardUndefinedScene(name) {
    if (!this.scenes.has(name)) {
      throw new Error(`Scene ${name} is not defined`);
    }
  }
}
