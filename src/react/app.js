import React from 'react';
import universal from 'react-universal-component';
import { Route, Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const UniversalComponent = universal(
    import(/* webpackChunkName: "give-me-a-chunk-name" */ `./load-me`)
);

function Index() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}

const ssrQuery = gql`
    {
        ssrQuery
    }
`;

const nonSSRQuery = gql`
    {
        nonSSRQuery
    }
`;

const ApolloQuerySSRExample = () => (
    <Query query={ssrQuery}>
        {({ loading, data }) => {
            if (loading) return <div>loading ssr query</div>;
            return <div>{data.ssrQuery}</div>;
        }}
    </Query>
);

const ApolloQueryNonSSRExample = () => (
    <Query query={nonSSRQuery} ssr={false}>
        {({ loading, data }) => {
            if (loading) return <div>loading non ssr query</div>;
            return <div>{data.nonSSRQuery}</div>;
        }}
    </Query>
);

function Hooks() {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = React.useState(0);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    );
}

function AppRouter() {
    return (
        <div>
            <UniversalComponent />
            <Hooks />
            <ApolloQueryNonSSRExample />
            <ApolloQuerySSRExample />
            <div>Just another div</div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about/">About</Link>
                    </li>
                    <li>
                        <Link to="/users/">Users</Link>
                    </li>
                </ul>
            </nav>
            <Route path="/" exact component={Index} />
            <Route path="/about/" component={About} />
            <Route path="/users/" component={Users} />
        </div>
    );
}

export default AppRouter;
