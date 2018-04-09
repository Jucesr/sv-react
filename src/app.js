import React from 'react';
import ReactDOM from 'react-dom';
import Clone from 'Clone';

import AppRouter from './routers/AppRouter';
import './styles/index.scss'

Array.prototype.clone = function(){
  return Clone(this);
}


ReactDOM.render(<AppRouter/>, document.getElementById('app'));
