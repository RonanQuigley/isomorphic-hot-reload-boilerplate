# Isomoprhic Hot Reload Boilerplate

Combines the holy trinity of webpack-hot-server, wepback-dev-middleware and webpack-hot-middleware for hot reloading both client and server.

After scouring the web looking at all sorts of isomorphic boilerplates and articles for hot reloading, I wasn't able to find any that checked all the boxes for what I was looking for in a setup. Either the project's were abandoned, used out of date tech, were completely over-engineered, had patchy instructions, could only bundle client-side code or were unable to hot reload both client and server at the same time.

This boileplate solves those problems, and its primary aim is to maximise dev efficiency and your iteration loop out of the box. It provides the following tech & features

*   Webpack 4
*   Express
*   Morgan
*   Handlebars (via loader)
*   React
*   React hot loader
*   ES6 support
*   Babel 7 support
*   Eslint
*   Unit testing support for mocha/chai
*   Production ready full-stack builds
*   DotEnv for loading your env files into webpack
*   Automatically opens up the browser window in development
*   Watches for server side changes and reloads the browser
*   Handles all files in memory for the fastest possible update times.

If you're looking for a speedier set up than using browser-sync or nodemon, then this might be for you.

## Installation

```
git clone https://github.com/RonanQuigley/isomorphic-hot-reload-boilerplate
yarn
```

## Usage

The src directory holds all of your source files:

*   The client folder contains all client side code. It currently has a simple index file. update the following line to your colour of choice to see changes reflected in your browser : `document.body.style.background = 'white'`
*   The common folder contains your shared client/server code. In this case, it has a tiny react app.js example.
*   The dev folder contains all of the hot reloading code for development.
*   The server folder contains your routes and whatever else you'd need to add for server-side.
*   The index file handles the express app generation and changes the middleware used based on whether your are in development or production

I've added the .env file to the git repo, but for your own setup, it's best to add it to your .gitignore. It includes the following options:

```
    PORT=3000
    DEBUG=true
```

Port is your desired port number and the debug option is for enabling/disabling logging via morgan.

## Support & Suggestions

Please [open an issue](https://github.com/RonanQuigley/isomorphic-hot-reload-boilerplate/issues) for support.
