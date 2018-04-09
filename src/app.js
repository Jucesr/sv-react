import React from 'react';
import ReactDom from 'react-dom';
import Clone from 'Clone';

import AppRouter from './routers/AppRouter';
import { Provider } from 'react-redux'
import store from './store/store'
import './styles/index.scss'

Array.prototype.clone = function(){
  return Clone(this);
}

const App = () => (
  <Provider store={store}>
    <AppRouter/>
  </Provider>
)

ReactDom.render(<App/>, document.getElementById('app'))
