import app, { listen } from './base-app';
import express from 'express';
import server from './server';

app.use(
    // allow express to access our public assets in the dist
    express.static(__dirname),
    /* webpack hot server middleware requires the router to be exported
    as a function so we need to call it in order to get the actual router */
    server()
);

// in tests we don't need to listen
// as we're using superagent
if (process.env.NODE_ENV !== 'test') {
    listen(app);
}
