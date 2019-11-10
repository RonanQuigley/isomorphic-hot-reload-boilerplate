import React from 'react';
import loadable from '@loadable/component';
import { Route, Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const Index = loadable(() => import('./load-me'), {
    fallback: <div>Loading</div>
});

function AppRouter() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">f</Link>
                    </li>
                    <li>
                        <Link to="/about/">foo</Link>
                    </li>
                </ul>
            </nav>
            <Route path="/about" exact component={Index} />
        </div>
    );
}

export default AppRouter;
