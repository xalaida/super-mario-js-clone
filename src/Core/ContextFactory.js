export default class ContextFactory {
    static generate(width = 640, height = 480, appendTo = null) {
        const canvas = document.createElement('canvas');

        canvas.width = width;
        canvas.height = height;

        if (appendTo) {
            appendTo.appendChild(canvas);
        }

        return canvas.getContext('2d');
    }
}
