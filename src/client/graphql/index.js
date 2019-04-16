import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import testQuery from './query.graphql';
import { Query, ApolloProvider, Mutation } from 'react-apollo';

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql'
});

const Apollo = () => (
    <ApolloProvider client={client}>
        <div>Add your queries to apollo provider using the query component</div>
    </ApolloProvider>
);

const elem = document.createElement('div');
elem.setAttribute('id', 'apollo');
console.log(document.body);
document.body.appendChild(elem);

ReactDOM.render(<Apollo />, elem);

if (module.hot) {
    module.hot.dispose(() => {
        document.getElementById('apollo').remove();
    });
}
