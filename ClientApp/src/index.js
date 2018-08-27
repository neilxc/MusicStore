import 'semantic-ui-css/semantic.min.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import App from './app/layout/App';
import registerServiceWorker from './registerServiceWorker';
import authStore from './stores/authStore';
import commonStore from './stores/commonStore';
import userStore from './stores/userStore';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

const stores = {
  authStore,
  commonStore,
  userStore
}

ReactDOM.render(
  <Provider {...stores}>
    <BrowserRouter basename={baseUrl}>
      <App />
    </BrowserRouter>
  </Provider>,
  rootElement
);

// if (module.hot) {
//   module.hot.accept('./app/layout/App', () => {
//     setTimeout(render);
//   });
// }

registerServiceWorker();
