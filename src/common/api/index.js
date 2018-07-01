import React from 'react';
import ContextProvider from '../context-provider';
import App from '../app';

export function buildApp(context) {
    return (
        <ContextProvider context={context}>
            <App />
        </ContextProvider>
    );
}
