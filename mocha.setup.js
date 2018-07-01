require('@babel/register');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const { document } = new JSDOM(
    '<!doctype html><html><body></body></html>'
).window;

// setup our globals with jsdom for unit tests
global.document = document;
global.window = document.defaultView;
window.console = global.console;

Object.keys(document.defaultView).forEach(property => {
    if (typeof global[property] === 'undefined') {
        global[property] = document.defaultView[property];
    }
});

global.navigator = {
    userAgent: 'node.js'
};

/* react will emit a warning about request animation frame,
so we declare a mock one for use */

global.requestAnimationFrame = cb => setTimeout(cb, 0);

process.env.NODE_ENV = 'test';
process.env.ENABLE_LOGGING = 'false';

/* react propTypes warnings do not produce full stack traces.
by using error we can get around that */

const error = console.error;
console.error = function(warning, ...args) {
    if (/(Invalid prop|Failed prop type)/.test(warning)) {
        throw new Error(warning);
    }
    error.apply(console, [warning, ...args]);
};
