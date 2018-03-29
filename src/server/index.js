import express from "express";
import morgan from "morgan";
// colors modifies the string prototype
// this will prevent eslint throwing no-unused-var errors
import "colors";
const app = express();

if (process.env.DEBUG === "true") {
    console.log("DEBUG LOGGING ENABLED".green);
    // morgan must be used by the app first
    app.use(morgan("dev"));
}

if (process.env.NODE_ENV === "development") {
    // tree shaking doesn't work properly so use a require
    // to prevent the dev code showing up in production
    app.use(require("../middleware").default);
} else {
    app.use(
        // allow express to access our public assets in the dist
        express.static(__dirname),
        // call default as function as it is exported
        // that way for development purposes
        require("./routes").default()
    );
}

app.listen(process.env.PORT || 3000, "localhost", function(err) {
    if (err) throw err;
    const addr = this.address();
    console.log("Listening at http://%s:%d", addr.address, addr.port);
});

export default app;
