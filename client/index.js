import '../common/index';
import './example-file';

if (process.env.NODE_ENV === 'development') {
    const webpackHotMiddleware = require('webpack-hot-middleware/client');
    webpackHotMiddleware.subscribe((message) => {
        if (message.reload === true) {
            window.location.reload();
        }
    })
}

// if (module.hot) {
//     console.log(module.hot.status());
// }

// module.hot.addStatusHandler(status => {
//     console.log('status has changed: ' + status);
// })



