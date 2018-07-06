import ReactDOM from 'react-dom';
import { createClientContext } from '../../api/react';
import { buildApp } from '../../../common/react/api';
import '../../api/graphql';

const root = document.getElementById('root');

const context = createClientContext();

const app = buildApp(context);

ReactDOM.hydrate(app, root);

// change me to a different colour and see the changes reflected in browser
document.body.style.background = 'white';

if (module.hot) {
    module.hot.accept();
}
