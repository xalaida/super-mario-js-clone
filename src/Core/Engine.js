export default class Engine {
    constructor(update, render) {
        this.update = update;
        this.render = render;
    }

    run() {
        this.update();
        this.render();

        requestAnimationFrame(() => this.run());
    }
}
