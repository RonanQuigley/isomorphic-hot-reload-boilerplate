# Isomoprhic Hot Reload Boilerplate

Hot reloading of both client and server :fire:

Project aim is to maximise dev efficiency and your iteration loop out of the box. It provides the following tech & features

-   Webpack 4
-   Express
-   Morgan
-   React
-   React hot loader
-   Babel
-   Jest
-   Production ready full-stack builds
-   DotEnv for loading your env files into webpack
-   Automatically opens browser window in development and closes in the event of a node process exit
-   Watches for server side changes and reloads the browser
-   Handles all files in memory for the fastest possible update times.

If you're looking for a speedier set up than using browser-sync or nodemon, then this might be for you.

## Installation

```
git clone https://github.com/RonanQuigley/isomorphic-hot-reload-boilerplate
yarn
```

## Usage

The src directory holds all of your source files:

-   The client folder contains all client side code. It currently has a simple index file. update the following line to your colour of choice to see changes reflected in your browser : `document.body.style.background = 'whatever-colour'`
-   The server folder contains your routes and whatever else you'd need to add for server-side.
-   The react folder is for your react app

The dev tools folder contains hot reloading and other dev related code.

I've added the .env file to the git repo, but for your own setup, it's best to add it to your .gitignore. It includes the following options:

```
    PORT=3000
    DEBUG=true
```

Port is your desired port number and the debug option is for enabling/disabling logging via morgan.

## Known Issues

Using paths with spaces i.e. C:/users/foo/project/my project/ may result in a 404 response when serving files in memory. Therefore, make sure your project paths have no spaces in them.

## Support & Suggestions

Please [open an issue](https://github.com/RonanQuigley/isomorphic-hot-reload-boilerplate/issues) for support
