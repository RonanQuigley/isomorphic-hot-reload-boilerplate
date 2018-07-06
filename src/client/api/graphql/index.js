import ApolloClient from 'apollo-boost';
import testQuery from './query.graphql';

const client = new ApolloClient({
    uri: 'https://w5xlvm3vzz.lp.gql.zone/graphql'
});

const test = client
    .query({
        query: testQuery
    })
    .then(result => console.log(result));
