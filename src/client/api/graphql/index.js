import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import testQuery from './query.graphql';
import { Query, ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
    uri: 'https://w5xlvm3vzz.lp.gql.zone/graphql'
});

const test = client
    .query({
        query: testQuery
    })
    .then(result => console.log(result));

const Apollo = () => (
    <ApolloProvider client={client}>
        <div>
            <ExchangeRates />
        </div>
    </ApolloProvider>
);

const elem = document.createElement('div');
elem.setAttribute('id', 'apollo');
document.body.appendChild(elem);

const ExchangeRates = () => (
    <Query query={testQuery}>
        {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return data.rates.map(({ currency, rate }) => (
                <div key={currency}>
                    <p>{`${currency}: ${rate}`}</p>
                </div>
            ));
        }}
    </Query>
);

ReactDOM.render(<Apollo />, elem);

if (module.hot) {
    module.hot.dispose(() => {
        document.getElementById('apollo').remove();
    });
}
