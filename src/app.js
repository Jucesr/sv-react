import React from 'react';
import ReactDOM from 'react-dom';

import AppRouter from './routers/AppRouter';
// import {PapFormPage} from './components/PapFormPage';
// import {SideBar} from './components/SideBar';
// import {Header} from './components/Header';



// const App = () => (
//   <div className="app_container">
//     <SideBar/>
//     <div className="app_content">
//       <Header/>
//       <PapFormPage/>
//     </div>
//
//   </div>
// );

Array.prototype.clone = function(){
  return JSON.parse(JSON.stringify(this));
}


ReactDOM.render(<AppRouter/>, document.getElementById('app'));
