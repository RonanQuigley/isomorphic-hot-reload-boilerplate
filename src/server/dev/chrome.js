// using default imports doesn't work with this library
// so just import the specific module we need
import { launch as chromeLauncher } from 'chrome-launcher';

/**
 * Automatically opens chrome for development. Also closes chrome
 * when the nodejs process has been exited
 */
export default function loadChrome() {
    chromeLauncher({
        startingUrl: 'http://localhost:' + (process.env.PORT || 3000),
        chromeFlags: ['--remote-debugging-port=9222']
        // killing the browser when node exits is already enabled by default
    });
}
