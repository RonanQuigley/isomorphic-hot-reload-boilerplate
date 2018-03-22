
import express from 'express';

const router = express.Router();

function dynamic(lib){
    return function (req, res, next) {
        // let webpack generate a regex expression from this
        // if we don't you would get a critical dependency warning
        // which would result in the routes not being found
        return require("./routes/" + lib + ".js").default.apply(this, arguments);
    }
}

router.use(
    dynamic('index'),
    dynamic('foo')
)

// export a function for hot server middleware purposes
export default () => router;
