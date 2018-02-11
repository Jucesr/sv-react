import React from 'react';
import ReactDOM from 'react-dom';

import {PapFormPage} from './components/PapFormPage';
import {SideBar} from './components/SideBar';
import {Header} from './components/Header';



const App = () => (
  <div className="app_container">
    <SideBar/>
    <div className="app_content">
      <Header/>
      <PapFormPage/>
    </div>

  </div>
);



ReactDOM.render(<App/>, document.getElementById('app'));
