export default class View {
    constructor(context) {
        this.context = context;
    }

    // TODO: extract to context factory
    static generateContext(width = 640, height = 480, append = false) {
        const canvas = document.createElement('canvas');

        canvas.width = width;
        canvas.height = height;

        if (append) {
            document.body.appendChild(canvas);
        }

        return canvas.getContext('2d');
    }

    render() {
        this.context.save();
        this.context.fillStyle = 'pink';
        this.context.fillRect(0, 0, 640, 480);
        this.context.restore();
    }

    getRandomColor() {
        const colors = ['green', 'blue', 'red', 'pink', 'orange', 'purple'];

        return colors[Math.floor(Math.random() * colors.length)];
    }
}
