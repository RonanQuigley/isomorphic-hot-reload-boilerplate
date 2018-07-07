import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import testQuery from './query.graphql';
import testMutation from './mutation.graphql';
import { Query, ApolloProvider, Mutation } from 'react-apollo';

console.log(testMutation);

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql'
});

const TestMutation = () => (
    <Mutation mutation={testMutation}>
        {(func, { data }) => {
            return <div>Hello</div>;
        }}
    </Mutation>
);

const TestQuery = () => (
    <Query query={testQuery}>
        {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            return data.users.map(user => <div key={user.id}>{user.id}</div>);
        }}
    </Query>
);

const Apollo = () => (
    <ApolloProvider client={client}>
        <TestQuery />
        <TestMutation />
    </ApolloProvider>
);

const elem = document.createElement('div');
elem.setAttribute('id', 'apollo');
document.body.appendChild(elem);

ReactDOM.render(<Apollo />, elem);

if (module.hot) {
    module.hot.dispose(() => {
        document.getElementById('apollo').remove();
    });
}
