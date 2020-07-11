import { launch } from "chrome-launcher";

/**
 * Automatically opens chrome for development. Also closes chrome
 * when the nodejs process has been exited
 */
export default async function loadChrome() {
  try {
    await launch({
      startingUrl: "http://localhost:" + (process.env.PORT || 3000),
      port: 9222
      // killing the browser when node exits is already enabled by default
    });
  } catch (_) {
    /* can occasionally get econnrefused errors
        showing up. doesn't seem to cause an issue for dev 
        so don't let the errors bubble up */
  }
}
