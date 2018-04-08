import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './common/registerServiceWorker';
import { Provider } from 'mobx-react'
import AppStore from './models/appStore'

import 'stylus/index.styl'

const appStore = new AppStore()

ReactDOM.render(
  <Provider 
    appStore={appStore}
    recommendStore={appStore.recommendStore}
    singerStore={appStore.singerStore}>
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
