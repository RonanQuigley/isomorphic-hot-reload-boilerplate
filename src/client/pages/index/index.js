import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../../common/app';
import ContextProvider from '../../../common/context-provider';
const root = document.getElementById('root');

// Global (context) variables that can be easily accessed from any React component
// https://facebook.github.io/react/docs/context.html
const context = {
    // Enables critical path CSS rendering
    // https://github.com/kriasoft/isomorphic-style-loader
    insertCss: (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        const removeCss = styles.map(x => x._insertCss());
        return () => {
            removeCss.forEach(f => f());
        };
    }
};

// use render in development, hydrate in production
const renderMethod = !!module.hot ? ReactDOM.render : ReactDOM.hydrate;
ReactDOM.hydrate(
    <ContextProvider context={context}>
        <App />
    </ContextProvider>,
    root
);

// change me to a different colour and see the changes reflected in browser
document.body.style.background = 'white';

if (module.hot) {
    module.hot.accept();
}

function foo() {
    return 'foo';
}

foo();
