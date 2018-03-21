import express from 'express';
const router = express.Router();

function createRoutes(router) {
    const dynamic = (lib) => {
        return function (req, res, next) {
            // let webpack generate a regex expression from this
            // if we don't you would get a critical dependency warning
            // which would result in the routes not being found
            return require("./src/" + lib + ".js").apply(this, arguments);
        }
    }
    router.use(
        dynamic('index'),
        dynamic('foo'),
    );
    return router;
}

export default createRoutes(router);