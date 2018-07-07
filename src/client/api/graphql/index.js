import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import testQuery from './query.graphql';
import testMutation from './mutation.graphql';
import { Query, ApolloProvider, Mutation } from 'react-apollo';

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql'
});

const TestMutation = () => {
    let input = React.createRef();

    function handleClick() {
        input.current.focus();
    }

    function getValues(data) {
        return Object.keys(data.signup).map(item => (
            <div key={item}>{data.signup[item]}</div>
        ));
    }

    return (
        <Mutation mutation={testMutation}>
            {(signup, { loading, error, data }) => {
                console.log(data);
                return (
                    <div>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                signup();
                            }}
                        >
                            <input ref={input} />
                            <button type="submit">Add Todo</button>
                        </form>
                        {loading && <div>Loading</div>}
                        {error && <div>error</div>}
                        {data && <div>{getValues(data)}</div>}
                    </div>
                );
            }}
        </Mutation>
    );
};

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
        {/* <TestQuery /> */}
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
