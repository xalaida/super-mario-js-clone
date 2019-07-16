import Engine from './src/Core/Engine.js';
import View from './src/Core/View.js';
import ContextFactory from './src/Core/ContextFactory.js';

const view = new View(ContextFactory.generate(640, 480, document.body));

const engine = new Engine(() => console.log('tick'), view.render.bind(view));

engine.run();
