import ReactDOM from 'react-dom';
import React from 'react';
import App from '@react-app/app';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import client from './apollo-client';
const root = document.getElementById('root');

ReactDOM.hydrate(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ApolloProvider>,
    root
);

// change me to another colour
document.body.style.background = 'white';

if (module.hot) {
    module.hot.accept();
}
