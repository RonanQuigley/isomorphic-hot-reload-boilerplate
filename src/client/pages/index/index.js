import { createClientContext } from '../../api/react/index';
import { buildApp } from '../../../common/react/api/index';
const root = document.getElementById('root');

const context = createClientContext();

const app = buildApp(context);

ReactDOM.hydrate(app, root);

// change me to a different colour and see the changes reflected in browser
document.body.style.background = 'white';

if (module.hot) {
    module.hot.accept();
}
