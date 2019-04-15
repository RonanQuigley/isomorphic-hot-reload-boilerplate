import ReactDOM from 'react-dom';
import React from 'react';
import App from '../../../common/react/components/app';
// import '../../api/graphql';
const root = document.getElementById('root');

// const context = createClientContext();

// const app = buildApp(context);

ReactDOM.hydrate(<App />, root);

document.body.style.background = 'red';

if (module.hot) {
    module.hot.accept();
}
