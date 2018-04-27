import React from 'react';
import ReactDom from 'react-dom';

import AppRouter from './routers/AppRouter';
import { Provider } from 'react-redux'
import store from './store/store'
import './styles/index.scss'

import './helpers/prototype'

const App = () => (
  <Provider store={store}>
    <AppRouter/>
  </Provider>
)

ReactDom.render(<App/>, document.getElementById('app'))
