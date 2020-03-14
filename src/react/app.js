import React from 'react';
import loadable from '@loadable/component';
import { Route, Link } from 'react-router-dom';

const A = loadable(() =>
    import(/* webpackChunkName: "component-a" */ `./component-a`)
);

const B = loadable(() =>
    import(/* webpackChunkName: "component-b" */ `./component-b`)
);

const C = loadable(() =>
    import(/* webpackChunkName: "component-c" */ `./component-c`)
);

function AppRouter() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Component A</Link>
                    </li>
                    <li>
                        <Link to="/component-b/">Component B</Link>
                    </li>
                    <li>
                        <Link to="/component-c/">Component C</Link>
                    </li>
                </ul>
            </nav>
            <Route path="/" exact>
                {/* <A /> */}
            </Route>
            <Route path="/component-b">
                <B />
            </Route>
            <Route path="/component-c">
                <C />
            </Route>
        </div>
    );
}

export default AppRouter;
