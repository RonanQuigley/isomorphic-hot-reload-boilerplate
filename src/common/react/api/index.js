import React from 'react';
import ContextProvider from '../components/context-provider/index';
import App from '../components/app';

export function buildApp(context, props) {
    return (
        <ContextProvider context={context}>
            <App {...props} />
        </ContextProvider>
    );
}
