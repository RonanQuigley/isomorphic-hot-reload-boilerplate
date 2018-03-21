const chokidar = require('chokidar');
const path = require('path');
const open = require('opn');

module.exports = (compiler, hotMiddleware) => {

    if (!compiler) throw 'compiler is undefined';
    if (!hotMiddleware) throw 'webpack hot middleware is undefined';

    // Do "hot-reloading" of express stuff on the server
    // Throw away cached modules and re-require next time
    // Ensure there's no important state in there!
    const watcher = chokidar.watch(
        path.resolve(__dirname, '../src'),
    );

    // watch our server side files for changes
    watcher.on('ready', () => {
        watcher.on('all', () => {
            console.log("Clearing /src/ module cache from server");
            Object.keys(require.cache).forEach((id) => {
                if (/[\/\\]src[\/\\]/.test(id)) delete require.cache[id];
            });
            hotMiddleware.publish({ reload: true });
        });
    });

    // Do "hot-reloading" of react stuff on the server
    // Throw away the cached client modules and let them be re-required next time
    compiler.plugin('done', () => {
        console.log("Clearing /client/ module cache from server");
        Object.keys(require.cache).forEach((id) => {
            if (/[\/\\]client[\/\\]/.test(id)) delete require.cache[id];
        });
    })

    open("http://localhost:" + (process.env.PORT || 3000), {
        app: ['chrome', '--incognito']
    });

}
